import axiosInstance from '../../utils/axios'
import { DeleteCategoryRes, GetCategoriesRes } from './types'

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
