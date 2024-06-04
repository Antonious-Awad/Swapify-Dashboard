import { Card, Space, Table, Typography } from 'antd'
import { BaseStatisticsCardProps } from './types'
import { GetStatsUsersRes } from '../../api/statistics'
import { Customer } from '../../common/types'
import { recentUsersColumns } from './config'

export const RecentUsersCard = ({
  query,
}: BaseStatisticsCardProps<GetStatsUsersRes>) => (
  <Card bordered={false} className="w-full" loading={query.isLoading}>
    <Space className="mb-4" direction="vertical" size={2}>
      <Typography.Text className="font-semibold text-[18px]">
        Recent Users
      </Typography.Text>
      <Typography.Text className="font-medium text-[14px] text-neutral-300">
        Total {query.data?.data.TotalUsers} Visitors
      </Typography.Text>
    </Space>
    <Table<Customer>
      loading={query.isLoading}
      dataSource={query.data?.data.data}
      rowKey={({ _id }) => _id}
      columns={recentUsersColumns}
      showHeader={false}
      pagination={false}
      scroll={{ y: '19.375rem' }}
    />
  </Card>
)
