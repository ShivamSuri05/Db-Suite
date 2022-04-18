const mysql = require("mysql2")

const pool = mysql.createPool({
    "host":"yourhost",
    "user":"your_username",
    "password":"your_password",
    "database":"your_database_name"
})

module.exports = pool;