import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  DeleteCategoryRes,
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

export const CategoriesList = () => {
  const { activateModal } = useModal()

  const { notification } = useNotificationContext()

  const currentCategoryId = useRef('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    isLoading: isFetchingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    data: categories,
  } = useQuery<GetCategoriesRes, AppErrorResponse>({
    queryKey: ['get-categories'],
    queryFn: getCategories,
  })

  const { isPending: isDeleting } = useMutation<
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
            queryKey: ['get-categories'],
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
      <Space size={'middle'} direction="vertical" className="w-full mt-3">
        <Flex justify="end">
          <Button
            icon={<PlusCircleOutlined />}
            ghost
            onClick={() => setIsCreateOpen(true)}
          >
            Create
          </Button>
        </Flex>
        <Table<Category>
          dataSource={categories?.data.data}
          rowKey={'id'}
          columns={categoriesListColumns(
            deleteCategory,
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
      </Space>
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
