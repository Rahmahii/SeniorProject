const models = require('../models')

function create(req, res) {
    var card = {
        userId:req.body.userId,
        cardHolderName: req.body.cardHolderName,
        cardNum:req.body.cardNum,
        expiresDate:req.body.expiresDate
    
    }
    models.payment_card.create(card).then(result => {
        if (result) {
            res.status(201).json({
                message: "product create successfully ",
                card: result,
                status:true
            })
        }
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error,
            status:false
        })
    })
}
////////////////////////////////////////
function getUserCards(req, res) {
    userId = req.body.userId
    models.payment_card.findAll({ where: { userId } }).then(async result => {
        if (result) {
            res.status(200).json({
                message: "user has cards",
                status: true,
                cards: result,
            });
        } else {
            res.status(400).json({
                message: "cards are not exist",
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
////////////////////////////////////////
function destroy(req, res) {
    const id = req.body.id
    models.payment_card.destroy({ where: { id: id } }).then(result => {
        res.status(201).json({
            message: "card deleted successfully",
            status:true
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error,
            status:false
        })
    })
}
module.exports = {
    create,
    getUserCards,
    destroy
}