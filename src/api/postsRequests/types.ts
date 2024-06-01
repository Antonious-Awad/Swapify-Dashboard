import { PostRequestItem } from '../../common/types'

export type GetRequestsRes = {
  TotalItems: number
  page: number
  data: PostRequestItem[]
}

export type UpdateStatusReq = {
  itemId: string
  status: PostRequestItem['status']
}
