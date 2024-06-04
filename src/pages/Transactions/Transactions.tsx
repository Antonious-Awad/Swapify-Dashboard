import { AxiosResponse } from 'axios'
import { Empty, Flex, Table } from 'antd'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllAcceptedTransaction,
  getTransactionDetails,
} from '../../api/transactions/requests'
import { useModal } from '../../hooks'
import { AppErrorResponse, TableTransaction } from '../../common/types'
import { transactionTableColumns } from './config'
import {
  GetAllAcceptedTransactionReq,
  GetAllAcceptedTransactionRes,
  GetTransactionDetailsReq,
  GetTransactionDetailsRes,
} from '../../api/transactions/types'
import { TransactionDetails } from '../../components/TransactionDetails'
import { InputSearch } from '../../components/Input'
import { rangeOptions } from '../../common/utils'
import { SelectDropdown } from '../../components/SelectDropdown'

export const Transactions = () => {
  const { activateModal } = useModal()

  const [expandedRowDetails, setExpandedRowDetails] = useState<{
    [key: string]: GetTransactionDetailsRes | undefined
  }>({})
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>({})
  const [errorRows, setErrorRows] = useState<{
    [key: string]: string | undefined
  }>({})
  const [query, setQuery] = useState<GetAllAcceptedTransactionReq>({
    limit: 10,
    page: 1,
  })

  const {
    data: { data: transactions } = {},
    isError: isFetchingAllTransactionError,
    isLoading: isFetchingTransactions,
    error: fetchTransactionsError,
  } = useQuery<AxiosResponse<GetAllAcceptedTransactionRes>, AppErrorResponse>({
    queryKey: ['get-transactions', query],
    queryFn: () => getAllAcceptedTransaction(query),
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
  }, [activateModal, fetchTransactionsError, isFetchingAllTransactionError])

  const handleExpand = (expanded: boolean, record: TableTransaction) => {
    if (expanded) {
      setLoadingRows((prev) => ({ ...prev, [record.request_id]: true }))
      setErrorRows((prev) => ({ ...prev, [record.request_id]: undefined }))
      fetchDetails({ requestId: record.request_id })
    }
  }

  return (
    <>
      <Flex justify="space-between" className="my-5">
        <InputSearch
          placeholder="Search by item..."
          onSearch={(value) =>
            setQuery((prev) => ({
              ...prev,
              search: value || undefined,
            }))
          }
        />
        <SelectDropdown
          options={rangeOptions}
          placeholder="Filter By Date Range"
          onSelect={(value) =>
            setQuery((prev) => ({
              ...prev,
              rangeOption: value,
            }))
          }
          onClear={() =>
            setQuery((prev) => ({
              ...prev,
              rangeOption: undefined,
            }))
          }
        />
      </Flex>
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
    </>
  )
}
