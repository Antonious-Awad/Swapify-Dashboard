import {
  Customer,
  CustomerRequest,
  Location,
  Pagination,
} from '../../common/types'

export type GetCustomerReq = Pagination

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

export type GetCustomerInfoRes = {
  success: boolean
  data: {
    _id: string
    username: string
    email: string
    phone: number
    location: Location
    favorites: string[]
    image: string
    NumberOfPosts: number
    NumberOfRequest: number
  }
}

export type GetCustomerRequestsRes = {
  data: CustomerRequest[]
  success: boolean
}
