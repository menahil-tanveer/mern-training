"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("userProfiles", [
      {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        DOB: "6 December 1986",
        createdAt: "2022-01-23 15:29:55.725+05",
        updatedAt: "2022-01-23 15:29:55.725+05",
        userId: "2",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("userProfiles", null, {});
  },
};
