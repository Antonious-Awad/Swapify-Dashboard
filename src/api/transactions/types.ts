import { ExchangeItem, TableTransaction } from '../../common/types'

export type GetAllAcceptedTransactionRes = {
  data: TableTransaction[]
  TotalAcceptedRequests: number
  page: number
}

export type GetTransactionDetailsReq = {
  requestId: string
}

export type GetTransactionDetailsRes = {
  offered_item: ExchangeItem
  requested_item: ExchangeItem
}
