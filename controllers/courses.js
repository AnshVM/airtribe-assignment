import * as db from '../db/db.js'
import { FOREIGN_KEY_MISSING_CODE } from '../db/error.js';

const createCourseQuery = `
    INSERT INTO Courses(name, instructor_id, max_seats, start_date)
    VALUES($1,$2,$3,$4) 
    RETURNING id
`

export async function createCourse(req, res) {
    const { name, instructorId, maxSeats, startDate } = req.body;

    try {
        const { id } = await db.one(createCourseQuery, [name, instructorId, maxSeats, startDate])
        res.status(201).json({
            id
        })
    } catch (error) {
        if (error.code === FOREIGN_KEY_MISSING_CODE) {
            res.status(500).json({
                error: 'Invalid instructor'
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }
}
