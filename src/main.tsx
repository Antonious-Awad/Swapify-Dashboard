import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'
import { ConfigProvider } from 'antd'
import { APP_THEME } from './utils/theme.ts'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './routes/appRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={APP_THEME}>
      <RouterProvider router={appRoutes} />
    </ConfigProvider>
  </React.StrictMode>
)
