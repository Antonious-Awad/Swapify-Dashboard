import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import { GetAdminInfoRes } from './types'

export const getAdminInfo = async (): Promise<
  AxiosResponse<GetAdminInfoRes>
> => {
  const response = await axiosInstance.get('/adminInfo')
  return response
}
