import { AxiosError, AxiosResponse } from 'axios'

export type ImageObject = {
  url: string
  public_id: string
}

export type TableTransaction = {
  From: string
  To: string
  creation_date: string
  offered_item_name?: string
  request_id: string
  requested_item_name?: string
}

export type ExchangeItem = {
  Description: string
  price: number
  title: string
}

export type Location = {
  governorate: string
  city: string
}
export type Customer = {
  created_at: string
  updatedAt: string
  email: string
  favorites: string[]
  location: Location
  _id: string
  username: string
  password: string
  role: 'user' | 'admin'
  phone: string
  token: string
  __v: number
  image: ImageObject
}

export type AppErrorResponse = AxiosError<{
  message?: string
  error?: string
  success?: boolean
}>

export type Category = {
  id: string
  createdAt: string
  itemCount: number
  name: string
}

export type CustomerRequest = {
  requestId: string
  requesterName: string
  requestedUserName: string
  offeredItemTitle: string
  requestedItemTitle: string
  timeAgo: string
}

export type DefaultApiResponse = AxiosResponse<{
  success: boolean
  message: string
}>

export type BaseModalProps = {
  onClose: () => void
}

export type AdminInfo = {
  username: string
  email: string
  phone: string
  password: string
  location: Location
  image: ImageObject
}

export type PostRequestItem = {
  _id: string
  title: string
  Description: string
  price: number
  category: string
  user: {
    _id: string
    username: string
    email: string
  }
  condition: boolean
  slug: string
  image: ImageObject
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  updatedAt: string
  __v: number
  created_at: string
  updated_at: string
}

export type RangeOptions = '3_months' | '6_months' | '9_months' | '12_months'

export type Pagination = {
  page?: number
  limit?: number
}

export type Filters = {
  search?: string
  rangeOption?: RangeOptions | ''
}

export type reportRecord = {
  _id: string
  day: string
  count: number
}

export type AcceptedItem = Omit<PostRequestItem, 'created_at'> &
  { createdDate: string }[]
