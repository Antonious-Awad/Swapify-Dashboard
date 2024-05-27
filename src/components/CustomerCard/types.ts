import type { GetCustomerInfoRes } from '../../api/customer'

export type CustomerCardProps = {
  isLoading: boolean
  customerDetails: GetCustomerInfoRes['data'] | undefined
}
