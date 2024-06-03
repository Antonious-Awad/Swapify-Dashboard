import {
  AcceptedItem,
  TableTransaction,
  reportRecord,
} from '../../common/types'
import { GetCustomersRes } from '../customer'
import { GetRequestsRes } from '../postsRequests'

export type GetTransactionsByDayRes = {
  TotalTransactions: number
  dailyTotals: {
    date: string
    day: string
    total: number
  }[]
}

export type GetReportsCountsRes = {
  total: {
    posts: number
    customers: number
    transactions: number
  }
  daily: {
    posts: reportRecord[]
    customers: reportRecord[]
    transactions: reportRecord[]
  }
}

export type GetItemCountByCategoryRes = {
  category: string
  count: number
}[]

export type GetAcceptedTransactionsStatRes = TableTransaction[]

export type GetStatsItemRes = Omit<GetRequestsRes, 'page'>

export type GetStatsUsersRes = Pick<GetCustomersRes, 'data'> & {
  TotalUsers: GetCustomersRes['totalUsers']
}

export type GetAcceptedItemsRes = {
  TotalItems: number
  data: AcceptedItem[]
}
