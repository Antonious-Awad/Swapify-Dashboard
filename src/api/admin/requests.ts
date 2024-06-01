import type { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import type { GetAdminInfoRes } from './types'
import type { DefaultApiResponse } from '../../common/types'
import type { AdminInfoForm } from '../../pages/AdminProfile/types'

export const getAdminInfo = async (): Promise<
  AxiosResponse<GetAdminInfoRes>
> => {
  const response = await axiosInstance.get('/adminInfo')
  return response
}

export const updateAdminInfo = async (
  reqbody: AdminInfoForm
): Promise<DefaultApiResponse> => {
  const response = await axiosInstance.put('/updateAdminInfo', reqbody)
  return response
}

export const updateAdminPhoto = async (
  reqBody: FormData
): Promise<DefaultApiResponse> => {
  const response = await axiosInstance.post('/UploadAdminPhoto', reqBody)
  return response
}
