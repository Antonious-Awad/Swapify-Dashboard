import {
  ExchangeItem,
  Filters,
  Pagination,
  TableTransaction,
} from '../../common/types'

export type GetAllAcceptedTransactionReq = Pagination & Filters

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
