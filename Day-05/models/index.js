"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
require("dotenv").config();
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(
    `DB_NAME::::${process.env.DB_NAME},DB_USERNAME::::${process.env.DB_USERNAME},DB_PASSWORD::::${process.env.DB_PASSWORD}",`
  );
  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USERNAME,
  //   process.env.DB_PASSWORD,
  //   config
  // );
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect:
        "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    }
  );
}
// Check if connection has been established
try {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(() => {
      console.error("Unable to connect to the database:");
    });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
