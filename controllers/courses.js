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

// generates a query which looks like
// UPDATE COURSES
// SET (field1,field2,field3) = ROW($2,$3,$4)
// WHERE id=$1

const updateCourseQuery = (fields) => `
UPDATE Courses 
SET (${fields.join(',')}) = ROW(${fields.map((_, index) => `$${index + 2}`).join(',')})
WHERE id=$1
`
const filterUndefinedKeys = (obj) => {
    return Object.keys(obj).filter((key) => {
        return obj[key] !== undefined
    })
}

const filterUndefinedValues = (obj) => {
    return Object.values(obj).filter((value) => {
        return value !== undefined
    })
}

export async function updateCourse(req, res) {
    try {
        const { id, name, max_seats, start_date } = req.body;

        const definedFields = filterUndefinedKeys({ name, max_seats, start_date })
        const definedValues = filterUndefinedValues({ name, max_seats, start_date })

        if (definedValues.length === 0) {
            res.status(400).json({
                error: "No field to update"
            })
        }

        const query = updateCourseQuery(definedFields)

        await db.query(query, [id, ...definedValues])

        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const getCourseByIdQuery = `
SELECT * FROM Course
WHERE id=$1
`

export async function getCourseById(req, res) {
    try{
        const { id } = req.params

        const course = await db.one(getCourseByIdQuery,[id])

        res.status(200).json({course})

    } catch(error) {
        res.status(404).json({error:"Course does not exist"})
    }
}
