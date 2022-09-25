const { user } = require('../app')
const models = require('../models')
const tool = require('../tool')
//////////////////////////////////////////////////////////////////////
function findNearest(req, res) {
    var lat1 = req.body.Location_Latitude
    var lon1 = req.body.Location_Longitude
    var lat2 = 0
    var lon2 = 0
    var dist = 0
    var storeList = []
    models.Store.findAll().then(result => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                lat2 = result[i].Location_Latitude
                lon2 = result[i].Location_Longitude
                dist = distance(lat1, lon1, lat2, lon2)
                if (dist <= .100 && dist >= -.100) {
                    storeList.push(result[i])
                }
            }
            if (storeList != 0) {
                res.status(200).json({
                    message: "there is stores",
                    storeList
                })
            } else {
                res.status(200).json({
                    message: "There are no stores nearby",
                    storeList
                })
            }
        }}).catch(error => {
            res.status(500).json({
                message: "something went wrong ",
                error: error
            })
        })

}
//////////////////////////////////////////////////////////////////////
function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344 //to kilometer
    return dist
}
//////////////////////////////////////////////////////////////////////
function index(req, res) {
    models.Store.findAll().then(result => {
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
    phone = tool.PhoneFormat(req.body.phone)
    models.Store.findOne({ where: { phone } }).then(async result => {
        if (result) {
            res.json({
                message: "Store already exists!",
                Store: result
            });
        } else {
            var store = {
                name: req.body.name,
                phone: phone,
                email: req.body.email,
                Location_Latitude: req.body.Location_Latitude,
                Location_Longitude: req.body.Location_Longitude
            }
            //start new user 
            models.store.create(store).then(result => {
                if (result) {
                    res.status(201).json({
                        message: "store create successfully ",
                        store: result,
                    })
                }
            }).catch(error => {
                res.status(400).json({
                    message: "something went wrong ",
                    error: error
                })
            })
        }
    })
}
//////////////////////////////////////////////////////////////////////
module.exports = {
    index, create, findNearest
}