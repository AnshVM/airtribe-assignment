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

const getInstructorQuery = `
SELECT name FROM Instructors
WHERE id=$1
`

export async function getInstructorById(req, res) {
    try {
        const { id } = req.params;
        const { name } = await db.one(getInstructorQuery, [id])
        return res.status(200).json({
            name
        })
    } catch (error) {
        return res.status(400).json({
            error: "Instructor does not exist"
        })
    }

}