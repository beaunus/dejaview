exports.seed = async knex => {
  console.log("Begin Import");

  try {
    await knex("label").delete();
    await knex.raw("ALTER SEQUENCE label_id_seq RESTART WITH 1;");
    return knex("label").insert([
      { name: "New-York-Times" },
      { name: "Wikipedia" },
      { name: "Billboard" },
      { name: "Movies" }
    ]);
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
