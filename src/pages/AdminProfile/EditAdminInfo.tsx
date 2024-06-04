import { Button, Flex, Form, Space } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminInfoForm, EditAdminInfoProps } from './types'
import { Input } from '../../components/Input'
import { updateAdminInfo } from '../../api/admin'
import { validateEnglishNumber } from './config'
import { useNotificationContext } from '../../contexts/notification/notificationContext'

export const EditAdminInfo = ({ adminInfo, onClose }: EditAdminInfoProps) => {
  const [form] = Form.useForm<AdminInfoForm>()
  const { notification } = useNotificationContext()
  const queryClient = useQueryClient()
  const { location } = adminInfo

  const formInitialValues: AdminInfoForm = {
    ...adminInfo,
    governorate: location.governorate,
    city: location.city,
  }

  const { isPending, mutate: updateInfo } = useMutation({
    mutationFn: updateAdminInfo,
    mutationKey: ['update-admin-info'],
    onSuccess: () => {
      notification('success', {
        message: 'Admin Info successfully updated',
        onClose: () => onClose(),
      })
      queryClient.invalidateQueries({ queryKey: ['get-admin-info'] })
    },
  })

  const handleSubmit = (values: AdminInfoForm) => {
    updateInfo(values)
  }
  return (
    <Form form={form} onFinish={handleSubmit} initialValues={formInitialValues}>
      <Form.Item name="username" messageVariables={{ label: 'Name' }}>
        <Input name="username" title="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        messageVariables={{ label: 'Email' }}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input name="email" title="Email" type="email" />
      </Form.Item>
      <Form.Item
        name="phone"
        messageVariables={{ label: 'Contact Phone' }}
        rules={[validateEnglishNumber]}
      >
        <Input name="phone" title="Contact Phone" />
      </Form.Item>
      <Form.Item name="city" messageVariables={{ label: 'City' }}>
        <Input name="city" title="City" />
      </Form.Item>
      <Form.Item name="governorate" messageVariables={{ label: 'Governorate' }}>
        <Input name="governorate" title="Governorate" />
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
