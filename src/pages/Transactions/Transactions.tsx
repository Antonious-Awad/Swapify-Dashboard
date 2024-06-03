import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllAcceptedTransaction,
  getTransactionDetails,
} from '../../api/transactions/requests'
import { useModal } from '../../hooks'
import { AxiosResponse } from 'axios'
import { Empty, Table } from 'antd'
import { AppErrorResponse, TableTransaction } from '../../common/types'
import { transactionTableColumns } from './config'
import {
  GetAllAcceptedTransactionRes,
  GetTransactionDetailsReq,
  GetTransactionDetailsRes,
} from '../../api/transactions/types'
import { TransactionDetails } from '../../components/TransactionDetails'

export const Transactions = () => {
  const { activateModal } = useModal()

  const [expandedRowDetails, setExpandedRowDetails] = useState<{
    [key: string]: GetTransactionDetailsRes | undefined
  }>({})
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>({})
  const [errorRows, setErrorRows] = useState<{
    [key: string]: string | undefined
  }>({})

  const {
    data: { data: transactions } = {},
    isError: isFetchingAllTransactionError,
    isLoading: isFetchingTransactions,
    error: fetchTransactionsError,
  } = useQuery<AxiosResponse<GetAllAcceptedTransactionRes>, AppErrorResponse>({
    queryKey: ['get-transactions'],
    queryFn: getAllAcceptedTransaction,
    retry: 2,
  })

  const { mutate: fetchDetails } = useMutation<
    AxiosResponse<GetTransactionDetailsRes>,
    AppErrorResponse,
    GetTransactionDetailsReq
  >({
    mutationFn: getTransactionDetails,
    onSuccess: (data, variables) => {
      setExpandedRowDetails((prev) => ({
        ...prev,
        [variables.requestId]: data.data,
      }))
      setLoadingRows((prev) => ({ ...prev, [variables.requestId]: false }))
    },
    onError: (error, variables) => {
      setErrorRows((prev) => ({
        ...prev,
        [variables.requestId]:
          error.response?.data.error || 'Error fetching details',
      }))
      setLoadingRows((prev) => ({ ...prev, [variables.requestId]: false }))
    },
  })

  useEffect(() => {
    if (isFetchingAllTransactionError) {
      activateModal(
        'danger',
        fetchTransactionsError.response?.data.error ||
          fetchTransactionsError?.response?.data.message ||
          'Fetching Transactions Failed'
      )
    }
  }, [isFetchingAllTransactionError])

  const handleExpand = (expanded: boolean, record: TableTransaction) => {
    if (expanded) {
      setLoadingRows((prev) => ({ ...prev, [record.request_id]: true }))
      setErrorRows((prev) => ({ ...prev, [record.request_id]: undefined }))
      fetchDetails({ requestId: record.request_id })
    }
  }

  return (
    <Table<TableTransaction>
      columns={transactionTableColumns}
      dataSource={transactions?.data}
      loading={isFetchingTransactions}
      rowKey={({ request_id: _id }) => _id}
      expandable={{
        expandedRowRender: (record) => {
          const transactionDetails = expandedRowDetails[record.request_id]
          const isLoading = loadingRows[record.request_id]
          const error = errorRows[record.request_id]

          if (error) {
            return <Empty description={error} />
          }

          return (
            <TransactionDetails
              transactionDetails={transactionDetails}
              isLoading={isLoading}
            />
          )
        },
        onExpand: handleExpand,
      }}
    />
  )
}
