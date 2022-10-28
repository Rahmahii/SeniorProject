const models = require('../models')
var Sequelize = require("sequelize");
//////////////////////////////////////////////////////////////////////
function CountProductsforStore(req, res) {
    storeId = req.body.storeId
    models.product.findAll({ where: { storeId }, attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total_product']] }).then(async result => {
        if (result) {
            res.status(200).json(result,
            );
        }
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            status: false,
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function countInvoiceInfo(req, res) {
    const storeId = req.body.storeId
    models.invoice_header.findAll({
        where: { storeId },
        attributes: [
            [Sequelize.literal('COUNT(DISTINCT(userId))'), 'no_users'],
            [Sequelize.fn('count', Sequelize.col('invoice_header.id')), 'total'],
            [Sequelize.fn('sum', Sequelize.col('totalPrice')), 'total_amount']
        ],
    }).then(result => {
        res.status(201).json(
            result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error,
            status: false
        })
    })
}
//////////////////////////////////////////////////////////////////////
async function BestProductForStore(req, res) {
    const storeId = req.body.storeId

    models.invoice_detail.findAll({
        attributes: [[Sequelize.fn('sum', Sequelize.col('quantity')), 'Total']],
        order: [[Sequelize.fn('sum', Sequelize.col('quantity')), 'DESC']],
        limit: 1,
        group: ['productId'],

        include: [{
            model: models.product,
            where: { storeId },
            attributes: ['name'],
        }]

    }).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error,
            status: false
        })
    })


}

module.exports = {
    BestProductForStore,
    CountProductsforStore,
    countInvoiceInfo
}