import express from 'express'
const router = express.Router()
import * as controller from './admin-controller'

//get single quiz by id
router.get('/admin/:id', controller.show)

export default router
