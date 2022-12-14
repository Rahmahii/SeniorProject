const models = require('../models')
const tool = require('../tool')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//////////////////////////////////////////////////////////////////////
function signUpAdmin(req, res) {
    const email = req.body.email
    models.user.findOne({ where: { email } }).then(async result => {
        if (result) {
            res.json({
                message: "user already exists!",
                user: result,
                status: false
            });
        } else {
            const phone = tool.PhoneFormat(req.body.phone)
            var user = {
                name: req.body.name,
                email: email,
                phone: phone,
                password: req.body.password,
                storeId: req.body.storeId,
                gender: req.body.gender,
                roleId: 3,
            }
            // const schema = {
            //     password: {
            //         type: "string", min: 3, max: 6, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/
            //     }
            // }
            // const v = new Validator();
            // const validateResponse = v.validate(user, schema)
            // if (validateResponse !== true) {
            //     return res.status(400).json({
            //         errors: validateResponse
            //     })
            // }

            //hashing the password for securty
          //  user.password = await tool.hashing(user.password)
            //start new user 
            models.user.create(user).then(result => {
                // var token = jwt.sign(tool.sign(user), process.env.JWT_SECRET, {
                //     expiresIn: process.env.JWT_EXPIRES_IN,
                // })
                if (result) {
                    res.status(201).json({
                        message: "sub-admin create successfully ",
                        user: result,
                        status: true
                        // token: token
                    })
                }
            }).catch(error => {
                res.status(400).json({
                    message: "something went wrong ",
                    error: error,
                    status: false
                })
            })
        }
    })
}
//////////////////////////////////////////////////////////////////////
function login(req, res) {
    const email = req.body.email
    models.user.findOne({ where: { email } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "You don't have account ... make Sign-Up",
                status: false
            });
        } else {    
            bcrypt.compare(req.body.password, user.password, function (err, result) {  
                if (result) {
                    if (user.IsApproved==0) {    
                        res.status(401).json({
                            message: "You are not approved yet please wait until get approved",
                            status: "waiting"
                        });
            
                    }else{
                    const token = jwt.sign(tool.sign(user), process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                  
                    // cookie("access_token", token, {
                    //     httpOnly: true,
                    //     //secure: process.env.JWT_SECRET,
                    //   })
                    res.status(201).json({
                        message: "Success",
                        status: true,
                        token:token,
                    })}
                } else {
                    res.status(400).json({
                        message: "incorrect password",
                        status: false
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            status: false
        });
    });
}
module.exports = {
    signUpAdmin,
    login,
}