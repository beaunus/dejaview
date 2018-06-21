exports.up = function(knex) {
  return knex.raw(
    "CREATE INDEX IF NOT EXISTS idx_event_ts on event (timestamp);CLUSTER event USING idx_event_ts"
  );
};

exports.down = function(knex) {
  return knex.raw("DROP INDEX IF EXISTS idx_event_ts");
};
