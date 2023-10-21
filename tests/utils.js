import axios from "axios"
import { v4 as uuid } from 'uuid'

const url = 'http://localhost:8000'

const route = (path) => `${url}${path}`

export const POST = async (path, body) => {
    const res = await axios.post(route(path), body);
    return res.data
}

export const GET = async (path) => {
    const res = await axios.get(route(path));
    return res.data
}

export const PUT = async (path, body) => {
    const res = await axios.put(route(path), body);
    return res.data
}

export const createCourse = async () => {
    const instructor = await POST('/api/instructor', { name: "Ansh" })

    const course = {
        name: "React",
        maxSeats: 30,
        instructorId: instructor.id,
        startDate: (new Date()).toJSON()
    }

    const { id } = await POST('/api/course', course)

    return id
}

export const getCourse = async (id) => {
    return (await GET(`/api/course/${id}`))
}

export const createLead = async () => {

    const instructor = await POST('/api/instructor', { name: "Ansh" })

    let course = {
        name: "React",
        maxSeats: 30,
        instructorId: instructor.id,
        startDate: (new Date()).toJSON()
    }

    course = await POST('/api/course', course)

    const lead = {
        name: "Ansh",
        // using uuid because these are constrained to be unique
        email: uuid(),
        phone: uuid(),
        linkedin: uuid(),
        courseId: course.id
    }

    const { id } = await POST('/api/lead',lead)
    return [id,instructor.id]

}

export const getLeadById = async(id) => {
    const lead = await GET(`/api/lead/${id}`)
    return lead
}
