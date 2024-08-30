import axios from "axios"

const URL: string = 'http://localhost:3000/api/'

const api = axios.create({
    withCredentials: true,
    baseURL: URL
})

export default api