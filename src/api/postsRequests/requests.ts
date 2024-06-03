import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import type { GetRequestsReq, GetRequestsRes, UpdateStatusReq } from './types'
import type { DefaultApiResponse } from '../../common/types'

export const getPostsRequests = async (
  reqBody: GetRequestsReq
): Promise<AxiosResponse<GetRequestsRes>> => {
  const response = axiosInstance.get('/Admin/getItems', {
    params: reqBody,
  })
  return response
}

export const updateItemStatus = async ({
  itemId,
  status,
}: UpdateStatusReq): Promise<DefaultApiResponse> => {
  const response = axiosInstance.put(`/Admin/status/${itemId}`, { status })
  return response
}
