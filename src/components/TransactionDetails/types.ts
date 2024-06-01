import { GetTransactionDetailsRes } from '../../api/transactions/types'
import { ExchangeItem } from '../../common/types'

export type TransactionDetailsProps = {
  transactionDetails: GetTransactionDetailsRes | undefined
  isLoading: boolean
}

export type ItemKeys = keyof ExchangeItem
