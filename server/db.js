const Pool = require("pg").Pool;

const pool = new Pool({
    user: "perntodo_user",
    password: "1234",
    host: "192.168.1.100",
    port: 5432,
    database: "perntodo"
})
module.exports = pool;