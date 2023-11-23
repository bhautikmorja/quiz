var express = require('express');
var router = express.Router();
const QUIZ = require('../model/quiz')
const USER = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const categoryController = require('../controllers/category')
const quizController = require('../controllers/quiz')
const userController = require('../controllers/user')
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
/* GET home page. */

//-----------Category-----------//
//Create
router.post('/category', categoryController.AddCategory);

//Get
router.get('/category', categoryController.GetCategories);

//Delete
router.delete('/category', categoryController.DeleteCategory);

//Update
router.put('/category', categoryController.UpdateCategory);



//-----------Quiz Data-----------//

//Create
router.post('/quiz', quizController.AddQuiz);

//Get
router.get('/quizzes', userController.SECURE, quizController.GetQuiz);

//Delet
router.delete('/quiz', quizController.DeleteQuiz);

//Update
router.put('/quiz', quizController.UpdateQuiz);

//-----------LOGData-----------//
router.post('/signup', userController.SignupData);

router.post('/login', userController.LoginData);

module.exports = router;
