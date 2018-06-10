const moment = require("moment");

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
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
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
    .whereBetween("timestamp", [beginningDate, endingDate])
    .join("label", "label.id", "=", "event.label_id");
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
const getIndexedEvents = (rawEvents, granularity) => {
  const indexedEvents = {};
  for (const event of rawEvents) {
    const date = normalizeDate(
      new Date(event.timestamp.toString().slice(0, 10)),
      granularity
    );

    // TODO: Are we dealing with the timezone properly?
    const dateString = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    if (!indexedEvents.hasOwnProperty(dateString)) {
      indexedEvents[dateString] = {};
    }
    if (!indexedEvents[dateString].hasOwnProperty(event.label)) {
      indexedEvents[dateString][event.label] = [];
    }
    indexedEvents[dateString][event.label].push(event);
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
 * @param {Date} endingDate
 * @param {String} granularity
 * @param {Number} num
 */
const getEvents = async (date, granularity = "days", num = 1) => {
  const normalizedDate = normalizeDate(date, granularity);
  const beginningDate = offsetDate(normalizedDate, granularity, -(num - 1));
  const endingDate = offsetDate(normalizedDate, granularity, 1);
  const rawEvents = await getRawEvents(beginningDate, endingDate);
  const indexedEvents = getIndexedEvents(rawEvents, granularity);
  return getChampions(indexedEvents);
};

module.exports = { getEvents };
