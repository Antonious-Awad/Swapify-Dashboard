import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import { DeleteCustomerRes, GetCustomerReq, GetCustomersRes } from './types'

export const getCustomers = async (
  reqBody: GetCustomerReq
): Promise<AxiosResponse<GetCustomersRes>> => {
  const response = await axiosInstance.post('/', reqBody)
  return response
}

export const deleteCustomer = async (
  id: string
): Promise<AxiosResponse<DeleteCustomerRes>> => {
  const response = await axiosInstance.delete(`/deleteUser/${id}`)

  return response
}
