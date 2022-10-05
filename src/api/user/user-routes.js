import express from 'express'
const router = express.Router()
import * as controller from './user-controller'

//get all users
router.get('/user', controller.index)

export default router
