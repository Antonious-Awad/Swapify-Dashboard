import { Card, Typography } from 'antd'
import { BaseStatisticsCardProps } from './types'
import { GetItemCountByCategoryRes } from '../../api/statistics'
import { CircleGraph } from '../../components/CircleGraph'

export const CategoryItemCard = ({
  query,
}: BaseStatisticsCardProps<GetItemCountByCategoryRes>) => {
  return (
    <Card bordered={false} loading={query.isLoading} className="h-full">
      <Typography.Text className="font-semibold text-[18px]">
        Most Used Categories
      </Typography.Text>
      {query.data && <CircleGraph data={query.data?.data} />}
    </Card>
  )
}
