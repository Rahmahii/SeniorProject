'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: "Nahid",
      email:"NN@gmail.com",
      password:"055555t",
      phone:"0533914456",
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
      phone:"0531864456",
      gender:1,
      isActive:1,
      isActive:1,
      roleId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ali",
      email:"Ali@gmail.com",
      password:"055555t",
      phone:"0531884450",
      gender:2,
      isActive:1,
      isActive:1,
      roleId:3,
      storeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Majd",
      email:"Majd@gmail.com",
      password:"055555t",
      phone:"0531114456",
      gender:2,
      isActive:1,
      isActive:1,
      roleId:3,
      storeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Saad",
      email:"Saad@gmail.com",
      password:"055555t",
      phone:"0531890456",
      gender:2,
      isActive:1,
      isActive:1,
      roleId:3,
      storeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "shaden",
      email:"shaden@gmail.com",
      password:"055555t",
      phone:"0534344456",
      gender:1,
      isActive:1,
      isActive:1,
      roleId:3,
      storeId:1,
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
