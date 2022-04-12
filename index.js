const express = require("express");
const db = require("./dbQueryHandler");

const app = express();

const ob = new db();
let sql = "SELECT * FROM employee";
ob.query(sql);
ob.query(sql);

