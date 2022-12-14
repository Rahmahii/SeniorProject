const models = require('../models')
var Sequelize = require("sequelize");

function create(req, res) {
    var invoiceHeader = {
        purchaseDate: new Date(),

        totalPrice: req.body.totalPrice,
        paymentGatwayId: req.body.paymentGatwayId,
        userId: req.body.userId,
        storeId: req.body.storeId,
        CreditCardHolder: req.body.CreditCardHolder,
        CreditCardNum: req.body.CreditCardNum,
        CreditBankName: req.body.CreditBankName,
        depositCardHolder: req.body.depositCardHolder,
        depositCardNum: req.body.depositCardNum,
        depositBankName: req.body.depositBankName,
        IsPaid: false
    }
    if (invoiceHeader.paymentGatwayId != 1) {
        invoiceHeader.IsPaid = true
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
                    models.product.findOne({ where:{id:items[index].productId}}).then(product => {
                        console.log(product)
                        if(product){
                        if (product.storeId == invoiceHeader.storeId) {
                            console.log("from iside condetion")

                            var item = {
                                invoiceHeaderId: invoice_header.id,
                                productId: items[index].productId,
                                quantity: items[index].quantity,
                                PurchasingPrice: items[index].PurchasingPrice,

                            }
                            item.product = product.name
                            models.invoice_detail.create(item).then(invoice_detail => {
                                invoice_detail.product = product.name

                                i.push(item)

                                if (invoice_detail && index == items.length - 1) {
                                    res.status(201).json({
                                        message: "invoice create successfully ",
                                        invoice_header,
                                        store: store.name,
                                        items: i,
                                        status: true,
                                    })
                                }
                            })
                        }
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
function getUserStoreInvoices(req, res) {
    const user = req.body.userId
    const store = req.body.storeId
    models.user.findByPk(user).then(result1 => {
        if (result1) {
            models.invoice_header.findAll({
                where: { userId: user, storeId: store, IsPaid: 1 },
                attributes: ['totalPrice', 'createdAt'],
                include: [{
                    model: models.invoice_detail,
                    attributes: ['quantity'],
                    include: [{
                        model: models.product,
                        attributes: ['name', 'sellPrice'],
                    },
                    ]
                },
                {
                    model: models.payment_gatway,
                    attributes: ['name']
                },
                {
                    model: models.store,
                    attributes: ['name'],
                }
                ],
            }).then(result => {
                res.status(201).json({ user: result1.name, invoices: result })
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

function getUserInvoices(req, res) {
    const user = req.body.userId
    models.user.findByPk(user).then(result => {
        if (result) {
            models.invoice_header.findAll({
                where: { userId: user },
                attributes: ['totalPrice', 'createdAt'],
                include: [{
                    model: models.invoice_detail,
                    attributes: ['quantity'],
                    include: [{
                        model: models.product,
                        attributes: ['name', 'sellPrice'],
                    },
                    ]
                },
                {
                    model: models.payment_gatway,
                    attributes: ['name']
                },
                {
                    model: models.store,
                    attributes: ['name'],
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
            attributes: ['id', 'name', 'phone'],
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
function getInvoice(req, res) {
    const id = req.body.id
    console.log(id)
    models.invoice_header.findOne({
        where: { id: id },
        attributes: ['totalPrice', 'createdAt'],
        include: [{
            model: models.invoice_detail,
            attributes: ['quantity'],
            include: [{
                model: models.product,
                attributes: ['name', 'sellPrice'],
            },
            ]
        },
        {
            model: models.payment_gatway,
            attributes: ['name']
        },
        {
            model: models.store,
            attributes: ['name'],
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
function cashIsPaid(req, res) {
    const id = req.body.id

    const updateduser = {
        IsPaid:1  
    }

    models.invoice_header.update(updateduser, { where: { id } }).then(result => {
        res.status(201).json({
            message: "invoice is paied successfully",
            status:true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status:false
        })
    })

}

module.exports = {
    create,
    getUserInvoices,
    getStoreInvoices,
    getUserStoreInvoices,
    getInvoice,
    cashIsPaid
}