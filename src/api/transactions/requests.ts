import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import {
  GetTransactionDetailsReq,
  GetAllAcceptedTransactionRes,
  GetTransactionDetailsRes,
} from './types'

export const getAllAcceptedTransaction = async (): Promise<
  AxiosResponse<GetAllAcceptedTransactionRes>
> => {
  const response = await axiosInstance.get(
    '/Admin/listAcceptedExchangeRequests'
  )
  return response
}

export const getTransactionDetails = async (
  reqBody: GetTransactionDetailsReq
): Promise<AxiosResponse<GetTransactionDetailsRes>> => {
  const response = await axiosInstance.get('/Admin/listExchangedItemsDetails', {
    params: reqBody,
  })
  return response
}
