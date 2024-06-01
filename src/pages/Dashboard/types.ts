import { UseQueryResult } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import type { AppErrorResponse } from '../../common/types'

export type BaseStatisticsCardProps<RESPONSE> = {
  query: UseQueryResult<AxiosResponse<RESPONSE>, AppErrorResponse>
}
