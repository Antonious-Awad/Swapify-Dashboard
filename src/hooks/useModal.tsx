import { App } from 'antd'
import { UseModal, UseModalHook } from './types'
import { Success, Wrong } from '../components/icons'

export const useModal: UseModalHook = () => {
  const { modal } = App.useApp()

  const activateModal: UseModal['activateModal'] = (type, title) => {
    modal.confirm({
      styles: {
        content: {
          textAlign: 'center',
        },
      },
      maskClosable: true,
      title,
      icon: type === 'success' ? <Success /> : <Wrong />,
      width: 400,
      centered: true,
      zIndex: 2000,
    })
  }
  return { activateModal }
}
