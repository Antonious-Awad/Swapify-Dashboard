import { notification } from 'antd'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import {
  NotificationConfig,
  NotificationContext,
  NotificationTypes,
} from './types'

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
          duration: config.duration || 2,
          placement: 'topRight',
        })
      }
    },
    [api]
  )

  const contextVal = useMemo(
    () => ({
      notification: openNotification,
    }),
    [openNotification]
  )
  return (
    <notificationContext.Provider value={contextVal}>
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
