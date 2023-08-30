const Pool = require("pg").Pool;

const pool = new Pool({
  host: "balarama.db.elephantsql.com",
  port: 5432,
  user: "ircfvvrk",
  password: "h_i-27u5YiVuMEiwaL1NrI6E70Ts_zw0",
  database: "ircfvvrk",
});

module.exports = pool;
