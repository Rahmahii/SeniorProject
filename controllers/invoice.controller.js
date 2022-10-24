const models = require('../models')
var Sequelize = require("sequelize");
const { QueryTypes } = require('@sequelize/core');

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
        IsPaid:false
    }
    if(invoiceHeader.gatawayId!=1){  
        invoiceHeader.IsPaid=true
    }
    //start new 
    i = []
   
    models.invoice_header.create(invoiceHeader).then(invoice_header => {
        if (invoice_header) {
            models.store.findByPk(invoiceHeader.storeId).then(store => {

            var items = req.body.items
            console.log(items)

            for (let index = 0; index < items.length; index++) {
                console.log(items[index].productId)
                models.product.findByPk(items[index].productId).then(product => {
                    if (product.storeId == invoiceHeader.storeId) {
                        console.log("from iside condetion")

                        var item = {
                            invoiceHeaderId: invoice_header.id,
                            productId: items[index].productId,
                            quantity: items[index].quantity,
                            PurchasingPrice: items[index].PurchasingPrice,
                            
                        }
                        item.product=product.name
                        models.invoice_detail.create(item).then(invoice_detail => {
                            invoice_detail.product=product.name
                          
                            i.push(item)
                            
                            if (invoice_detail && index == items.length - 1) {
                                res.status(201).json({
                                    message: "invoice create successfully ",
                                    invoice_header,
                                    store:store.name,
                                    items: i,
                                    status: true,
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

function getUserInvoices(req, res) {
    const user = req.body.userId
    models.user.findByPk(user).then(result => {
        if (result) {
            models.invoice_header.findAll({
                where: { userId: user },
                attributes: ['totalPrice'],
                include: [{
                    model: models.invoice_detail,
                    attributes: ['quantity'],
                    include: [{
                        model: models.product,
                        attributes: ['name', 'sellPrice'],
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
function getStoreInvoices(req, res) {
    const storeId = req.body.storeId

    models.invoice_header.findAll({
        where: { storeId },
        attributes: [[Sequelize.fn('sum', Sequelize.col('totalPrice')), 'total_amount'],
        [Sequelize.fn('count', Sequelize.col('invoice_header.id')), 'count'],
        [Sequelize.fn('max', Sequelize.col('invoice_header.purchaseDate')), 'last']
        ],
        // 
        include: [{
            model: models.user,
            attributes: ['name', 'phone'],
        },
        {
            model: models.store,
            attributes: ['name'],
        }
        ],
        group: ['invoice_header.storeId', 'userId'],
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
function dashboard(req, res) {
    const storeId = req.body.storeId
    models.invoice_header.findAll({
        where: { storeId },
        attributes: [
            [Sequelize.literal('COUNT(DISTINCT(userId))'), 'no_users'],
            [Sequelize.fn('count', Sequelize.col('invoice_header.id')), 'total'],
            [Sequelize.fn('sum', Sequelize.col('totalPrice')), 'total_amount']
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
async function dashboard_2(req, res) {
    
    // models.product.hasMany(models.invoice_detail)
    // models.invoice_detail.belongsTo(models.product)
        const storeId = req.body.storeId
        models.product.findAll({
            where: { storeId },
            attributes: ['name'],
            include: [{
                
                model: models.invoice_detail,
                attributes: [[Sequelize.fn('count', Sequelize.col('productId')), 'total'],
                [Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity']], 
                order: [['invoice_detail.total', 'DESC']],      
            }],
            limit: 1,
            group: ['name'],
            
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
    create,
    getUserInvoices,
    getStoreInvoices,
    dashboard,
    dashboard_2
}