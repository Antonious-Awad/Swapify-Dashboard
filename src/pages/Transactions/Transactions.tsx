import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllAcceptedTransaction,
  getTransactionDetails,
} from '../../api/transactions/requests'
import { useEffect } from 'react'
import { useModal } from '../../hooks'
import axios from 'axios'
import { Table } from 'antd'
import { TableTransaction } from '../../common/types'
import { TransactionTableColumns } from './config'

export const Transactions = () => {
  const { activateModal } = useModal()

  const {
    data: { data: transactions } = {},
    isError: isFetchingAllTranscationError,
    isPending: isFetchingTransactions,
    error: fetchTransactionsError,
  } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: getAllAcceptedTransaction,
    retry: 2,
  })

  const {
    data,
    isError: isFetchingDetailsError,
    isPending: isFetchingDetails,
    error: fetchDetailsError,
    mutate: fetchTransactionDetails,
  } = useMutation({
    mutationFn: getTransactionDetails,
    mutationKey: ['get-transaction-details'],
  })

  useEffect(() => {
    if (isFetchingAllTranscationError) {
      activateModal(
        'danger',
        axios.isAxiosError(fetchTransactionsError)
          ? fetchTransactionsError.message
          : 'Fetching Transactions Failed'
      )
    }
  }, [isFetchingAllTranscationError])

  return (
    <Table<TableTransaction>
      columns={TransactionTableColumns}
      dataSource={transactions}
      loading={isFetchingTransactions}
      rowKey={'request_id'}
      expandable={{
        expandedRowRender: (record) => <div>{record.request_id}</div>,
        onExpand: (expand, { request_id }) => {
          if (expand) fetchTransactionDetails({ requestId: request_id })
        },
      }}
    />
  )
}
