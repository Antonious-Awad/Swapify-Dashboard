import { AdminInfo, BaseModalProps } from '../../common/types'

export type EditAdminInfoProps = {
  adminInfo: AdminInfo
} & BaseModalProps

export type AdminInfoForm = Omit<AdminInfo, 'location' | 'password' | 'image'> &
  AdminInfo['location']
