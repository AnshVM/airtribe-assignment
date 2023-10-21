import Router from 'express-promise-router'
import { createInstructor, getInstructorById } from './controllers/instructors.js'
import { createCourse, getCourseById, updateCourse } from './controllers/courses.js'
import { courseRegistration, getLeadById, searchLeads, updateLeadStatus } from './controllers/leads.js'
import { addComment } from './controllers/comments.js'

const router = new Router()

router.post('/instructor',createInstructor)
router.get('/instructor/:id',getInstructorById)

router.post('/course',createCourse)
router.put('/course',updateCourse)
router.get('/course/:id',getCourseById)

router.put('/lead/status',updateLeadStatus)
router.get('/lead/search',searchLeads)
router.post('/lead',courseRegistration)
router.get('/lead/:id',getLeadById)

router.post('/comment',addComment)

export default router
