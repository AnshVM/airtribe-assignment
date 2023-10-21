import Router from 'express-promise-router'
import { createInstructor } from './controllers/instructors.js'
import { createCourse } from './controllers/courses.js'
import { courseRegistration } from './controllers/leads.js'

const router = new Router()

router.post('/instructor',createInstructor)

router.post('/course',createCourse)

router.post('/register',courseRegistration)

export default router
