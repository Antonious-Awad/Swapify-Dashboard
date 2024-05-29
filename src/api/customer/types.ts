import { Customer, CustomerRequest, Location } from '../../common/types'

export type GetCustomerReq = {
  limit?: number
  page?: number
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

export type GetCustomerInfoRes = {
  success: boolean
  data: {
    _id: string
    username: string
    email: string
    phone: number
    location: Location
    favorites: string[]
    //TODO: align with BE how to receive images
    image: string
    NumberOfPosts: number
    NumberOfRequest: number
  }
}

export type GetCustomerRequestsRes = {
  data: CustomerRequest[]
  success: boolean
}
