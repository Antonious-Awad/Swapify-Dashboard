import { ReactNode, createContext, useCallback, useContext } from 'react'
import {
  NotificationConfig,
  NotificationContext,
  NotificationTypes,
} from './types'
import { notification } from 'antd'

const notificationContext = createContext<NotificationContext | undefined>(
  undefined
)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = useCallback(
    (type: NotificationTypes, config: NotificationConfig) => {
      if (type !== 'destroy') {
        api[type]({
          ...config,
          placement: 'topRight',
        })
      }
    },
    [api]
  )

  return (
    <notificationContext.Provider value={{ notification: openNotification }}>
      {contextHolder}
      {children}
    </notificationContext.Provider>
  )
}

export const useNotificationContext = (): NotificationContext => {
  const context = useContext(notificationContext)
  if (context === undefined)
    throw new Error('useNotificationContext was used outside of its Provider')
  return context
}
