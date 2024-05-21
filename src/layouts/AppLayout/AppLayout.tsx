import { Navigate, Outlet } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'
import { Layout, Menu } from 'antd'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { sidebarItems } from './config'

export const AppLayout = () => {
  const checkValidToken = () => {
    const token = sessionStorage.getItem('token')
    return !!token
  }
  const ApplicationLayout = () => (
    <Layout className="min-h-screen">
      <Sidebar items={sidebarItems} />
      <Outlet />
    </Layout>
  )
  return checkValidToken() ? (
    <ApplicationLayout />
  ) : (
    <Navigate to={APP_PATHS.login} replace />
  )
}
