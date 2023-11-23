const QUIZ = require('../model/quiz')


exports.AddQuiz = async function (req, res, next) {
    try {
      console.log(req.body);
      if (!req.body.question || !req.body.option || !req.body.answer || !req.body.category) {
        throw new Error("Please Enter the Valid Field")
      }
      const data = await QUIZ.create(req.body)
      res.status(201).json({
        message: "Data Add Successful",
        data: data
      })
  
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }

exports.GetQuiz = async function (req, res, next) {
    try {
  
      const data = await QUIZ.find().populate('category')
      res.status(201).json({
        message: "All Record Find",
        data: data
      })
  
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }

exports.DeleteQuiz = async function (req, res, next) {
    try {
      console.log(req.query.id)
      await QUIZ.findByIdAndDelete(req.query.id)
      res.status(201).json({
        message: "Delete Successful"
      })
  
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }

exports.UpdateQuiz = async function (req, res, next) {
    try {
  
      await QUIZ.findByIdAndUpdate(req.query.id, req.body)
      res.status(201).json({
        message: "Data Update Successful"
      })
  
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  }