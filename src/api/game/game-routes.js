import express from 'express'
const router = express.Router()
import * as controller from './game-controller'

//login endpoint
router.post('/game', controller.index)

export default router
