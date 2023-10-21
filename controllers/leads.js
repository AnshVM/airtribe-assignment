import * as db from '../db/db.js'
import { FOREIGN_KEY_MISSING_CODE } from '../db/error.js'


const ACCEPT = "Accept"
const REJECT = "Reject"
const WAITLIST = "Waitlist"

const createLeadQuery = `
INSERT INTO LEADS(course_id, name, email, phone, linkedin, status)
VALUES($1,$2,$3,$4,$5,$6)
RETURNING id
`

export async function courseRegistration(req, res) {
    const { courseId, name, email, phone, linkedin } = req.body;

    try{
        const { id } = await db.one(createLeadQuery, [courseId, name, email, phone, linkedin, WAITLIST])

        res.status(201).json({
            id
        })

    } catch(error) {
        if(error.code === FOREIGN_KEY_MISSING_CODE) {
            res.status(500).json({
                error:'Invalid courseId'
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }

}