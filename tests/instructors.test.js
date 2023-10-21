import { POST, GET } from "./utils"

test('Instructor is created', async () => {
    const {id} = await POST('/api/instructor',{name:"Ansh"}) 
    
    expect(id).toBeDefined()

    const { name } = await GET(`/api/instructor/${id}`)

    expect(name).toEqual("Ansh")
})
