const express = require('express')
const router = express.Router()
const Question = require('./questions_model')

// get all questions
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

// get random 3 questions
router.get('/random', (req, res) => {
  Question.find({}, (err, questions) => {
    if(questions){
      var randomQuestions = []
      var randomIndex = []
      var i=0
      while(i<3){
        let index = Math.floor(Math.random() * Math.floor(questions.length))
        console.log(index)
        if(randomIndex.indexOf(index) == -1){
          randomIndex.push(index)
          randomQuestions.push(questions[index])
          i++
        }
      }
      res.status(200).json(randomQuestions)
    }
    if(err){
      res.status(400).json(err)
    }
  })
})

module.exports = router

