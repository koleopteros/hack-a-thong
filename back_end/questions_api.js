const express = require('express')
const router = express.Router()
const Question = require('./questions_model')

router.get('/all', (req, res) => {
  Question.find({}, (err, questions) => {
    if(questions){
      res.status(200).json(questions)
    }
    if(err){
      res.status(400).json(err)
    }
  })
})

module.exports = router

