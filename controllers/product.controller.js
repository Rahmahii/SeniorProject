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
    models.product.belongsTo(models.category)
    models.category.hasMany(models.product)

    models.product.findAll({
        where: { storeId: store },
        attributes: ['id','name', 'price', 'barcodeNum', 'description','image'],
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
    var product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sellPrice: req.body.sellPrice,
        barcodeNum: req.body.barcodeNum,
        categoryId: req.body.categoryId,
        storeId: req.body.storeId,
        currencyId: req.body.currencyId,
        image: req.file.path
    }
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
async function update(req, res) {
    const id = req.body.id
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sellPrice: req.body.sellPrice,
        barcodeNum: req.body.barcodeNum,
        categoryId: req.body.categoryId,
        storeId: req.body.storeId,
        currencyId: req.body.currencyId,
        image: req.file.path
    }

    models.product.update(product, { where: { id } }).then(result => {
        res.status(201).json({
            message: "product updated successfully",
            product: product
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error
        })
    })

}
//////////////////////////////////////////////////////////////////////
async function updateName(req, res) {
    const id = req.body.id
    const updateduser = {
        name: req.body.name,
    }
    models.product.update(updateduser, { where: { id: id } }).then(result => {
        res.status(201).json({
            message: "product name updated successfully",
            product: updateduser,
            status: true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status: true
        })
    })

}
//////////////////////////////////////////////////////////////////////
async function updateCategory(req, res) {
    const id = req.body.id
    const updateduser = {
        categoryId: req.body.categoryId,
    }
    models.product.update(updateduser, { where: { id } }).then(result => {
        res.status(201).json({
            message: "product category updated successfully",
            product: updateduser,
            status: true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status: true
        })
    })

}
//////////////////////////////////////////////////////////////////////
async function updatePrice(req, res) {
    const id = req.body.id
    const updateduser = {
        price: req.body.price,
        sellPrice: req.body.price,
    }
    models.product.update(updateduser, { where: { id } }).then(result => {
        res.status(201).json({
            message: "product category updated successfully",
            product: updateduser,
            status: true
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status: true
        })
    })

}
//////////////////////////////////////////////////////////////////////
module.exports = {
    getProductsBySore,
    FindProductByBarcode,
    FindProductById,
    updateCategory,
    updateName,
    updatePrice,
    index,
    StorAdminView,
    create,
    update
}