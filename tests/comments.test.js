import { POST, createLead } from "./utils"

test('Create comments', async () => {
    const [leadId, instructorId] = await createLead()

    const { id } =  await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})

    expect(id).toBeDefined()
})