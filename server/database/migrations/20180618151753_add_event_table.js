exports.up = function(knex) {
  return knex.schema.hasTable("event").then(exists => {
    if (!exists) {
      return knex.schema.createTable("event", table => {
        table.increments().primary();
        table.timestamp("timestamp", true).notNull();
        table.text("title").notNull();
        table.text("text");
        table.text("link");
        table.integer("label_id");
        table.text("image_link");
        table.text("media_link");

        table
          .foreign("label_id")
          .references("id")
          .inTable("label");
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("event");
};
