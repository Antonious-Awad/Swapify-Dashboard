import { BaseStatisticsCardProps } from './types'
import { APP_PATHS } from '../../utils/paths'
import { TitleWithMoreDetails } from '../../components/TitleWithMoreDetails'
import { Card, Table } from 'antd'
import { PostRequestItem } from '../../common/types'
import { GetStatsItemRes } from '../../api/statistics'
import { itemsStatisticsColumns } from './config'

export const RecentPostsCard = ({
  query,
}: BaseStatisticsCardProps<GetStatsItemRes>) => {
  return (
    <Card bordered={false} className="w-full" loading={query.isLoading}>
      <TitleWithMoreDetails
        title="Recent Posts Requests"
        moreDetailsPath={APP_PATHS.postsRequest}
      />
      <Table<PostRequestItem>
        loading={query.isLoading}
        dataSource={query.data?.data.data}
        columns={itemsStatisticsColumns}
        rowKey={({ _id }) => _id}
        pagination={false}
      />
    </Card>
  )
}
