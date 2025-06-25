const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // .env berisi DATABASE_URL
});

module.exports = pool;
