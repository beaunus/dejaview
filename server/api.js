const router = require("express").Router();
const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

router.get("/:date", (req, res) => {
  const year = req.params.date.slice(0, 4);
  const month = req.params.date.slice(4, 6);
  const date = req.params.date.slice(6, 8);

  // TODO: Don't mutate date
  const targetDate = new Date(`${year}-${month}-${date}`);
  const nextDate = new Date(targetDate.setDate(targetDate.getDate() + 1));
  const weekBeforeDate = new Date(targetDate.setDate(targetDate.getDate() - 7));

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
        console.log(event);
        console.log(dateString);
      }
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(400).send("The date must be in YYYYMMDD format.");
    });
});

module.exports = router;
