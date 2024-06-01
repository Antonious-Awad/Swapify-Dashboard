import { Button, Layout, Menu, MenuProps } from 'antd'
import { Collapse, SwapifyLogo } from '../icons'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'
import { sidebarItems } from '../../utils/menuItems'
import { CollapsedTRDLogo } from '../icons/CollapsedTRDLogo'

export const Sidebar = () => {
  const { Sider } = Layout

  const [collapse, setCollapse] = useState(false)
  const routePath = useLocation().pathname.split('/')
  const navigate = useNavigate()

  return (
    <Sider collapsible trigger={null} width={'18%'} collapsed={collapse}>
      <div
        className={`flex justify-between px-5 py-6 ${collapse ? 'flex-col items-center' : ''}`}
      >
        <Link to={APP_PATHS.dashboard}>
          {collapse ? (
            <CollapsedTRDLogo width="76" height="22" />
          ) : (
            <SwapifyLogo width="76" height="22" />
          )}
        </Link>
        <Button type="link" onClick={() => setCollapse(!collapse)}>
          <Collapse />
        </Button>
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={sidebarItems(navigate)}
        selectedKeys={routePath}
        expandIcon={() => undefined}
      />
    </Sider>
  )
}
