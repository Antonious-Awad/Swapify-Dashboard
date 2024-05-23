import axios from 'axios'

const API_URL = 'http://localhost:8000/Admin'

const axiosInstance = axios.create({ baseURL: API_URL })

export default axiosInstance
