import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './styles/globals.css'
import { ConfigProvider } from 'antd'
import { APP_THEME } from './utils/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={APP_THEME}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
