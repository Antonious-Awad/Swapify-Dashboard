import { Card, Space, Tabs, Typography } from 'antd'
import { BaseStatisticsCardProps } from './types'
import { reportsTabs } from './config'
import { GetReportsCountsRes } from '../../api/statistics'

export const ReportsCard = ({
  query,
}: BaseStatisticsCardProps<GetReportsCountsRes>) => {
  return (
    <Card bordered={false} loading={query.isLoading} className="w-full px-4">
      <Space direction="vertical" size={5} className="mb-4">
        <Typography.Text className="font-semibold text-[18px]">
          Reports
        </Typography.Text>
        <Typography.Text className="text-neutral-300">
          Last 7 Days
        </Typography.Text>
      </Space>
      {query.data && (
        <Tabs items={reportsTabs(query.data?.data)} size="large" />
      )}
    </Card>
  )
}
