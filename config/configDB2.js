const mysql = require("mysql2")

const pool = mysql.createPool({
    "host":"localhost",
    "user":"shivam",
    "password":"qwerty777",
    "database":"newDatabase"
})

module.exports = pool;