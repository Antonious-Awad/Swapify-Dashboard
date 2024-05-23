import axios, { InternalAxiosRequestConfig } from 'axios'
import { checkValidToken, getSessionsToken } from './token'

const API_URL = 'http://localhost:8000/Admin'

const axiosInstance = axios.create({ baseURL: API_URL })

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = checkValidToken() ? getSessionsToken() : ''

  if (token) config.headers.token = token

  return config
})

export default axiosInstance
