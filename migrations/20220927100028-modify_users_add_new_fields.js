'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: "Nahid",
      email:"NN@gmail.com",
      password:"055555t",
      phone:"0531914456",
      gender:1,
      isActive:1,
      isActive:1,
      roleId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Arwa",
      email:"aa@gmail.com",
      password:"055555t",
      phone:"0531884456",
      gender:1,
      isActive:1,
      isActive:1,
      roleId:1,
      storeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ]);
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
