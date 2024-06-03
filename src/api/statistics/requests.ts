import type { AxiosResponse } from 'axios'
import axiosInstance from '../../utils/axios'
import type {
  GetAcceptedTransactionsStatRes,
  GetItemCountByCategoryRes,
  GetReportsCountsRes,
  GetStatsItemRes,
  GetStatsUsersRes,
  GetTransactionsByDayRes,
  GetAcceptedItemsRes,
} from './types'

export const getTransactionsByDay = async (): Promise<
  AxiosResponse<GetTransactionsByDayRes>
> => {
  const response = axiosInstance.get('/Stat/totalTransactionsByDay')
  return response
}

export const getReportCount = async (): Promise<
  AxiosResponse<GetReportsCountsRes>
> => {
  const response = axiosInstance.get('/Stat/reportCount')
  return response
}

export const getItemCountByCategory = async (): Promise<
  AxiosResponse<GetItemCountByCategoryRes>
> => {
  const response = axiosInstance.get('/Stat/itemsCountByCategory')
  return response
}

export const getAcceptedTransactionsStat = async (): Promise<
  AxiosResponse<GetAcceptedTransactionsStatRes>
> => {
  const response = axiosInstance.get('/Stat/listAcceptedExchangeRequests')
  return response
}

export const getStatsItem = async (): Promise<
  AxiosResponse<GetStatsItemRes>
> => {
  const response = axiosInstance.get('/Stat/getItems')
  return response
}

export const getStatsUsers = async (): Promise<
  AxiosResponse<GetStatsUsersRes>
> => {
  const response = axiosInstance.get('/Stat/getUsers')
  return response
}

export const getAcceptedItems = async (): Promise<
  AxiosResponse<GetAcceptedItemsRes>
> => {
  const response = axiosInstance.get('/Stat/getacceptedItems')
  return response
}

export const getTodayTransactions = async (): Promise<
  AxiosResponse<unknown>
> => {
  const response = axiosInstance.get('/Stat//getTodayTransactionsData')
  return response
}
