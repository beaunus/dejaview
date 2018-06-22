const moment = require("moment");

/**
 * Return the date that that is the "first of the [granularity] that contains the given target date."
 * @param {Date} date
 * @param {String} granularity
 * @returns {Date}
 */
const normalizeDate = (date, granularity) => {
  const result = moment.utc(date);
  switch (granularity) {
    case "weeks":
      result.day(0);
      break;
    case "months":
      result.date(1);
      break;
    case "years":
      result.month(0);
      result.date(1);
      break;
    default:
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
  const result = new Date(date);
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
    default:
      break;
  }
  return result;
};

module.exports = { normalizeDate, offsetDate };
