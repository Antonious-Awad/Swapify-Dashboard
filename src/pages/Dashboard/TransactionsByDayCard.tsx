import type { GetTransactionsByDayRes } from '../../api/statistics'
import { Card, Col, Flex, Row, Space, Typography } from 'antd'
import type { BaseStatisticsCardProps } from './types'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { colors } from '../../styles/colors'

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
          <Flex align="center" className="h-full">
            <Space size={'large'} direction="vertical">
              <Typography.Text className="font-semibold text-[18px]">
                Total Transactions
              </Typography.Text>
              <Typography.Text className="text-brand-200 font-semibold text-[32px]">
                ${totalTransactions}
              </Typography.Text>
            </Space>
          </Flex>
        </Col>
        <Col span={12}>
          <ResponsiveContainer height={150}>
            <LineChart data={query.data?.data.dailyTotals}>
              <Line
                type="monotone"
                dataKey={'total'}
                name="Transcations"
                stroke={colors.brand[200]}
                strokeWidth={'3px'}
                dot={false}
              />
              <XAxis dataKey={'day'} />
              <Legend verticalAlign="top" align="left" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  )
}
