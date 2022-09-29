'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('integerates', [{
      storeId:1,
      gatawayId:1,
      accountNum: "0123456789",
      accountName:"Mohammed",
      bankName:"Al-Rajhi",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeId:1,
      gatawayId:2,
      accountNum: "9876543210",
      accountName:"Ali",
      bankName:"Al-Ahly",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeId:2,
      gatawayId:1,
      accountNum: "5556667789",
      accountName:"Sara",
      bankName:"Al-Ahly",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      storeId:2,
      gatawayId:2,
      accountNum: "2255887788",
      accountName:"Nora",
      bankName:"Al-Rajhi",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },

  async down (queryInterface, Sequelize) {
  
  }
};
