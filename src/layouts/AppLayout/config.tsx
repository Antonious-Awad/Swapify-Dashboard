import { MenuProps } from 'antd'
import { Home } from '../../components/icons'
import Icon from '@ant-design/icons'

export const sidebarItems: MenuProps['items'] = [
  {
    label: 'Main Menu',
    key: 'mainMenu',
    children: [
      {
        key: 'Dashboard',
        label: 'Dashboard',
        icon: <Icon component={Home} style={{ color: 'red' }} />,
      },
    ],
  },
]
