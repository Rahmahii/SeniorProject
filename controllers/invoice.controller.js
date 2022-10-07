const { DATE } = require('sequelize')
const models = require('../models')

function create(req, res) {
    var invoiceHeader = {
        purchaseDate: new Date(),
        totalPrice: req.body.totalPrice,
        gatawayId: req.body.gatawayId,
        userId: req.body.userId,
        storeId: req.body.storeId,
        CreditCardHolder: req.body.CreditCardHolder,
        CreditCardNum: req.body.CreditCardNum,
        CreditBankName: req.body.CreditBankName,
        depositCardHolder: req.body.depositCardHolder,
        depositCardNum: req.body.depositCardNum,
        depositBankName: req.body.depositBankName,
    }
    //start new 
    i = []
    models.invoice_header.create(invoiceHeader).then(invoice_header => {
        if (invoice_header) {
            var items = req.body.items
            console.log(items)

            for (let index = 0; index < items.length; index++) {
                console.log(items[index].productId)
                models.product.findByPk(items[index].productId).then(product => {
                    if (product.storeId == invoiceHeader.storeId) {
                        console.log("from iside condetion")

                        var item = {
                            invoiceHeaderId: product.id,
                            productId: items[index].productId,
                            quantity: items[index].quantity,
                            PurchasingPrice: items[index].PurchasingPrice
                        }
                        models.invoice_detail.create(item).then(invoice_detail => {
                            i.push(invoice_detail)
                            if (invoice_detail && index == items.length - 1) {
                                res.status(201).json({
                                    message: "product create successfully ",
                                    item: i,
                                    status: true
                                })
                            }
                        })
                    } else {
                        res.status(200).json({
                            message: "item cannot belong to this store ",
                            status: false
                        })
                    }
                })
            }
        }
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong",
            error: error,
            status: false
        })
    })
}
function getUserInvoices(req, res) {
    const user = req.body.userId
    models.user.findByPk(user).then(result => {
        if (result) {
            models.invoice_header.findAll({
                where: { userId: user },
                attributes: ['totalPrice'],
                include: [{
                    model: models.invoice_detail,
                    attributes: [ 'quantity'],
                    include:[{
                        model: models.product,
                        attributes: ['name','sellPrice'],
                    }]
                },
                {
                    model: models.payment_gatway,
                    attributes: ['name']
                }

                ],
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

    }).catch(error => {
        res.status(400).json({
            message: "something went wrong",
            error: error,
            status: false
        })
    })


}
module.exports = {
    create,
    getUserInvoices
}