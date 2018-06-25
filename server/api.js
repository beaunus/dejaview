const router = require("express").Router();
const db = require("./db");

/**
 * Respond with an array of strings of all labels that are in the system.
 */
router.get("/labels", async (req, res) => {
  let labelsNotInDatabase = [];
  if (req.isAuthenticated()) {
    labelsNotInDatabase = ["Facebook"];
  }
  try {
    res
      .status(200)
      .send(labelsNotInDatabase.concat(await db.getLabels()).sort());
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error getting the labels.");
  }
});

/**
 * Respond with an array of strings of all labels that are in the system.
 */
router.get("/isLoggedIn", async (req, res) => {
  res.status(200).send(req.isAuthenticated());
});

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
  let access_token;
  if (req.user) {
    access_token = req.user.accessToken;
  }
  const granularity = req.query.granularity;
  const num = req.query.num;
  try {
    const data = await db.getEvents(targetDate, granularity, num, access_token);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("The date must be in YYYY-MM-DD format.");
  }
});

module.exports = router;
