import * as db from '../db/db.js'

export async function createInstructor(req, res) {
    const { name } = req.body

    const createInstructorQuery = `
    INSERT INTO Instructors(name)
    VALUES($1) 
    RETURNING id
    `

    try {
        const { id } = await db.one(createInstructorQuery,[name])
        res.status(201).json({
            id
        })
    } catch(err) {
        res.send(500).json({
            error:err
        })
    }

}
