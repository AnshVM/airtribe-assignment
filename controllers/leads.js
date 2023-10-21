import * as db from '../db/db.js'
import { FOREIGN_KEY_MISSING_CODE } from '../db/error.js'

const WAITLIST = "Waitlist"

const createLeadQuery = `
INSERT INTO LEADS(course_id, name, email, phone, linkedin, status)
VALUES($1,$2,$3,$4,$5,$6)
RETURNING id
`

export async function courseRegistration(req, res) {
    const { courseId, name, email, phone, linkedin } = req.body;
    try {
        const { id } = await db.one(createLeadQuery, [courseId, name, email, phone, linkedin, WAITLIST])

        res.status(201).json({
            id
        })

    } catch (error) {
        if (error.code === FOREIGN_KEY_MISSING_CODE) {
            res.status(500).json({
                error: 'Invalid courseId'
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }

}

const updateLeadStatusQuery = `
UPDATE Leads
SET status = $1
WHERE id = $2
`
const getInstructorByLeadQuery = `
SELECT instructor_id AS course_instructor 
FROM Courses
WHERE id = (
    SELECT course_id FROM Leads
    WHERE id = $1
) 
`
export async function updateLeadStatus(req, res) {
    const { instructorId, leadId, status } = req.body

    try {
        // using camel case here because pg does only lowercase with aliases :(
        const { course_instructor } = await db.one(getInstructorByLeadQuery, [leadId])

        if (!course_instructor) {
            res.status(400).json({
                error: "Invalid lead_id"
            })
        }

        if (course_instructor !== instructorId) {
            return res.status(401).json({
                error: "Instructor is not authorized"
            })
        }

        await db.query(updateLeadStatusQuery, [status, leadId])
        res.status(201).json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}



async function searchLeadsByField(field, value, instructorId) {
    const query = `
        SELECT * FROM Leads
        WHERE course_id IN (
            SELECT id FROM Courses
            WHERE instructor_id = $1
        ) AND
        ${field} LIKE $2
    `
    return (await db.query(query, [instructorId, value]))
}

export async function searchLeads(req, res) {
    const { name, email } = req.query
    const { instructorId } = req.body

    try {
        let results = []

        if (name) {
            results = await searchLeadsByField("name", name, instructorId)
        }
        else if (email) {
            results = await searchLeadsByField("email", email, instructorId)
        }
        
        else {
            return res.status(400).json({
                error:"Missing search field"
            })
        }

        return res.status(200).json(results)

    } catch (error) {
        return res.status(500).json({error})
    }

}

