import { query } from "../db.js"

export async function createInstructor(req, res) {
    const { name } = req.body

    const createInstructorQuery = `
    INSERT INTO Instructors(name)
    VALUES($1) 
    RETURNING id
    `

    try {
        const { id } = (await query(createInstructorQuery,[name])).rows[0]
        res.status(200).json({
            success:true,
            id
        })
    } catch(err) {
        res.send(400).json({
            success:false,
            error:err
        })
    }

}
