import axios from 'axios'

const API_URL = 'http://localhost:8000/admin'

const axiosInstance = axios.create({ baseURL: API_URL })

export default axiosInstance
