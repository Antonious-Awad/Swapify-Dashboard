import { NotificationArgsProps } from 'antd'
import { ArgsProps, NotificationInstance } from 'antd/es/notification/interface'

export type NotificationTypes = keyof NotificationInstance

export type NotificationConfig = ArgsProps

export type ActivateNotification = (
  type: NotificationTypes,
  config: NotificationConfig
) => void

export type NotificationContext = {
  notification: ActivateNotification
}
