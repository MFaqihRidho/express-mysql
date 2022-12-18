const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// Create the connection pool. The pool-specific settings are the defaults
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

const db = new Sequelize("express-jwt", "root", "3lpsycongr0", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;
