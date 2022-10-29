const models = require('../models')
const Op = require('sequelize').Op;
//////////////////////////////////////////////////////////////////////
function getProductsByStore(req, res) {
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
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            status: false,
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function CountProductsforStore(req, res) {
    storeId = req.body.storeId
    models.product.findAll({ where: { storeId }, attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total_product']] }).then(async result => {
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
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            status: false,
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function FindProductById(req, res) {
    const id = req.body.id
    models.product.findByPk(id).then(result => {
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
//////////////////////////////////////////////////////////////////////
function index(req, res) {
    models.product.findAll().then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////

function StorAdminView(req, res) {
    const store = req.body.storeId

    models.product.findAll({
        where: { storeId: store },
        attributes: ['id', 'name', 'price','sellPrice', 'barcodeNum', 'description', 'image'],
        include: [{
            model: models.category,
            where: models.category.id = models.product.categoryId,
            attributes: ['name']
        }]
    }).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function FindSimilar(req, res) {
    const store = req.body.storeId
    const category = req.body.categoryId
    const productId = req.body.id

    models.product.findAll({
        where: { storeId: store, categoryId: category, id: { [Op.ne]: productId } },
        // attributes: ['id', 'name', 'price', 'barcodeNum', 'description', 'image'],
        include: [{
            model: models.category,
            where: models.category.id = models.product.categoryId,
            attributes: ['name']
        }]
    }).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function create(req, res) {
    console.log("ooooooooooo")
    var product = {
        name: req.body.name[0],
        description: req.body.description[0],
        price: req.body.price[0],
        sellPrice: req.body.sellPrice[0],
        barcodeNum: req.body.barcodeNum[0],
        categoryId: req.body.categoryId[0],
        storeId: req.body.storeId[0],
        currencyId: req.body.currencyId,
        image: req.file.path
    }
    console.log(product)
    models.product.create(product).then(result => {
        if (result) {
            res.status(201).json({
                message: "product create successfully ",
                product: result,
            })
        }
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error
        })
    })
}
//////////////////////////////////////////////////////////////////////
function update(req, res) {
    const id = req.body.id
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sellPrice: req.body.sellPrice,
        barcodeNum: req.body.barcodeNum,
        categoryId: req.body.categoryId,
    }
    console.log(id)
    console.log(product)
    models.product.update(product, { where: { id:id } }).then(result => {
        res.status(201).json({
            message: "product updated successfully",
            product: product,
            status: true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status: false
        })
    })

}
//////////////////////////////////////////////////////////////////////
function updateImage(req, res) {
    const id = req.body.id
    const product = {
        image: req.file.path
    }
    console.log(id)
    models.product.update(product, { where: { id:id } }).then(result => {
        res.status(201).json({
            message: "product image updated successfully",
            product: product,
            status: true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status: false
        })
    })

}
//////////////////////////////////////////////////////////////////////
function destroy(req, res) {
    const id = req.params.id
    models.product.destroy({ where: { id: id } }).then(result => {
        res.status(201).json({
            message: "product " + id + " deleted successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}

module.exports = {
    getProductsByStore,
    FindProductByBarcode,
    FindProductById,
    updateImage,
    index,
    StorAdminView,
    create,
    update,
    FindSimilar,
    destroy
}