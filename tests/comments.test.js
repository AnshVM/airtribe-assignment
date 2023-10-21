import { POST, createLead, GET } from "./utils"

test('Create comments', async () => {
    const [leadId, instructorId] = await createLead()

    const { id } =  await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})

    expect(id).toBeDefined()
})

test('Get comments on lead', async() => {

    const [leadId, instructorId] = await createLead()
    await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})
    await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})
    await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})
    await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})
    await POST('/api/comment',{comment:"Skill issue",leadId,instructorId})

    const comments = await(GET(`/api/lead/comments/${leadId}`))

    expect(comments.length).toBe(5)

})