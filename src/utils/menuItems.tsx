import { MenuProps } from 'antd'
import {
  HomeOutlined,
  ProductOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { NavigateFunction } from 'react-router-dom'
import { APP_PATHS } from './paths'

export const sidebarItems = (
  navigate: NavigateFunction
): MenuProps['items'] => [
  {
    label: 'Main Menu',
    key: 'main-menu',
    type: 'group',
    children: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <HomeOutlined />,
        onClick: () => navigate(APP_PATHS.dashboard),
      },
      {
        key: 'transactions',
        label: 'Transactions',
        icon: <ShoppingCartOutlined />,
        onClick: () => navigate(APP_PATHS.transactions),
      },
      {
        key: 'customers',
        label: 'Customers',
        icon: <TeamOutlined />,
        onClick: () => navigate(APP_PATHS.customers),
      },
      {
        key: 'posts-requests',
        label: 'Posts Requests',
        icon: <SendOutlined />,
        onClick: () => navigate(APP_PATHS.postsRequest),
      },
    ],
  },
  {
    label: 'Categories',
    key: 'categories-item',
    type: 'group',
    children: [
      {
        key: 'categories',
        label: 'Categories List',
        onClick: () => navigate(APP_PATHS.categories),
        icon: <ProductOutlined />,
      },
    ],
  },
  {
    label: 'Admin',
    key: 'admin',
    type: 'group',
    children: [
      {
        key: 'admin-profile',
        label: 'View Profile',
        icon: <UserOutlined />,
        onClick: () => navigate(APP_PATHS.profile),
      },
    ],
  },
]
