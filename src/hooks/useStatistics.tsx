import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { AppErrorResponse } from '../common/types'
import {
  type GetTransactionsByDayRes,
  getAcceptedItems,
  getAcceptedTransactionsStat,
  getItemCountByCategory,
  getReportCount,
  getStatsItem,
  getStatsUsers,
  getTransactionsByDay,
  type GetReportsCountsRes,
  type GetItemCountByCategoryRes,
  type GetAcceptedTransactionsStatRes,
  type GetStatsItemRes,
  type GetStatsUsersRes,
} from '../api/statistics'
import { useNotificationContext } from '../contexts/notification/notificationContext'
import { useEffect } from 'react'

export const useStatistics = () => {
  const { notification } = useNotificationContext()

  const getTransactionByDayQuery = useQuery<
    AxiosResponse<GetTransactionsByDayRes>,
    AppErrorResponse
  >({
    queryKey: ['get-transaction-per-day'],
    queryFn: getTransactionsByDay,
  })

  const getReportCountQuery = useQuery<
    AxiosResponse<GetReportsCountsRes>,
    AppErrorResponse
  >({
    queryKey: ['get-report-count'],
    queryFn: getReportCount,
  })

  const getItemsByCategoryQuery = useQuery<
    AxiosResponse<GetItemCountByCategoryRes>,
    AppErrorResponse
  >({
    queryKey: ['get-items-by-category'],
    queryFn: getItemCountByCategory,
  })

  const getAcceptedRequestsQuery = useQuery<
    AxiosResponse<GetAcceptedTransactionsStatRes>,
    AppErrorResponse
  >({
    queryKey: ['get-accepted-requests'],
    queryFn: getAcceptedTransactionsStat,
  })

  const getStatsItemsQuery = useQuery<
    AxiosResponse<GetStatsItemRes>,
    AppErrorResponse
  >({
    queryKey: ['get-statistics-items'],
    queryFn: getStatsItem,
  })

  const getStatsUsersQuery = useQuery<
    AxiosResponse<GetStatsUsersRes>,
    AppErrorResponse
  >({
    queryKey: ['get-statistics-users'],
    queryFn: getStatsUsers,
  })

  const getAcceptedItemsQuery = useQuery<
    AxiosResponse<unknown>,
    AppErrorResponse
  >({
    queryKey: ['get-accepted-items'],
    queryFn: getAcceptedItems,
  })

  // const getTodayTransactionsQuery = useQuery<
  //   AxiosResponse<unknown>,
  //   AppErrorResponse
  // >({
  //   queryKey: ['get-today-transactions'],
  //   queryFn: getTodayTransactions,
  // })

  useEffect(() => {
    if (getTransactionByDayQuery.isError)
      notification('error', {
        message:
          getTransactionByDayQuery.error.response?.data.message ||
          'Error Fetching Transactions By Day',
      })

    if (getReportCountQuery.isError)
      notification('error', {
        message:
          getReportCountQuery.error.response?.data.message ||
          'Error Fetching Report Count',
      })

    if (getItemsByCategoryQuery.isError)
      notification('error', {
        message:
          getItemsByCategoryQuery.error.response?.data.message ||
          'Error Fetching Items By Category',
      })

    if (getAcceptedRequestsQuery.isError)
      notification('error', {
        message:
          getAcceptedRequestsQuery.error.response?.data.message ||
          'Error Fetching Accepted Requests',
      })

    if (getStatsItemsQuery.isError)
      notification('error', {
        message:
          getStatsItemsQuery.error.response?.data.message ||
          'Error Fetching Items',
      })

    if (getStatsUsersQuery.isError)
      notification('error', {
        message:
          getStatsUsersQuery.error.response?.data.message ||
          'Error Fetching Customers',
      })

    if (getAcceptedItemsQuery.isError)
      notification('error', {
        message:
          getAcceptedItemsQuery.error.response?.data.message ||
          'Error Fetching Accepted Items',
      })

    // if (getTodayTransactionsQuery.isError)
    //   notification('error', {
    //     message:
    //       getTodayTransactionsQuery.error.response?.data.message ||
    //       "Error Fetching Today's transactions",
    //   })
  }, [
    getTransactionByDayQuery,
    getReportCountQuery,
    getItemsByCategoryQuery,
    getAcceptedRequestsQuery,
    getStatsItemsQuery,
    getStatsUsersQuery,
    getAcceptedItemsQuery,
    // getTodayTransactionsQuery,
  ])
  return {
    getTransactionByDayQuery,
    getReportCountQuery,
    getItemsByCategoryQuery,
    getAcceptedRequestsQuery,
    getStatsItemsQuery,
    getStatsUsersQuery,
    getAcceptedItemsQuery,
    // getTodayTransactionsQuery,
  }
}
