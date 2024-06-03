import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DeleteCategoryRes,
  GetCategoriesReq,
  GetCategoriesRes,
  deleteCategory,
  getCategories,
} from '../../api/categories'
import { AppErrorResponse, Category } from '../../common/types'
import { useEffect, useRef, useState } from 'react'
import { useModal } from '../../hooks'
import { Button, Flex, Modal, Space, Table } from 'antd'
import { categoriesListColumns } from './config'
import { useNotificationContext } from '../../contexts/notification/notificationContext'
import { PlusCircleOutlined } from '@ant-design/icons'
import { CreateCategory } from './CreateCategory'
import { InputSearch } from '../../components/Input'

export const CategoriesList = () => {
  const { activateModal } = useModal()

  const { notification } = useNotificationContext()

  const currentCategoryId = useRef('')
  const queryClient = useQueryClient()

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [query, setQuery] = useState<GetCategoriesReq>({
    limit: 10,
    page: 1,
  })
  const {
    isLoading: isFetchingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    data: categories,
  } = useQuery<GetCategoriesRes, AppErrorResponse>({
    queryKey: ['get-categories', query],
    queryFn: () => getCategories(query),
  })

  const { isPending: isDeleting, mutate: deletCategoryMutate } = useMutation<
    DeleteCategoryRes,
    DeleteCategoryRes,
    string
  >({
    mutationFn: deleteCategory,
    mutationKey: ['delete-category'],
    onSuccess: (response) => {
      notification('success', {
        message: response.data.msg,
        duration: 1,
        onClose: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-categories', query],
          })
        },
      })
    },

    onError: (error) => {
      activateModal('danger', error.data.msg || 'Deleting category failed')
    },
  })

  useEffect(() => {
    if (isCategoriesError)
      activateModal(
        'danger',
        categoriesError.response?.data.error ||
          categoriesError.response?.data.message ||
          'Fetching categories failed'
      )
  }, [isCategoriesError])

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
        <Button
          icon={<PlusCircleOutlined />}
          ghost
          className="h-[3rem]"
          onClick={() => setIsCreateOpen(true)}
        >
          Add Category
        </Button>
      </Flex>
      <Table<Category>
        dataSource={categories?.data.data}
        rowKey={'id'}
        columns={categoriesListColumns(
          deletCategoryMutate,
          isDeleting,
          currentCategoryId.current
        )}
        loading={isFetchingCategories}
        onRow={({ id }) => ({
          onClick: () => {
            currentCategoryId.current = id
          },
        })}
      />
      <Modal
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        destroyOnClose
        title="Create Category"
        maskClosable
        closable={false}
        okText="Submit"
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <CreateCategory onClose={() => setIsCreateOpen(false)} />
      </Modal>
    </>
  )
}
