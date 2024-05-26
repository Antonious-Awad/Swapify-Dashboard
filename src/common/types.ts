import { AxiosError } from 'axios'

export type TableTransaction = {
  From: string
  To: string
  creation_date: string
  offered_item_name?: string
  request_id: string
  requested_item_name?: string
}

export type ExchangeItem = {
  description: string
  price: number
  title: string
}

type Location = {
  governorate: string
  city: string
}
export type Customer = {
  createdAt: string
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
  image: string
}

export type AppErrorResponse = AxiosError<{
  message?: string
  error?: string
}>

export type Category = {
  id: string
  createdAt: string
  itemCount: number
  name: string
}
