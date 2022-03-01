"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
  async up(queryInterface, Sequelize) {
    // Read csv
    var data = fs.readFileSync(
      path.resolve(__dirname, "../data/users.csv"),
      "utf8"
    );
    let record_to_insert = [];
    // string to array conversion
    data = data.split("\n"); // SPLIT ROWS
    for (let i in data) {
      // splitting columns
      data[i] = data[i].split(",");
      record_to_insert.push({
        userId: data[i][0],
        firstName: data[i][1],
        lastName: data[i][2],
        email: data[i][3],
        password: data[i][4],
        isTeacher: data[i][5],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log("record_to_insert::::::", record_to_insert);
    await queryInterface.bulkInsert("Users", record_to_insert, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
