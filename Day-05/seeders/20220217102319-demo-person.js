"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    return queryInterface.bulkInsert("People", [
      {
        name: "John",
        gender: "Doe",
        height: "6''",
        cnic: "333311190",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ella",
        gender: "Doe",
        height: "5.5'",
        cnic: "333311190",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    return queryInterface.bulkDelete("People", null, {});
  },
};
