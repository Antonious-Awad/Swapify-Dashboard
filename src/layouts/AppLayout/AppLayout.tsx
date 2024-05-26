import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'
import { Button, Dropdown, Layout, MenuProps, Typography } from 'antd'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { checkValidToken, removeSessionsToken } from '../../utils/token'
import { capitalizeFirstLetter } from '../../utils/string'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'

export const AppLayout = () => {
  const { pathname } = useLocation()

  const routePath = pathname.split('/')

  const doesTitleHasDash = routePath[1].includes('-')

  const splicedTitle = doesTitleHasDash ? routePath[1].split('-') : routePath[1]

  const headerTitle = doesTitleHasDash
    ? `${capitalizeFirstLetter(splicedTitle[0])} ${capitalizeFirstLetter(splicedTitle[1])}`
    : capitalizeFirstLetter(routePath[1])

  const logout: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Button
          type="link"
          icon={<LogoutOutlined />}
          onClick={() => {
            removeSessionsToken()
            location.reload()
          }}
        >
          Logout
        </Button>
      ),
    },
  ]

  const { Header, Content } = Layout
  const ApplicationLayout = () => (
    <Layout className="min-h-screen" hasSider>
      <Sidebar />
      <Layout>
        <Header className="flex justify-between">
          <Typography.Text className="font-semibold text-h1SemiBold text-brand-400 flex items-center">
            {headerTitle}
          </Typography.Text>

          <div className="flex items-center">
            <Dropdown
              menu={{ items: logout }}
              arrow
              placement="bottom"
              trigger={['click']}
            >
              <UserOutlined style={{ fontSize: '20px' }} />
            </Dropdown>
          </div>
        </Header>
        <Content className="px-8 py-1">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )

  return checkValidToken() ? (
    <ApplicationLayout />
  ) : (
    <Navigate to={APP_PATHS.login} replace />
  )
}
