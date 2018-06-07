const moment = require("moment");

const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

/**
 * Returns an object which has dates for keys and an array of events as values
 * @param {String} date
 * @returns {Object}
 */
const getEvents = async date => {
  const nextDate = new Date(
    moment(date)
      .add(1, "day")
      .format("YYYY-MM-DD")
  );
  const weekBeforeDate = new Date(
    moment(date)
      .subtract(6, "day")
      .format("YYYY-MM-DD")
  );
  const result = {};
  const events = await db("event")
    .select(
      "event.timestamp",
      "event.title",
      "event.text",
      "event.link",
      "label.name as label"
    )
    .whereBetween("timestamp", [weekBeforeDate, nextDate])
    .join("label", "label.id", "=", "event.label_id");
  for (const event of events) {
    const date = new Date(event.timestamp);
    // TODO: Are we dealing with the timezone properly?
    const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth() +
      1}-${date.getUTCDate()}`;
    if (!result.hasOwnProperty(dateString)) {
      result[dateString] = [];
    }
    result[dateString].push(event);
  }
  return result;
};

module.exports = { getEvents };
