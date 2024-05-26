import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllAcceptedTransaction,
  getTransactionDetails,
} from '../../api/transactions/requests'
import { useModal } from '../../hooks'
import { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { AppErrorResponse, TableTransaction } from '../../common/types'
import { TransactionTableColumns } from './config'
import {
  GetAllAcceptedTransactionRes,
  GetTransactionDetailsReq,
  GetTransactionDetailsRes,
} from '../../api/transactions/types'
import { useEffect } from 'react'

export const Transactions = () => {
  const { activateModal } = useModal()

  const {
    data: { data: transactions } = {},
    isError: isFetchingAllTranscationError,
    isPending: isFetchingTransactions,
    error: fetchTransactionsError,
  } = useQuery<AxiosResponse<GetAllAcceptedTransactionRes>, AppErrorResponse>({
    queryKey: ['get-transactions'],
    queryFn: getAllAcceptedTransaction,
    retry: 2,
  })

  //TODO: Finalize the expand UI and logic
  const { isPending: isFetchingDetails, mutate: fetchTransactionDetails } =
    useMutation<
      AxiosResponse<GetTransactionDetailsRes>,
      AppErrorResponse,
      GetTransactionDetailsReq
    >({
      mutationFn: getTransactionDetails,
      mutationKey: ['get-transaction-details'],
      onError: (err) =>
        activateModal(
          'danger',
          err.response?.data.error ||
            err.response?.data.message ||
            'Fetching Transactions Failed'
        ),
    })

  useEffect(() => {
    if (isFetchingAllTranscationError) {
      activateModal(
        'danger',
        fetchTransactionsError.response?.data.error ||
          fetchTransactionsError?.response?.data.message ||
          'Fetching Transactions Failed'
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
