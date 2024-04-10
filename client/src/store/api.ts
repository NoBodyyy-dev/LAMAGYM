import axios from "axios"

const URL: string = 'https://dummyjson.com/'

const api = axios.create({
    baseURL: URL
})

export default api