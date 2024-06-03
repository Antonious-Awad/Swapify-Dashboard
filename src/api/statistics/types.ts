import { TableTransaction, reportRecord } from '../../common/types'

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
