'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('invoice_headers', [{
      purchaseDate: new Date(),
      totalPrice:100,
      storeId:1,
      gatawayId:1,
      userId:1,
      CreditCardHolder:"Rahmah",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Lameer",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:300,
      storeId:2,
      gatawayId:2,
      userId:1,
      CreditCardHolder:"Mariam",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Nada",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
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
