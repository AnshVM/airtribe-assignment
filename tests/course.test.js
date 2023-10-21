import { GET, POST, PUT } from "./utils"

test('Create course',async() => {

    const instructor = await POST('/api/instructor',{name: "Ansh"})
    
    const course = {
        name:"React",
        maxSeats: 30,
        instructorId: instructor.id,
        startDate: (new Date()).toJSON()
    }

    const { id } = await POST('/api/course',course)

    expect(id).toBeDefined()
})


test('Update course', async() => {
    const instructor = await POST('/api/instructor',{name: "Ansh"})
    
    const course = {
        name:"React",
        maxSeats: 30,
        instructorId: instructor.id,
        startDate: (new Date()).toJSON()
    }

    const { id } = await POST('/api/course',course)

    await PUT('/api/course',{id,name:"Angular"})

    const updated = await GET(`/api/course/${id}`)

    expect(updated.name).toBe("Angular")

})