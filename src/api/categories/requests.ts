import axiosInstance from '../../utils/axios'
import { DeleteCategoryRes, GetCategoriesRes } from './types'
import { DefaultApiResponse } from '../../common/types'

export const getCategories = async (): Promise<GetCategoriesRes> => {
  const request = await axiosInstance.get('/listCategoriesWithItemsCount')
  return request
}

export const deleteCategory = async (
  id: string
): Promise<DeleteCategoryRes> => {
  const request = await axiosInstance.delete(`/deleteCategory/${id}`)
  return request
}

export const createCategory = async (
  reqBody: FormData
): Promise<DefaultApiResponse> => {
  const request = await axiosInstance.post('/createCategory', reqBody, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return request
}
