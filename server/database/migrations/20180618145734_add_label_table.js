exports.up = function(knex) {
  return knex.schema.hasTable("label").then(exists => {
    if (!exists) {
      return knex.schema.createTable("label", table => {
        table.increments().primary();
        table.text("name");
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("label");
};
