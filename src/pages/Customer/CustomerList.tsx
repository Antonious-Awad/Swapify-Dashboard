import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCustomer, getCustomers } from '../../api/customer/requests'
import { useModal } from '../../hooks'
import { useEffect, useRef, useState } from 'react'
import {
  GetCustomerReq,
  GetCustomersRes,
  DeleteCustomerRes,
} from '../../api/customer'
import { AppErrorResponse, Customer } from '../../common/types'
import { AxiosResponse } from 'axios'
import { Table } from 'antd'
import { customerListColumns } from './config'
import { useNotificationContext } from '../../contexts/notification/notificationContext'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'

export const CustomerList = () => {
  const { activateModal } = useModal()
  const { notification } = useNotificationContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const currentId = useRef('')

  const [query, setQuery] = useState<Required<GetCustomerReq['query']>>({
    limit: 10,
    page: 1,
  })
  const {
    data: customerResponse,
    isError: isFetchingCustomerErr,
    isPending: isFetchingCustomers,
    error: customerListError,
  } = useQuery<AxiosResponse<GetCustomersRes>, AppErrorResponse>({
    queryKey: ['get-customers', query.limit, query.page],
    queryFn: () =>
      getCustomers({
        query,
      }),
  })
  const customerList = customerResponse?.data.data

  const { mutate: deleteCustomerMutate, isPending: isDeleting } = useMutation<
    AxiosResponse<DeleteCustomerRes>,
    DeleteCustomerRes,
    string
  >({
    mutationKey: [`delete-customer-${currentId.current}`],
    mutationFn: deleteCustomer,
    onError: (err) =>
      activateModal('danger', err.msg || 'Deleting customer failed'),
    onSuccess: (response) => {
      notification('success', {
        message: response.data.msg,
        duration: 1,
        onClose: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-customers', query.limit, query.page],
          })
        },
      })
    },
  })

  useEffect(() => {
    if (isFetchingCustomerErr) {
      activateModal(
        'danger',
        customerListError.response?.data.message ||
          customerListError.response?.data.error ||
          'Fetching customers failed'
      )
    }
  }, [isFetchingCustomerErr, customerListError])

  const handleEyeClick = (customerId: string) =>
    navigate(APP_PATHS.customerProfile, {
      state: { customerId },
    })

  return (
    <Table<Customer>
      loading={isFetchingCustomers}
      dataSource={customerList}
      columns={customerListColumns({
        onDelete: deleteCustomerMutate,
        isDeleting,
        currentId: currentId.current,
        onEyeClick: handleEyeClick,
      })}
      rowKey={({ _id }) => _id}
      onRow={({ _id }) => ({
        onClick: () => {
          currentId.current = _id
        },
      })}
      pagination={{
        total: customerResponse?.data.totalUsers,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setQuery({
            page,
            limit: pageSize,
          })
        },
      }}
    />
  )
}
