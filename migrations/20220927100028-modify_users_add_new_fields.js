'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: "Lameer",
      email: "Lameer@gmail.com",
      password: "055555t",
      phone: "0533914456",
      gender: 2,
      isActive: 1,
      IsApproved: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Majed",
      email: "Majed@gmail.com",
      password: "055555t",
      phone: "0531864456",
      gender: 1,
      isActive: 1,
      IsApproved: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ali",
      email: "Ali@gmail.com",
      password: "055555t",
      phone: "0531884450",
      gender: 1,
      isActive: 1,
      IsApproved: 1,
      roleId: 3,
      storeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Hadi",
      email: "Hadi@gmail.com",
      password: "$2b$10$PYInEp0ElLBi1u8EkXEvDO4nUOHh41qTIPP6v7U3V5kIXwR./Adca",
      phone: "0533914456",
      gender: 1,
      isActive: 1,
      IsApproved: 1,
      roleId: 3,
      storeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ]);
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
