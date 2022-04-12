const mysql = require("mysql2")

const pool = mysql.createPool({
    "host":"localhost",
    "user":"shivam",
    "password":"qwerty777",
    "database":"oldDatabase"
})
console.log("in config")
module.exports = pool;