import { Layout, Menu, MenuProps } from 'antd'

export const Sidebar = ({ items }: { items?: MenuProps['items'] }) => {
  const { Sider } = Layout
  return (
    <Sider collapsible color="#fff">
      <Menu
        theme="light"
        defaultSelectedKeys={['1']}
        mode="inline"
        color="#fff"
        items={items}
      />
    </Sider>
  )
}
