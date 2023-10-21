import Router from 'express-promise-router'
import { createInstructor } from './controllers/instructors.js'

const router = new Router()

router.post('/instructor',createInstructor)

export default router
