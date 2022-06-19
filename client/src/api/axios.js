import axios from "axios";
const BASE_URL = 'http://localhost:4000'
const PROD_URL = 'https://bookeater-site.herokuapp.com'

export default axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL
    // baseURL: PROD_URL
})