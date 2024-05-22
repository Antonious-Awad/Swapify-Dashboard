import { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import { GetAllAcceptedTransactionRes } from './types'

export const getAllAcceptedTransaction = async (): Promise<
  AxiosResponse<GetAllAcceptedTransactionRes>
> => {
  const response = axiosInstance.get('/listAcceptedExchangeRequests')
  return response
}
