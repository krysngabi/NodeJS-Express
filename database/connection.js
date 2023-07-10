const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const express = require("express");
const app = express();

var mysql = require("mysql2");
var connection = mysql.createPool({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "nodepractice",
});

connection.getConnection(function (err, connection) {
  console.log("Connecting to DB at " + new Date());
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

async function dbQuery(databaseQuery) {
  return new Promise((data) => {
    connection.query(databaseQuery, function (error, result) {
      if (error) {
        // throw error;
        data(error)
        console.log(error)
      }
      try {
        data(result);
      } catch (error) {
        data({});
        // throw error;
        throw new Error(error)
      }
    });
  });
}

module.exports = {
  connection,
  dbQuery,
};
