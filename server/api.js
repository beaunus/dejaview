const router = require("express").Router();
const db = require("knex")({
  client: "pg",
  connection: process.env.DATABASE_URL
});

router.get("/:date", (req, res) => {
  const year = req.params.date.slice(0, 4);
  const month = req.params.date.slice(4, 6);
  const date = req.params.date.slice(6, 8);
  const targetDate = new Date(`${year}-${month}-${date}`);
  const nextDate = new Date(targetDate.setDate(targetDate.getDate() + 1));
  const weekBeforeDate = new Date(targetDate.setDate(targetDate.getDate() - 7));

  const results = db("events")
    .select()
    .whereBetween("datetime", [weekBeforeDate, nextDate])
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(400).send("The date must be in YYYYMMDD format.");
    });
});

module.exports = router;
