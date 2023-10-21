import { createCourse, getCourse } from "./utils"
import { GET, POST, PUT } from "./utils"

test('Create course',async() => {
    const id = await createCourse()

    expect(id).toBeDefined()
})

test('Update course', async() => {

    const id = await createCourse()

    await PUT('/api/course',{id,name:"Angular"})

    const updated = await getCourse(id)

    expect(updated.name).toBe("Angular")

})