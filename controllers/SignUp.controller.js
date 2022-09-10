const models = require('../models')
const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const tool = require('../tool')
//////////////////////////////////////////////////////////////////////

function sendOTP(req, res) {
    var OTP = Math.floor(1000 + Math.random() * 9000);
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    
    const httpRequest = require('https');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const data = `{
        "userName": "Rahmahi",
        "numbers":"${phone}",
        "userSender": "OTP",
        "apiKey": "bb8980e24850b7d60961cda4dc914f1d",
        "msg": "Pin Code is:${OTP}"
      }`;

    const request = httpRequest.request('https://www.msegat.com/gw/sendsms.php', options, response => {
        console.log('Status', response.statusCode);
        console.log('Headers', response.headers);
        let responseData = '';

        response.on('data', dataChunk => {
            responseData += dataChunk;
        });
        response.on('end', () => {
            console.log('Response: ', responseData)
            if (JSON.parse(responseData).code == 1) {
                createOTP(phone, OTP, res)
            } else {
                res.status(500).json({
                    OTP: responseData,
                })
            }
        });
    });
    request.on('error', error => console.log('ERROR', error));
    request.write(data);
    request.end();
}


//////////////////////////////////////////////////////////////////////
function createOTP(phone, OTP, res) {
    models.otp.findOne({ where: { phone } }).then(async result => {
        //if we sent OTP to the number before 
        if (result) {
            models.otp.update({ VerificationCode: OTP }, { where: { phone: phone } }).then(result => {
                res.status(201).json({
                    message: "OTP is  changed successfully",
                    result,
                    status: true
                })
            })
        } else {
            //start new user 
            models.otp.create({ phone: phone, VerificationCode: OTP }).then(result => {
                res.status(201).json({
                    message: "OTP create successfully",
                    OTP: result,
                    status: true
                })
            })
        }
    }).catch(error => {
        res.json({
            message: "Please send OTP and phone",
            error: error,
            status: false
        })
    })
}
//////////////////////////////////////////////////////////////////////without expired date
function verfiyOTP(req, res) {
    var OTP = req.body.OTP
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    models.otp.findOne({ where: { phone } }).then(async result => {
        if (result.VerificationCode == OTP) {
            models.otp.update({ isVerified: true }, { where: { phone: phone } }).then(result => {
                res.status(201).json({
                    message: "number is verfiyed successfully",
                    result: result,
                    status: true
                })
            })
        } else {
            res.json({
                message: "wrong OTP try again ",
                result,
                status: false
            })
        }
    }).catch(error => {
        res.json({
            message: "Please send OTP and phone",
            error: error,
            status: false
        })
    })
}
//////////////////////////////////////////////////////////////////////
function signUp(req, res) {
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    models.User.findOne({ where: { phone } }).then(async result => {
        if (result) {
            res.json({
                message: "User already exists!",
                user: result
            });
        } else {
            var user = {
                name: req.body.name,
                phone: phone,
                password: req.body.password,
                roleId: 1
            }
            const schema = {
                password: {
                    type: "string", min: 3, max: 6, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/
                }
            }
            const v = new Validator();
            const validateResponse = v.validate(user, schema)
            if (validateResponse !== true) {
                return res.status(400).json({
                    errors: validateResponse
                })
            }
            //hashing the password for securty
            user.password = await tool.hashing(user.password)
            //start new user 
            models.User.create(user).then(result => {
                var token = jwt.sign({
                    phone: user.phone,
                    name: user.name,
                    Id: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                })
                if (result) {
                    res.status(201).json({
                        message: "user create successfully ",
                        user: result,
                        token: token
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
function login(req, res) {
    //for make all number in DB with same format 
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    models.User.findOne({ where: { phone } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "You don't have account ... make Sign-Up",
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        phone: user.phone,
                        name: user.name,
                        Id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    res.status(201).json({
                        status: 'success',
                        token,
                        data: {
                            user,
                        },
                    });
                } else {
                    res.status(401).json({
                        message: "incorrect password",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}
//////////////////////////////////////////////////////////////////////
async function forgotPassword(req, res) {
    var str = req.body.phone
    phone = "966" + str.substring(str.length - 9)
    models.User.findOne({ where: { phone } }).then(async user => {
        if (user === null) {
            res.status(401).json({
                message: "You don't have account ... make Sign-Up",
            });
        } else {
            var user = {
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            }
            const schema = {
                password: {
                    type: "string", min: 3, max: 6, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/
                }, confirmPassword: { type: "equal", field: "password" },
            }
            const v = new Validator();
            const validateResponse = v.validate(user, schema)
            if (validateResponse !== true) {
                return res.status(400).json({
                    errors: validateResponse
                })
            }
            //hashing the password for securty
            user.password = await tool.hashing(user.password)
            models.User.update(user, { where: { phone: phone } }).then(result => {
                res.status(201).json({
                    message: "password is ubdated successfully",
                    result,
                    status: true
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}
//////////////////////////////////////////////////////////////////////
module.exports = {
    sendOTP: sendOTP,
    verfiyOTP: verfiyOTP,
    signUp: signUp,
    login: login,
    forgotPassword: forgotPassword
}
