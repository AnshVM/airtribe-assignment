import { POST, PUT, createCourse, createLead, getLeadById } from "./utils"
import { v4 as uuid } from 'uuid';

test('Lead is successfully created', async () => {
    const [id, _] = await createLead()
    expect(id).toBeDefined()
})

test('Lead status is updated', async () => {
    const [leadId, instructorId] = await createLead();

    const res = await PUT('/api/lead/status', { leadId, instructorId, status: "Accept" })

    expect(res.success).toBe(true)

    const lead = await getLeadById(leadId)

    expect(lead.status).toBe("Accept")
})
