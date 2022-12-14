const models = require('../models')
const tool = require('../tool')
require("dotenv").config();

function getUserByPhone(req, res) {
    phone = tool.PhoneFormat(req.body.phone)
    models.user.findOne({ where: { phone } }).then(async result => {
        if (result) {
            res.status(200).json({
                message: "user already exist! make login",
                result,
                status: true
            });
        } else {
            res.status(400).json({
                message: "user is not exist",
                status: false
            });
        }
    })
}
function getUserByRole(req, res) {
    const roleId = req.body.roleId
    models.user.findAll({ where: { roleId } }).then(async result => {
        if (result) {
            res.status(200).json({
                users: result,
                status: true
            });
        } else {
            res.status(400).json({
                message: "there are no users",
                status: false
            });
        }
    })
}
function getUserByStore(req, res) {
    const storeId = req.body.storeId
    models.store.findAll({
        where: { id: storeId },
        attributes: ['name'],
        include: [{
            model: models.user,
            attributes: ['id', 'name', 'email', 'phone', 'createdAt']
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
function show(req, res) {
    const id = req.params.id
    models.user.findByPk(id).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
function index(req, res) {
    models.user.findAll().then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}

function update(req, res) {
    const id = req.body.id

    const updateduser = {
        id:id,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
    }

    models.user.update(updateduser, { where: { id: id }, attributes: ['name', 'email', 'gender'] }).then(result => {
        res.status(201).json({
            message: "user updated successfully",
            user: updateduser,
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
function destroy(req, res) {
    const id = req.params.id
    models.user.destroy({ where: { id: id } }).then(result => {
        res.status(201).json({
            message: "user " + id + " deleted successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
function approveUser(req, res) {
    const email = req.body.email

    const updateduser = {
        IsApproved:1  
    }

    models.user.update(updateduser, { where: { email } }).then(result => {
        res.status(201).json({
            message: "user approved successfully",
            user: result,
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
    getUserByPhone,
    show,
    index,
    update,
    destroy,
    getUserByRole,
    getUserByStore,
    approveUser
}

