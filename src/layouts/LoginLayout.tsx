import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import backgroundImage from '../assets/Images/LoginBackground.png'

export const LoginLayout = () => {
  return (
    <Layout>
      <Layout.Content className="w-full relative h-screen overflow-hidden text-center text-h1SemiBold bg-neutral-200 flex">
        <img
          src={backgroundImage}
          alt="background"
          className="absolute w-full max-w-full max-h-full top-0 right-0 bottom-[-0.5rem] left-0 overflow-hidden object-cover h-[calc(100%+8px)]"
        />
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
