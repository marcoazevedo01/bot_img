module.exports = (() => {
    const { Pool } = require('pg')
    const pool = new Pool({
      user: 'postgres',
      host: process.env.PG_HOST,
      database: 'vendas',
      password: process.env.PG_PASSWORD,
      port: 5432,
    })
    pool.connect();
    return pool;
  })();