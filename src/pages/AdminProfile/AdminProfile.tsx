import { useQuery } from '@tanstack/react-query'
import { useModal } from '../../hooks'
import { GetAdminInfoRes, getAdminInfo } from '../../api/admin'
import { AxiosResponse } from 'axios'
import { AppErrorResponse } from '../../common/types'
import {
  Avatar,
  Button,
  Card,
  Flex,
  FloatButton,
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

export const AdminProfile = () => {
  const { activateModal } = useModal()
  const { Title, Text } = Typography

  const [canViewPassword, setCanViewPassword] = useState(false)

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
    <div className="p-4">
      <div className="flex items-center">
        <Avatar size={120} icon={<UserOutlined />} src={adminInfo?.image} />
      </div>
      <Title level={3} className="my-[3rem]">
        Personal Info
      </Title>
      {/* TODO: Fix Gaps */}
      <div className="grid grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
        {personalInfoKeys.map((field) => {
          return (
            <Card loading={isFetchingAdminInfo} className="w-[25rem]">
              <Space size="middle" direction="vertical" className="w-full">
                <Text className="text-[18px] text-neutral-300">
                  {adminInfoTitles[field]}
                </Text>
                <Text className="text-[20px] font-semibold">
                  {field === 'location'
                    ? `${adminInfo?.location.governorate}, ${adminInfo?.location.city}`
                    : adminInfo?.[field]}
                </Text>
              </Space>
            </Card>
          )
        })}
      </div>
      <Title level={3} className="my-[3rem]">
        Sign In Method
      </Title>
      <div className="grid grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
        {signInMethodKeys.map((field) => {
          if (field === 'location') return
          return (
            <Card loading={isFetchingAdminInfo} className="w-[25rem]">
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
          )
        })}
      </div>
      <FloatButton icon={<EditOutlined />} tooltip={'Edit Admin Info'} />
    </div>
  )
}
