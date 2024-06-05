import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import {
  Button,
  Card,
  Col,
  Flex,
  FloatButton,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd'
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { AppErrorResponse, DefaultApiResponse } from '../../common/types'
import {
  GetAdminInfoRes,
  getAdminInfo,
  updateAdminPhoto,
} from '../../api/admin'
import { useModal } from '../../hooks'
import { EditAdminInfo } from './EditAdminInfo'
import { useNotificationContext } from '../../contexts/notification/notificationContext'
import { uploadAdminPhotoHandler } from './config'
import { Avatar } from '../../components/Avatar'

export const AdminProfile = () => {
  const { activateModal } = useModal()
  const { notification } = useNotificationContext()
  const { Title, Text } = Typography

  const [canViewPassword, setCanViewPassword] = useState(false)
  const [isEditInfo, setIsEditInfo] = useState(false)
  const uploaderRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const {
    data: adminInfoRes,
    isLoading: isFetchingAdminInfo,
    isError,
    error,
  } = useQuery<AxiosResponse<GetAdminInfoRes>, AppErrorResponse>({
    queryKey: ['get-admin-info'],
    queryFn: getAdminInfo,
  })

  const { mutate: updatePhoto, isPending: isUploadingPhoto } = useMutation<
    DefaultApiResponse,
    AppErrorResponse,
    FormData
  >({
    mutationFn: updateAdminPhoto,
    mutationKey: ['update-admin-photo'],
    onSuccess: (res) => {
      notification('success', {
        message: res.data.message || 'Admin Photo Successfully updated',
        onClose: () =>
          queryClient.invalidateQueries({ queryKey: ['get-admin-info'] }),
      })
    },
    onError: (err) => {
      activateModal(
        'danger',
        err.response?.data.message || 'Admin Photo failed to upload'
      )
    },
  })

  const adminInfo = adminInfoRes?.data.data

  useEffect(() => {
    if (isError) {
      activateModal(
        'danger',
        error.response?.data.message || 'Error fetching admin info'
      )
    }
  })

  type AdminInfoKeys = Exclude<keyof GetAdminInfoRes['data'], 'image'>
  const personalInfoKeys: AdminInfoKeys[] = ['username', 'phone', 'location']
  const signInMethodKeys: AdminInfoKeys[] = ['email', 'password']

  const adminInfoTitles: Record<AdminInfoKeys, string> = {
    email: 'Email',
    username: 'User Name',
    phone: 'Contact Phone',
    location: 'Location',
    password: 'Password',
  }

  return (
    <>
      <div className="p-4">
        <div className="relative w-min">
          <Avatar size={120} src={adminInfo?.image?.url} className="relative" />
          <div className="absolute bottom-0 right-0">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="bg-brand-100 rounded-full border text-neutral-300 shadow-none"
              loading={isUploadingPhoto}
              onClick={() => uploaderRef.current?.click()}
            />
            <input
              type="file"
              ref={uploaderRef}
              hidden
              onChange={(e) => uploadAdminPhotoHandler(updatePhoto, e)}
              accept=".png, .jpeg, .jpg"
              multiple={false}
            />
          </div>
        </div>
        <Title level={3} className="my-[3rem]">
          Personal Info
        </Title>
        <Row gutter={[40, 20]}>
          {personalInfoKeys.map((field) => {
            return (
              <Col md={12} lg={8} key={field}>
                <Card loading={isFetchingAdminInfo} className="w-[25rem]">
                  <Space size="middle" direction="vertical" className="w-full">
                    <Text className="text-[18px] text-neutral-300">
                      {adminInfoTitles[field]}
                    </Text>
                    <Text className="text-[20px] font-semibold">
                      {field === 'location'
                        ? `${adminInfo?.location.city}, ${adminInfo?.location.governorate}`
                        : adminInfo?.[field]}
                    </Text>
                  </Space>
                </Card>
              </Col>
            )
          })}
        </Row>
        <Title level={3} className="my-[3rem]">
          Sign In Method
        </Title>
        <Row gutter={[40, 20]}>
          {signInMethodKeys.map((field) => {
            if (field === 'location') return
            return (
              <Col md={12} lg={8} key={field}>
                <Card
                  loading={isFetchingAdminInfo}
                  className="w-[25rem]"
                  key={field}
                >
                  <Space size="middle" direction="vertical" className="w-full">
                    <Text className="text-[18px] text-neutral-300">
                      {adminInfoTitles[field]}
                    </Text>
                    <Flex justify="space-between">
                      <Text className="text-[20px] font-semibold px-2">
                        {field === 'password' && !canViewPassword
                          ? '*********'
                          : adminInfo?.[field]}
                      </Text>
                      {field === 'password' && (
                        <Button
                          type="link"
                          onClick={() => setCanViewPassword(!canViewPassword)}
                          className="p-0"
                        >
                          {canViewPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </Button>
                      )}
                    </Flex>
                  </Space>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
      <FloatButton
        icon={<EditOutlined />}
        tooltip="Edit Admin Info"
        onClick={() => setIsEditInfo(true)}
      />
      <Modal
        open={isEditInfo}
        onCancel={() => setIsEditInfo(false)}
        destroyOnClose
        title="Edit Admin Info"
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
        {adminInfo && (
          <EditAdminInfo
            adminInfo={adminInfo}
            onClose={() => setIsEditInfo(false)}
          />
        )}
      </Modal>
    </>
  )
}
