export type UseModal = {
  activateModal: (type: 'success' | 'danger', title: string) => void
}
export type UseModalHook = () => UseModal
