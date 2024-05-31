import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import { GetRequestsRes } from './types'

export const getPostsRequests = async (): Promise<
  AxiosResponse<GetRequestsRes>
> => {
  const response = axiosInstance.get('/getItems')
  return response
}
