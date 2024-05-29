import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import {
  DeleteCustomerRes,
  GetCustomerInfoRes,
  GetCustomerReq,
  GetCustomerRequestsRes,
  GetCustomersRes,
} from './types'

export const getCustomers = async (
  reqBody: GetCustomerReq
): Promise<AxiosResponse<GetCustomersRes>> => {
  const response = await axiosInstance.get('/', {
    params: reqBody,
  })
  return response
}

export const deleteCustomer = async (
  id: string
): Promise<AxiosResponse<DeleteCustomerRes>> => {
  const response = await axiosInstance.delete(`/deleteUser/${id}`)

  return response
}

export const getCustomerInfo = async (
  id: string
): Promise<AxiosResponse<GetCustomerInfoRes>> => {
  const response = await axiosInstance.get(
    `/InfoWithNumberOfRequestsPosts/${id}`
  )
  return response
}

export const getCustomerRequests = async (
  id: string
): Promise<AxiosResponse<GetCustomerRequestsRes>> => {
  const response = await axiosInstance.get(`/ListUserRequests/${id}`)
  return response
}
