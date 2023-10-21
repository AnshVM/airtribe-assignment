import * as db from '../db/db.js'

const createInstructorQuery = `
    INSERT INTO Instructors(name)
    VALUES($1) 
    RETURNING id
`

export async function createInstructor(req, res) {
    const { name } = req.body

    try {
        const { id } = await db.one(createInstructorQuery, [name])
        return res.status(201).json({
            id
        })
    } catch (err) {
        return res.status(500).json({
            error: err
        })
    }

}
