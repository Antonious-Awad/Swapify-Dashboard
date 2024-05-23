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
  const response = axiosInstance.get('/listAcceptedExchangeRequests')
  return response
}

export const getTransactionDetails = async (
  reqBody: GetTransactionDetailsReq
): Promise<AxiosResponse<GetTransactionDetailsRes>> => {
  const response = axiosInstance.post('/listExchangedItemsDetails', reqBody)
  return response
}
