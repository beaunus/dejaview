const moment = require("moment");

const router = require("express").Router();
const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

router.get("/:date", (req, res) => {
  const targetDate = new Date(req.params.date);
  const nextDate = new Date(
    moment(targetDate)
      .add(1, "day")
      .format("YYYY-MM-DD")
  );
  const weekBeforeDate = new Date(
    moment(targetDate)
      .subtract(6, "day")
      .format("YYYY-MM-DD")
  );

  const results = db("event")
    .select(
      "event.timestamp",
      "event.title",
      "event.text",
      "event.link",
      "label.name as label"
    )
    .whereBetween("timestamp", [weekBeforeDate, nextDate])
    .join("label", "label.id", "=", "event.label_id")
    .then(events => {
      const result = {};
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
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(400).send("The date must be in YYYY-MM-DD format.");
    });
});

module.exports = router;
