const router = require("express").Router();
const db = require("./db");

router.get("/:date", async (req, res) => {
  const targetDate = new Date(req.params.date);

  try {
    res.status(200).send(await db.getEvents(targetDate));
  } catch (error) {
    res.status(400).send("The date must be in YYYY-MM-DD format.");
  }
});

module.exports = router;
