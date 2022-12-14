'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('invoice_headers', [{
      purchaseDate: new Date(),
      totalPrice:4,
      storeId:1,
      paymentGatwayId:1,
      userId:2,
      IsPaid:1,
      paymentGatwayId:1,
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
      totalPrice:4,
      storeId:1,
      paymentGatwayId:1,
      userId:2,
      IsPaid:1,
      paymentGatwayId:1,
      CreditCardHolder:"Rahmah",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Lameer",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-9-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:16,
      storeId:1,
      paymentGatwayId:1,
      userId:1,
      IsPaid:1,
      paymentGatwayId:2,
      CreditCardHolder:"Rahmah",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Lameer",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-9-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:0,
      storeId:1,
      paymentGatwayId:1,
      userId:1,
      IsPaid:1,
      paymentGatwayId:2,
      CreditCardHolder:"Rahmah",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Lameer",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-7-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:300,
      storeId:2,
      paymentGatwayId:2,
      userId:1,
      IsPaid:1,
      paymentGatwayId:2,
      CreditCardHolder:"Mariam",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Nada",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-8-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:300,
      storeId:2,
      paymentGatwayId:2,
      userId:1,
      IsPaid:1,
      paymentGatwayId:3,
      CreditCardHolder:"Mariam",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Nada",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-8-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:10,
      storeId:1,
      paymentGatwayId:1,
      userId:1,
      IsPaid:1,
      paymentGatwayId:2,
      CreditCardHolder:"Rahmah",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Lameer",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-9-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:300,
      storeId:2,
      paymentGatwayId:2,
      userId:1,
      IsPaid:1,
      paymentGatwayId:2,
      CreditCardHolder:"Mariam",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Nada",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-7-29',
      updatedAt: new Date()
    },
    {
      purchaseDate: new Date(),
      totalPrice:300,
      storeId:2,
      paymentGatwayId:2,
      userId:1,
      IsPaid:1,
      paymentGatwayId:3,
      CreditCardHolder:"Mariam",
      CreditCardNum:"99887744",
      CreditBankName:"Al-Ahly",
      depositCardHolder:"Nada",
      depositCardNum:"87755664422",
      depositBankName:"Al-Ahly",
      createdAt: '2022-7-29',
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
