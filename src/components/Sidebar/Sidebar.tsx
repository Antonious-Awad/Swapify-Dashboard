import { Button, Layout, Menu, MenuProps } from 'antd'
import { Collapse, TrdLogo } from '../icons'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'
import { sidebarItems } from '../../utils/menuItems'

export const Sidebar = () => {
  const { Sider } = Layout

  const [collapse, setCollapse] = useState(false)
  const routePath = useLocation().pathname.split('/')
  const navigate = useNavigate()
  return (
    <Sider collapsible trigger={null} width={'18%'} collapsed={collapse}>
      <div className="flex justify-between px-5 py-6">
        <Link to={APP_PATHS.dashboard}>
          <TrdLogo width="76" height="22" />
        </Link>
        {/*TODO: Check why this button doesn't work & why the items are not selected when clicked */}
        <Button type="link" onClick={() => setCollapse(false)}>
          <Collapse />
        </Button>
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={sidebarItems(navigate)}
        selectedKeys={routePath}
        openKeys={['main-menu', 'categories', 'admin']}
        expandIcon={() => undefined}
      />
    </Sider>
  )
}
