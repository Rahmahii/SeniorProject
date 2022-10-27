const models = require('../models')

function index(req, res) {
    models.category.findAll().then(result => {
        res.status(201).json({
            categories: result,
            status:true
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}

module.exports = {
    index,
}