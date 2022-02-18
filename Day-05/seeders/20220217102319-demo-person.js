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
        createdAt: "2022-01-23 15:29:55.725+05",
        updatedAt: "2022-01-23 15:29:55.725+05",
      },
      {
        name: "Ella",
        gender: "Doe",
        height: "5.5'",
        createdAt: "2022-01-23 15:29:55.725+05",
        updatedAt: "2022-01-23 15:29:55.725+05",
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
