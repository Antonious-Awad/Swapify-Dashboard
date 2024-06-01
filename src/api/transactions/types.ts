import { ExchangeItem, TableTransaction } from '../../common/types'

export type GetAllAcceptedTransactionRes = TableTransaction[]

export type GetTransactionDetailsReq = {
  requestId: string
}

export type GetTransactionDetailsRes = {
  offered_item: ExchangeItem
  requested_item: ExchangeItem
}
