import axios from "axios";

const url = 'http://localhost:8000'

const route = (path) => `${url}${path}`

export const POST = async (path,body) => {
    const res = await axios.post(route(path),body);
    return res.data
}
export const GET = async (path) => {
    const res = await axios.get(route(path));
    return res.data
}