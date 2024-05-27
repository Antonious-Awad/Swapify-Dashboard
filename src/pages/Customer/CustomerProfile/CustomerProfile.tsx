import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import {
  GetCustomerInfoRes,
  GetCustomerRequestsRes,
  getCustomerInfo,
  getCustomerRequests,
} from '../../../api/customer'
import { AxiosError, AxiosResponse } from 'axios'
import { useModal } from '../../../hooks'
import { useEffect } from 'react'
import { AppErrorResponse, CustomerRequest } from '../../../common/types'
import { CustomerCard } from '../../../components/CustomerCard/CustomerCard'
import { Divider, Table } from 'antd'
import { useNotificationContext } from '../../../contexts/notification/notificationContext'
import { customerRequestsColumns } from './config'

export const CustomerProfile = () => {
  const { customerId } = useLocation().state
  const { activateModal } = useModal()
  const { notification } = useNotificationContext()

  const {
    isPending: isFetchingCustomerDetails,
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
      />
    </>
  )
}
