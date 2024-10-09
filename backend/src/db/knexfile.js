const knex = require("knex");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, PROD } = process.env;

const config = {
  db: knex({
    client: "pg",
    connection: {
      host: PGHOST,
      port: PGPORT,
      user: PGUSER,
      database: PGDATABASE,
      password: PGPASSWORD,
      ssl: PROD ? false : { rejectUnauthorized: false },
    },
  }),
};

module.exports = config;