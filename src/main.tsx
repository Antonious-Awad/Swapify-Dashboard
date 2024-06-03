import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'
import { ConfigProvider } from 'antd'
import { APP_THEME } from './utils/theme.ts'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './routes/appRoutes.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient.ts'
import { NotificationProvider } from './contexts/notification/notificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={APP_THEME}>
        <NotificationProvider>
          <RouterProvider router={appRoutes} />
        </NotificationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
