import { Customer } from '../../common/types'

export type CustomerListColumns = {
  onDelete: (id: Customer['_id']) => void
  isDeleting: boolean
  currentId: string
  onEyeClick: (customerId: string) => void
}
