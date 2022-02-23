"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
  async up(queryInterface, Sequelize) {
    // (A) READ CSV INTO STRING
    var data = fs.readFileSync(
      path.resolve(__dirname, "../data/teachers.csv"),
      "utf8"
    );
    console.log("data::::::", data);
    let record_to_insert = [];
    // (B) STRING TO ARRAY
    data = data.split("\n"); // SPLIT ROWS
    for (let i in data) {
      // (C) SPLIT COLUMNS
      data[i] = data[i].split(",");
      record_to_insert.push({
        firstName: data[i][0],
        lastName: data[i][1],
        email: data[i][2],
        teacher_id: data[i][3],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log("record_to_insert::::::", record_to_insert);
    await queryInterface.bulkInsert("Teachers", record_to_insert, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete("Teachers", null, {});
  },
};
