require("dotenv").config();
const mysql = require("mysql");

const DBNAME = `${process.env.DBNAME}`;
const USERNAME = `${process.env.USERNAME}`;
const PASSWORD = `${process.env.PASSWORD}`;

const connectToDb = async () => {
  try {
    const db = mysql.createConnection({
      host: "localhost",
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DBNAME,
    });
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(0);
  }
};

module.exports = connectToDb;
