import { useQuery } from '@tanstack/react-query'
import { useModal } from '../../hooks'
import { GetAdminInfoRes, getAdminInfo } from '../../api/admin'
import { AxiosResponse } from 'axios'
import { AppErrorResponse } from '../../common/types'
import { Avatar, Card, Flex, Space, Typography } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'

export const AdminProfile = () => {
  const { activateModal } = useModal()
  const { Title, Text } = Typography

  const { data: adminInfoRes, isLoading: isFetchingAdminInfo } = useQuery<
    AxiosResponse<GetAdminInfoRes>,
    AppErrorResponse
  >({
    queryKey: ['get-admin-info'],
    queryFn: getAdminInfo,
  })

  const adminInfo = adminInfoRes?.data.data

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
        <Avatar size={120} icon={<UserOutlined />} />
      </div>
      <Title level={3} className="my-[3rem]">
        Personal Info
      </Title>
      <div className="grid grid-cols-2 gap-x-[4rem] gap-y-[2rem]">
        {personalInfoKeys.map((field) => {
          return (
            <Card loading={isFetchingAdminInfo}>
              <Space size="middle" direction="vertical" className="w-full">
                <Flex justify="space-between">
                  <Text className="text-[18px] text-neutral-300">
                    {adminInfoTitles[field]}
                  </Text>
                  <EditOutlined />
                </Flex>
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
            <Card loading={isFetchingAdminInfo}>
              <Space size="middle" direction="vertical" className="w-full">
                <Flex justify="space-between">
                  <Text className="text-[18px] text-neutral-300">
                    {adminInfoTitles[field]}
                  </Text>
                  <EditOutlined />
                </Flex>
                <Text className="text-[20px] font-semibold">
                  {field === 'password' ? '*********' : adminInfo?.[field]}
                </Text>
              </Space>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
