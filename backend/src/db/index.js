require('dotenv').config({ path: '.env.development' });
const pg = require("pg");

const client = new pg.Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// connect to the PSQL goforage database
client
  .connect()
  .then(() => console.log(`Connected to PostgreSQL database ${client.database}`))
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
