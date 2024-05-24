import { Customer } from '../../common/types'

export type GetCustomerReq = {
  query: {
    limit?: number
    page?: number
  }
}

export type GetCustomersRes = {
  currentPage: number
  totalPages: number
  totalUsers: number
  data: Customer[]
}

export type DeleteCustomerRes = {
  msg: string
  success: boolean
}
