import { Divider, Empty, Table } from 'antd'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import {
  GetCustomerInfoRes,
  GetCustomerRequestsRes,
  getCustomerInfo,
  getCustomerRequests,
} from '../../../api/customer'
import { useModal } from '../../../hooks'
import { AppErrorResponse, CustomerRequest } from '../../../common/types'
import { CustomerCard } from '../../../components/CustomerCard'
import { useNotificationContext } from '../../../contexts/notification/notificationContext'
import { customerRequestsColumns } from './config'
import {
  GetTransactionDetailsReq,
  GetTransactionDetailsRes,
} from '../../../api/transactions/types'
import { getTransactionDetails } from '../../../api/transactions'
import { TransactionDetails } from '../../../components/TransactionDetails'

export const CustomerProfile = () => {
  const { customerId } = useLocation().state
  const { activateModal } = useModal()
  const { notification } = useNotificationContext()

  const [expandedRowDetails, setExpandedRowDetails] = useState<{
    [key: string]: GetTransactionDetailsRes | undefined
  }>({})
  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>({})
  const [errorRows, setErrorRows] = useState<{
    [key: string]: string | undefined
  }>({})

  const {
    isLoading: isFetchingCustomerDetails,
    data: customerDetailsRes,
    isError: isCustomerDetailsError,
    error: customerDetailsError,
  } = useQuery<AxiosResponse<GetCustomerInfoRes>, AxiosError<AppErrorResponse>>(
    {
      queryKey: ['get-customer-info', customerId],
      queryFn: () => getCustomerInfo(customerId),
      retry: 0,
    }
  )
  const customerDetails = customerDetailsRes?.data.data

  const {
    isPending: isFetchingCustomerRequests,
    data: customerRequests,
    isError: isCustomerRequestsError,
    error: customerRequestsError,
  } = useQuery<
    AxiosResponse<GetCustomerRequestsRes>,
    AxiosError<AppErrorResponse>
  >({
    queryKey: ['get-customer-requests', customerId],
    queryFn: () => getCustomerRequests(customerId),
    retry: 0,
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
    if (isCustomerDetailsError) {
      activateModal(
        'danger',
        customerDetailsError.response?.data.message ||
          'Error Fetching Customer Details'
      )
    }
    if (isCustomerRequestsError) {
      notification('error', {
        message:
          customerRequestsError.response?.data.message ||
          'Error Fetching Customer Details',
      })
    }
  }, [
    isCustomerDetailsError,
    customerDetailsError,
    isCustomerRequestsError,
    customerRequestsError,
  ])

  const handleExpand = (expanded: boolean, record: CustomerRequest) => {
    if (expanded) {
      setLoadingRows((prev) => ({ ...prev, [record.requestId]: true }))
      setErrorRows((prev) => ({ ...prev, [record.requestId]: undefined }))
      fetchDetails({ requestId: record.requestId })
    }
  }

  return (
    <>
      <CustomerCard
        isLoading={isFetchingCustomerDetails}
        customerDetails={customerDetails}
      />
      <Divider className="bg-neutral-300" />
      <Table<CustomerRequest>
        loading={isFetchingCustomerRequests}
        dataSource={customerRequests?.data.data}
        columns={customerRequestsColumns(customerDetails?.username || '')}
        rowKey={(request) => request.requestId}
        expandable={{
          expandedRowRender: (record) => {
            const transactionDetails = expandedRowDetails[record.requestId]
            const isLoading = loadingRows[record.requestId]
            const error = errorRows[record.requestId]

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
