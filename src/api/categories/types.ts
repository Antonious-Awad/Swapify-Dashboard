import { AxiosResponse } from 'axios'
import { Category, Filters, Pagination } from '../../common/types'
import { DeleteCustomerRes } from '../customer'

export type GetCategoriesReq = Pagination & Pick<Filters, 'search'>
export type GetCategoriesRes = AxiosResponse<{
  success: boolean
  data: Category[]
}>

export type DeleteCategoryRes = AxiosResponse<DeleteCustomerRes>
