const moment = require("moment");
const axios = require("axios");

const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

/**
 * Return the date that that is the "first of the [granularity] that contains the given target date."
 * @param {Date} date
 * @param {String} granularity
 * @returns {Date}
 */
const normalizeDate = (date, granularity) => {
  const result = new Date(date);
  switch (granularity) {
    case "weeks":
      const numDaysAwayFromSunday = date.getDay();
      result.setDate(result.getDate() - numDaysAwayFromSunday);
      break;
    case "months":
      result.setDate(1);
      break;
    case "years":
      result.setMonth(0);
      result.setDate(1);
      break;
  }
  return result;
};

/**
 * Return the given date, offset by the given number of [granularity]
 * @param {Date} date
 * @param {String} granularity
 * @param {Number} num
 * @returns {Date}
 */
const offsetDate = (date, granularity, num) => {
  let result = new Date(date);
  switch (granularity) {
    case "days":
      result.setDate(result.getDate() + num);
      break;
    case "weeks":
      result.setDate(result.getDate() + 7 * num);
      break;
    case "months":
      result.setMonth(result.getMonth() + num);
      break;
    case "years":
      result.setFullYear(result.getFullYear() + num);
      break;
  }
  return result;
};

/**
 * Return all events that are between the given beginningDate (inclusive) and endingDate (exclusive).
 * @param {Date} beginningDate
 * @param {Date} endingDate
 * @returns {[Object]}
 */
const getRawEvents = async (beginningDate, endingDate) => {
  return await db("event")
    .select(
      "event.timestamp",
      "event.title",
      "event.text",
      "event.link",
      "label.name as label"
    )
    .where("timestamp", ">=", beginningDate)
    .andWhere("timestamp", "<", endingDate)
    .join("label", "label.id", "=", "event.label_id");
};

const getRawFBEvents = async (access_token, beginningDate, endingDate) => {
  const fields =
    "caption,message,permalink_url,picture,created_time,link,name,type,place,description";
  const since = moment(beginningDate).format("YYYY-MM-DD");
  const until = moment(endingDate).format("YYYY-MM-DD");
  const url = `https://graph.facebook.com/v3.0/me/posts?since=${since}&until=${until}&fields=${fields}&access_token=${access_token}&limit=500`;

  try {
    const fbPosts = (await axios.get(url)).data;
    return fbPosts;
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error calling the Facebook API");
  }
};

/**
 * Return a dictionary of events from the given rawEvents and granularity.
 * The keys are date strings and the values are dictionaries whose keys are label strings and values are arrays of event objects.
 * For example:
 *   {
 *      "2018-06-05" : {
 *        "New York Times": [
 *          {...event...}, {...event...}, ...
 *        ],
 *        "Wikipedia": [
 *          {...event...}, {...event...}, ...
 *        ]
 *      }
 *   }
 *
 * @param {[Object]} rawEvents
 * @param {String} granularity
 * @returns {Object}
 */
const getIndexedEvents = (rawEvents, rawFBEvents, granularity) => {
  const indexedEvents = {};
  for (const event of rawEvents) {
    const date = normalizeDate(new Date(event.timestamp), granularity);
    const dateString = moment(date)
      .utc()
      .format("YYYY-MM-DD");
    if (!indexedEvents.hasOwnProperty(dateString)) {
      indexedEvents[dateString] = {};
    }
    if (!indexedEvents[dateString].hasOwnProperty(event.label)) {
      indexedEvents[dateString][event.label] = [];
    }
    indexedEvents[dateString][event.label].push(event);
  }

  for (const rawEvent of rawFBEvents["data"]) {
    if (rawEvent.type === "status" || rawEvent.type === "photo") {
      const title = rawEvent.message
        ? rawEvent.message.slice(0, 200) + "..."
        : rawEvent.description || "Facebook Post";
      const text =
        rawEvent.message + " " + rawEvent.picture
          ? `<img src="${rawEvent.picture}" />`
          : rawEvent.place["name"]
            ? `<em>Checked In at ${rawEvent.place["name"]}</em>`
            : "";

      const link = rawEvent.permalink_url ? rawEvent.permalink_url : "";
      const event = {
        title,
        text,
        link
      };
      const date = normalizeDate(new Date(rawEvent.created_time), granularity);
      const dateString = moment(date).format("YYYY-MM-DD");
      if (!indexedEvents.hasOwnProperty(dateString)) {
        indexedEvents[dateString] = {};
      }
      if (!indexedEvents[dateString].hasOwnProperty("Facebook")) {
        indexedEvents[dateString]["Facebook"] = [];
      }
      indexedEvents[dateString]["Facebook"].push(event);
    }
  }

  return indexedEvents;
};

/**
 * Return a dictionary of events from the given rawEvents and granularity.
 * The keys are date strings and the values are dictionaries whose keys are label strings and values are arrays of event objects that meet the system's "champion" criteria.
 * TODO: For now, each event array contains only a single, randomly chosen, event.
 * For example:
 *   {
 *      "2018-06-05" : {
 *        "New York Times": [
 *          {...event...}
 *        ],
 *        "Wikipedia": [
 *          {...event...}
 *        ]
 *      }
 *   }
 *
 * @param {Object} indexedEvents
 */
const getChampions = indexedEvents => {
  const result = {};
  for (const date in indexedEvents) {
    result[date] = {};
    for (const label in indexedEvents[date]) {
      result[date][label] = [];
      const randomIndex = Math.floor(
        Math.random() * indexedEvents[date][label].length
      );
      result[date][label].push(indexedEvents[date][label][randomIndex]);
    }
  }
  return result;
};

/**
 * Return an object of champion events for the period specified by the given endingDate, granularity, and numPeriodsBack.
 * @param {Date} date
 * @param {String} granularity
 * @param {Number} num
 */
const getEvents = async (date, granularity = "days", num = 1, access_token) => {
  const normalizedDate = normalizeDate(date, granularity);
  const beginningDate = offsetDate(normalizedDate, granularity, -(num - 1));
  const endingDate = offsetDate(normalizedDate, granularity, 1);
  const rawEvents = await getRawEvents(beginningDate, endingDate);
  const rawFBEvents = await getRawFBEvents(
    access_token,
    beginningDate,
    endingDate
  );
  const indexedEvents = getIndexedEvents(rawEvents, rawFBEvents, granularity);
  return getChampions(indexedEvents);
};

module.exports = { getEvents };
