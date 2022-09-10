const { user } = require('../app')
const models = require('../models')
const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const tool = require('../tool')
require("dotenv").config();

function getUserByPhone(req, res) {
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    models.User.findOne({ where: { phone } }).then(async result => {
        if (result) {
            res.status(200).json({
                message: "user already exist! make login",
                result,
                status: true
            });
        } else {
            res.status(200).json({
                message: "User is not exist",
                result,
                status: false
            });
        }
    })
}
function show(req, res) {
    const id = req.params.id
    models.User.findByPk(id).then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}
function index(req, res) {
    models.User.findAll().then(result => {
        res.status(201).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong ",
            error: error
        })
    })
}

async function update(req, res) {
    const id = req.params.id
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
    }
    updatedUser.password = await tool.hashing(updatedUser.password)
    models.User.update(updatedUser, { where: { id: id } }).then(result => {
        res.status(201).json({
            message: "user updated successfully",
            user: updatedUser
        })
    }).catch(error => {
        res.status(400).json({
            message: "something went wrong ",
            error: error
        })
    })

}
function destroy(req, res) {
    const id = req.params.id
    models.User.destroy({ where: { id: id } }).then(result => {
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

module.exports = {
    getUserByPhone:getUserByPhone,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
