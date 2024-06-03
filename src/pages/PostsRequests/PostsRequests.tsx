import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useModal } from '../../hooks'
import {
  GetRequestsReq,
  GetRequestsRes,
  UpdateStatusReq,
  getPostsRequests,
  updateItemStatus,
} from '../../api/postsRequests'
import { AxiosResponse } from 'axios'
import {
  AppErrorResponse,
  DefaultApiResponse,
  PostRequestItem,
} from '../../common/types'
import { Flex, Table } from 'antd'
import { itemsListColumns } from './config'
import { useEffect, useRef, useState } from 'react'
import { useNotificationContext } from '../../contexts/notification/notificationContext'
import { InputSearch } from '../../components/Input/InputSearch'
import { SelectDropdown } from '../../components/SelectDropdown'
import { rangeOptions } from '../../common/utils'

export const PostsRequests = () => {
  const { activateModal } = useModal()
  const { notification } = useNotificationContext()
  const queryClient = useQueryClient()

  const [query, setQuery] = useState<GetRequestsReq>({
    limit: 10,
    page: 1,
  })
  const currentId = useRef('')

  const {
    data: itemsRes,
    isLoading: isFetchingItems,
    isError,
    error,
  } = useQuery<AxiosResponse<GetRequestsRes>, AppErrorResponse>({
    queryKey: [
      'get-posts-requests',
      query.limit,
      query.page,
      query.search,
      query.rangeOption,
    ],
    queryFn: () => getPostsRequests(query),
  })

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation<
    DefaultApiResponse,
    AppErrorResponse,
    UpdateStatusReq
  >({
    mutationFn: updateItemStatus,
    mutationKey: ['update-item-status'],
    onSuccess: (res) =>
      notification('success', {
        message: res.data.message || 'Status Successfully updated',
        onClose: () =>
          queryClient.invalidateQueries({
            queryKey: [
              'get-posts-requests',
              query.limit,
              query.page,
              query.search,
              query.rangeOption,
            ],
          }),
      }),
    onError: (err) => {
      activateModal(
        'danger',
        err.response?.data.message || 'Error updating status'
      )
    },
  })

  useEffect(() => {
    if (isError)
      activateModal(
        'danger',
        error.response?.data.message || 'Error fetching items'
      )
  }, [isError, error])

  const handleUpdate = (id: string, status: PostRequestItem['status']) => {
    updateStatus({ itemId: id, status })
  }

  const items = itemsRes?.data.data
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
      <Table<PostRequestItem>
        loading={isFetchingItems}
        dataSource={items}
        columns={itemsListColumns(
          handleUpdate,
          isUpdatingStatus,
          currentId.current
        )}
        rowKey={({ _id }) => _id}
        onRow={({ _id }) => ({
          onClick: () => {
            currentId.current = _id
          },
        })}
        pagination={{
          total: itemsRes?.data.TotalItems,
          current: query.page,
          pageSize: query.limit,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setQuery((prev) => ({
              ...prev,
              page,
              limit: pageSize,
            }))
          },
        }}
      />
    </>
  )
}
