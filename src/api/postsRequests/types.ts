import type { Pagination, PostRequestItem, Filters } from '../../common/types'

export type GetRequestsReq = Pagination & Filters

export type GetRequestsRes = {
  TotalItems: number
  page: number
  data: PostRequestItem[]
}

export type UpdateStatusReq = {
  itemId: string
  status: PostRequestItem['status']
}
