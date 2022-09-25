'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('stores', [{
      name: 'SloTec',
      Phone:"0531917860",
      email:"SloTec@gmail.com",
      Location_Latitude:21.535934134955454,
      Location_Longitude: 39.230977415805825,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'KAU',
      Phone:"0508704669",
      email:"KAU@gmail.com",
      Location_Latitude:21.541682402818033,
      Location_Longitude: 39.209133504624184,
      createdAt: new Date(),
      updatedAt: new Date()
    }
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
