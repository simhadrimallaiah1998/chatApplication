const Pool = require("pg").Pool;

const pool = new Pool({
  host: "snuffleupagus.db.elephantsql.com",
  port: 5432,
  user: "emlgnmpq",
  password: "H5afwp1joyuhApVG822dRHz9bf70w8P1",
  database: "emlgnmpq",
});

module.exports = pool;
