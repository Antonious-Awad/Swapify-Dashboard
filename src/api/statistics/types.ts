export type GetTransactionsByDayRes = {
  TotalTransactions: number
  dailyTotals: {
    date: string
    day: string
    total: number
  }[]
}
