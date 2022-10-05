import express from 'express'
const router = express.Router()
import * as controller from './auth-controller'

//login endpoint
router.post('/auth', controller.index)

export default router
