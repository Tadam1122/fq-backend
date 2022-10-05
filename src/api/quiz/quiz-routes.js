import express from 'express'
const router = express.Router()
import * as controller from './quizzes-controller'

//create quiz
router.post('/quiz', controller.create)

//get all quizzes
router.get('/quiz', controller.index)

//get single quiz by id
router.get('/quiz/:id', controller.show)

//update quiz
router.put('/quiz', controller.update)

//remove quiz
router.delete('/quiz/:id', controller.remove)

export default router
