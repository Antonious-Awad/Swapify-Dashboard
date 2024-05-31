import { useQuery } from '@tanstack/react-query'
import { useModal } from '../../hooks'
import { GetAdminInfoRes, getAdminInfo } from '../../api/admin'
import { AxiosResponse } from 'axios'
import { AppErrorResponse } from '../../common/types'
import {
  Avatar,
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
  UserOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { EditAdminInfo } from './EditAdminInfo'

export const AdminProfile = () => {
  const { activateModal } = useModal()
  const { Title, Text } = Typography

  const [canViewPassword, setCanViewPassword] = useState(false)
  const [isEditInfo, setIsEditInfo] = useState(false)

  const {
    data: adminInfoRes,
    isLoading: isFetchingAdminInfo,
    isError,
    error,
  } = useQuery<AxiosResponse<GetAdminInfoRes>, AppErrorResponse>({
    queryKey: ['get-admin-info'],
    queryFn: getAdminInfo,
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

  type AdminInfoKeys = keyof GetAdminInfoRes['data']
  const personalInfoKeys: AdminInfoKeys[] = ['username', 'phone', 'location']
  const signInMethodKeys: AdminInfoKeys[] = ['email', 'password']

  const adminInfoTitles: Record<AdminInfoKeys, string> = {
    email: 'Email',
    username: 'User Name',
    phone: 'Contact Phone',
    location: 'Location',
    password: 'Password',
    image: 'Image',
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-center">
          <Avatar size={120} icon={<UserOutlined />} src={adminInfo?.image} />
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
        tooltip={'Edit Admin Info'}
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
