import { AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from './types'
import axiosInstance from '../../utils/axios'

export const login = async (
  loginData: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axiosInstance.post('/Admin/loginAdmin', loginData)
  return response
}
