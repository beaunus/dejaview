const fs = require("fs");

exports.seed = async knex => {
  console.log("Loading Sample Events");

  try {
    const events = JSON.parse(
      fs.readFileSync("../../documentation/sample.json")
    );
    await knex("event").delete();
    await knex.raw("ALTER SEQUENCE event_id_seq RESTART WITH 1;");

    for (const date in events) {
      for (const label in events[date]) {
        const event = events[date][label][0];
        await knex("event").insert(event);
      }
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
