const { utc } = require("moment");
const { normalizeDate, offsetDate } = require("../src/utilities");
const moment = require("moment");
const axios = require("axios");
const fb = require("./fb");

const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

/**
 * Return all events that are between the given beginningDate (inclusive) and endingDate (exclusive).
 * @param {Date} beginningDate
 * @param {Date} endingDate
 * @returns {[Object]}
 */
const getRawEvents = async (beginningDate, endingDate) => {
  beginningDate = beginningDate.toISOString();
  endingDate = endingDate.toISOString();
  return db("event")
    .select(
      db.raw("event.timestamp AT TIME ZONE 'UTC' as timestamp"),
      "event.title",
      "event.text",
      "event.link",
      "event.image_link",
      "event.media_link",
      "label.name as label"
    )
    .whereRaw(
      `timestamp  >= '${beginningDate}' AND timestamp < '${endingDate}'`
    )
    .join("label", "label.id", "=", "event.label_id");
};

const getRawFBEvents = async (access_token, beginningDate, endingDate) => {
  const fields =
    "caption,message,permalink_url,picture,created_time,link,name,type,place,description,full_picture";
  const since = moment(beginningDate).format("YYYY-MM-DD");
  const until = moment(endingDate).format("YYYY-MM-DD");
  const url = `https://graph.facebook.com/v3.0/me/posts?since=${since}&until=${until}&fields=${fields}&access_token=${access_token}&limit=500`;

  const fbResponse = await axios.get(url);
  if (fbResponse.data) {
    return fbResponse.data;
  }
  return null;
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
    const dateString = utc(date).format("YYYY-MM-DD");
    if (!indexedEvents.hasOwnProperty(dateString)) {
      indexedEvents[dateString] = {};
    }
    if (!indexedEvents[dateString].hasOwnProperty(event.label)) {
      indexedEvents[dateString][event.label] = [];
    }
    indexedEvents[dateString][event.label].push(event);
  }

  if (rawFBEvents) {
    for (const rawFBEvent of rawFBEvents.data) {
      const event = fb.getIndexedEvent(rawFBEvent);
      if (event) {
        const date = normalizeDate(
          new Date(rawFBEvent.created_time),
          granularity
        );
        const dateString = moment(date).format("YYYY-MM-DD");
        if (!indexedEvents.hasOwnProperty(dateString)) {
          indexedEvents[dateString] = {};
        }
        if (!indexedEvents[dateString].hasOwnProperty("Facebook")) {
          indexedEvents[dateString].Facebook = [];
        }
        indexedEvents[dateString].Facebook.push(event);
      }
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
