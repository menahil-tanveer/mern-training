"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.removeColumn("Courses", "id");
    // addConstraint(tableName: string, attributes: Array, options: Object, rawTablename: string)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.addColumn("Courses", {
      name: "id",
      type: Sequelize.INTEGER,
    });
  },
};
