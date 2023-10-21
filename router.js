import Router from 'express-promise-router'
import { createInstructor } from './controllers/instructors.js'
import { createCourse } from './controllers/courses.js'
import { courseRegistration, searchLeads, updateLeadStatus } from './controllers/leads.js'
import { addComment } from './controllers/comments.js'

const router = new Router()

router.post('/instructor',createInstructor)

router.post('/course',createCourse)

router.post('/lead',courseRegistration)
router.put('/lead/update',updateLeadStatus)
router.get('/lead/search',searchLeads)

router.post('/comment',addComment)

export default router
