module.exports = {
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL || "127.0.0.1",
    database: "lifeline"
  },
  port: 5432,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
