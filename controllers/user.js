const USER = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "dhrumpatel007@gmail.com",
      pass: "gntjzdeqfjyheupt",
    },
  });


// async..await is not allowed in global scope, must use a wrapper
async function main(mail) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'dhrumpatel007@gmail.com', // sender address
      to: mail, // list of receivers
      subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //  
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

exports.SECURE = async function(req,res, next){
  try {
    let token= req.headers.authorization
    if(!token){
      throw new Error("Please Enter Valid Token")
    }
    let tokendata = jwt.verify(token,"SURAT")
    console.log(tokendata.id)
    let checkUser = await USER.findById(tokendata.id)
    if(!checkUser){
      throw new Error("User not found")
    }
next()
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}


exports.SignupData = async function (req, res, next) {
    try {
      const signUp = req.body
      if (!signUp.name || !signUp.email || !signUp.password) {
        throw new Error("Please Enter Valid Fields")
      }
      signUp.password = await bcrypt.hash(signUp.password, 10)
      const data = await USER.create(signUp)
      var token = jwt.sign({ id: data._id }, 'SURAT');
      await main(signUp.email)
      res.status(201).json({
        message: "signUp Successful",
        data,
        token
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }

  exports.LoginData = async function (req, res, next) {
    try {
      const loginData = req.body
      if (!loginData.email || !loginData.password) {
        throw new Error("Please Enter Valid Fields")
      }
  
      const checkUser = await USER.findOne({ email: loginData.email })
      console.log(checkUser)
      if (!checkUser) {
        throw new Error("Email is Wrong")
      }
  
      const checkPass = await bcrypt.compare(loginData.password, checkUser.password)
  
      if (!checkPass) {
        throw new Error("password is wrong")
      }
      await main(loginData.email)
      var token = jwt.sign({ id: checkUser._id }, 'SURAT');

      res.status(200).json({
        message: "Login Successful",
        data: checkUser,
        token
      })
    } catch (error) { 
      res.status(404).json({
        message: error.message
      })
    }
  }

  