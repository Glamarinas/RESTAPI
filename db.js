const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "109.123.248.178",
    database: "db_demetra",
    password: "chris",
    port: 5432,
});
module.exports = pool;