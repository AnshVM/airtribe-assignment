import * as db from '../db/db.js'

// Returns the instructor_id of the course of the lead
const getInstructorByLeadQuery = `
SELECT instructor_id AS course_instructor 
FROM Courses
WHERE id = (
    SELECT course_id FROM Leads
    WHERE id = $1
) 
`

const addCommentQuery = `
INSERT INTO Comments(comment,lead_id,instructor_id)
VALUES($1,$2,$3)
RETURNING id
`

export async function addComment(req, res) {
    try {

        const { comment, instructorId, leadId } = req.body

        const { course_instructor } = await db.one(getInstructorByLeadQuery, [leadId])

        if (!course_instructor) {
            return res.status(500).json({
                error: "Invalid lead id"
            })
        }

        else if (course_instructor !== instructorId) {
            return res.status(401).json({
                error: "Unauthorized instructor"
            })
        }

        const { id } = await db.one(addCommentQuery, [comment, leadId, instructorId])

        res.status(201).json({ id })

    } catch (error) {
        res.status(500).json({ error })
    }

}


export async function getCommentsByLeadId(req, res) {
    try {
        const { id } = req.params

        const comments = await db.query(`SELECT * FROM Comments WHERE lead_id=$1`, [id])

        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error })
    }
}