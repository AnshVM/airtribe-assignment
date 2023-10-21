import Router from 'express-promise-router'
import { createInstructor } from './controllers/instructors.js'
import { createCourse } from './controllers/courses.js'
import { courseRegistration, updateLeadStatus } from './controllers/leads.js'

const router = new Router()

router.post('/instructor',createInstructor)

router.post('/course',createCourse)

router.post('/lead',courseRegistration)
router.put('/lead/update',updateLeadStatus)


export default router
