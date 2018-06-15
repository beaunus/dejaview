const router = require("express").Router();
const db = require("./db");
const axios = require("axios");

/**
 * The main endpoint for the API server.
 *
 * A "champion" event is the "best" event for a given granularity.
 *
 * If no query params are given, the champion events for each label are returned for a single day only.
 *
 * If "granularity" is given, the "target period" is the period that contains the given date.
 * If "num" is given, a number of preceding periods are given that lead up to the target period.
 *
 * The keys in the returned object are always the "first of the [granularity]".
 */
router.get("/:date", async (req, res) => {
  const targetDate = new Date(req.params.date);
  const access_token = req.user.accessToken;
  const granularity = req.query.granularity;
  const num = req.query.num;
  try {
    res
      .status(200)
      .send(await db.getEvents(targetDate, granularity, num, access_token));
  } catch (error) {
    console.log(error);
    res.status(400).send("The date must be in YYYY-MM-DD format.");
  }
});

module.exports = router;
