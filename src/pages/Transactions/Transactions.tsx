import { useQuery } from '@tanstack/react-query'
import { getAllAcceptedTransaction } from '../../api/transactions/requests'
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
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: getAllAcceptedTransaction,
    retry: 2,
  })

  useEffect(() => {
    if (isError) {
      activateModal(
        'danger',
        axios.isAxiosError(error)
          ? error.message
          : 'Fetching Transactions Failed'
      )
    }
  })

  return (
    <Table<TableTransaction>
      columns={TransactionTableColumns}
      dataSource={transactions}
      loading={isPending}
    />
  )
}
