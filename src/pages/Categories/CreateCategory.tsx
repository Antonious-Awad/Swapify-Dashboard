import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Flex,
  Form,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import { CategoryForm } from './types'
import { Input } from '../../components/Input'
import { normalizeUploadFile } from './config'
import { createCategory } from '../../api/categories'
import { useNotificationContext } from '../../contexts/notification/notificationContext'
import {
  AppErrorResponse,
  BaseModalProps,
  DefaultApiResponse,
} from '../../common/types'
import { useModal } from '../../hooks'

export const CreateCategory = ({ onClose }: BaseModalProps) => {
  const [form] = Form.useForm<CategoryForm>()

  const { notification } = useNotificationContext()
  const { activateModal } = useModal()
  const queryClient = useQueryClient()

  // Used to override antd forcing of a request
  const dummyRequest: UploadProps['customRequest'] = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess?.('ok')
    }, 0)
  }

  const { isPending, mutate: createCategoryMutate } = useMutation<
    DefaultApiResponse,
    AppErrorResponse,
    FormData
  >({
    mutationFn: createCategory,
    mutationKey: ['create-category'],
    onSuccess: (res) => {
      notification('success', {
        message: res.data.message || 'Creating Category Succeeded',
        onClose: () => onClose(),
      })
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
    },
    onError: (err) => {
      activateModal(
        'danger',
        err.response?.data.message || 'Error creating category'
      )
    },
  })

  const handleSubmit = (values: CategoryForm) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('image', values.image[0].originFileObj as File)
    createCategoryMutate(formData)
  }

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Flex align="start" vertical gap="0.5rem">
        <Typography.Text className="font-semibold">Image</Typography.Text>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const image = getFieldValue('image')
            return (
              <Form.Item
                name="image"
                messageVariables={{ label: 'Image' }}
                valuePropName="fileList"
                normalize={normalizeUploadFile}
                rules={[{ required: true }]}
              >
                <Upload
                  action="none"
                  listType="picture-card"
                  className="cursor-pointer"
                  multiple={false}
                  accept=".png, .jpg, .jpeg"
                  disabled={!!image?.length}
                  showUploadList={{
                    showDownloadIcon: false,
                    showPreviewIcon: false,
                  }}
                  customRequest={dummyRequest}
                >
                  <button
                    className="w-full border-0 bg-transparent cursor-pointer"
                    type="button"
                  >
                    <PlusOutlined />
                    <div className="mt-2">Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            )
          }}
        </Form.Item>
      </Flex>
      <Form.Item
        name="name"
        messageVariables={{ label: 'Name' }}
        rules={[{ required: true }]}
      >
        <Input name="name" title="Name" required />
      </Form.Item>
      <Flex justify="end">
        <Space size="middle">
          <Button type="default" onClick={onClose}>
            Cancel
          </Button>
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Flex>
    </Form>
  )
}
