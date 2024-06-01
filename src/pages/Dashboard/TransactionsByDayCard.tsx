import type { GetTransactionsByDayRes } from '../../api/statistics'
import { Card, Col, Row, Space, Typography } from 'antd'
import type { BaseStatisticsCardProps } from './types'
import { Line } from '@ant-design/charts'

export const TransactionsByDayCard = ({
  query,
}: BaseStatisticsCardProps<GetTransactionsByDayRes>) => {
  const totalTransactions = query.data?.data.TotalTransactions
  return (
    <Card
      bordered={false}
      loading={query.isLoading}
      className="w-full px-4 py-8"
    >
      <Row>
        <Col span={12}>
          <Space size={'large'} direction="vertical">
            <Typography.Text className="font-semibold text-[18px]">
              Total Transactions
            </Typography.Text>
            <Typography.Text className="text-brand-300 font-semibold text-[32px]">
              ${totalTransactions}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <div className="h-[9.375rem]">
            <Line
              data={query.data?.data.dailyTotals}
              xField={'day'}
              yField={'total'}
            />
          </div>
        </Col>
      </Row>
    </Card>
  )
}
