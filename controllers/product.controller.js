const models = require('../models')
//////////////////////////////////////////////////////////////////////
function getProductsBySore(req, res) {
    storeId = req.body.storeId
    models.product.findAll({ where: { storeId } }).then(async result => {
        if (result) {
            res.status(200).json({
                message: "Store has products",
                status: true,
                Products: result,
            });
        } else {
            res.status(400).json({
                message: "user is not exist",
                status: false
            });
        }
    })
}
//////////////////////////////////////////////////////////////////////
function FindProductById(req, res) {
    const id = req.body.id
    models.product.findByPk(id).then(result => {
        res.status(200).json({
            message: "product is exsist",
            status: true,
            Product: result,
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}

//////////////////////////////////////////////////////////////////////
function FindProductByBarcode(req, res) {
    const barcodeNum = req.body.barcodeNum
    const storeId = req.body.storeId

    models.product.findOne({ where: { barcodeNum, storeId } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "product is exsist",
                status: true,
                Product: result,
            });
        } else {
            res.status(200).json({
                message: "product is not exsist",
                status: false,
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            status: false,
            error: error
        })
    })
}

module.exports = {
    getProductsBySore,
    FindProductByBarcode
}