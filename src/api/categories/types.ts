import { AxiosResponse } from 'axios'
import { Category } from '../../common/types'
import { DeleteCustomerRes } from '../customer'

export type GetCategoriesRes = AxiosResponse<{
  success: boolean
  data: Category[]
}>

export type DeleteCategoryRes = AxiosResponse<DeleteCustomerRes>
