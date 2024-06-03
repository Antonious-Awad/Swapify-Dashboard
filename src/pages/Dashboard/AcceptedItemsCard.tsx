import { Card, Table } from 'antd'
import { TitleWithMoreDetails } from '../../components/TitleWithMoreDetails'
import { APP_PATHS } from '../../utils/paths'
import { BaseStatisticsCardProps } from './types'
import type { GetAcceptedItemsRes } from '../../api/statistics'
import { acceptedItemsColumns } from './config'
import type { AcceptedItem } from '../../common/types'

export const AcceptedItemsCard = ({
  query,
}: BaseStatisticsCardProps<GetAcceptedItemsRes>) => {
  return (
    <Card bordered={false} className="w-full" loading={query.isLoading}>
      <TitleWithMoreDetails
        title="Recent Posts"
        moreDetailsPath={APP_PATHS.postsRequest}
      />
      <Table<AcceptedItem>
        loading={query.isLoading}
        dataSource={query.data?.data.data}
        columns={acceptedItemsColumns}
        rowKey={({ _id }) => _id}
        pagination={false}
      />
    </Card>
  )
}
