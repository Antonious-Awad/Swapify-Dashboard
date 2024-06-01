import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import { GetRequestsRes, UpdateStatusReq } from './types'
import { DefaultApiResponse, Pagination } from '../../common/types'

export const getPostsRequests = async (
  reqBody: Pagination
): Promise<AxiosResponse<GetRequestsRes>> => {
  const response = axiosInstance.get('/getItems', {
    params: reqBody,
  })
  return response
}

export const updateItemStatus = async ({
  itemId,
  status,
}: UpdateStatusReq): Promise<DefaultApiResponse> => {
  const response = axiosInstance.put(`/status/${itemId}`, { status })
  return response
}
