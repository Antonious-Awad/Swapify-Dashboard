import { Space, TabsProps, Typography } from 'antd'
import { GetReportsCountsRes } from '../../api/statistics'
import { reportRecord } from '../../common/types'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { colors } from '../../styles/colors'

const reportTabLabel = (number: number, title: string) => (
  <Space size={1} direction="vertical">
    <Typography.Text className="text-[24px] font-semibold">
      {number}
    </Typography.Text>
    <Typography.Text className="text-neutral-300 font-medium">
      {title}
    </Typography.Text>
  </Space>
)

const reportTabRender = (records: reportRecord[]) => (
  <ResponsiveContainer height={200}>
    <LineChart data={records}>
      <Line
        type="monotone"
        dataKey={'count'}
        stroke={colors.brand[200]}
        strokeWidth={'3px'}
        dot={false}
      />
      <XAxis dataKey={'day'} />
      <YAxis dataKey={'count'} axisLine={false} />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)

export const reportsTabs = (data: GetReportsCountsRes): TabsProps['items'] => [
  {
    key: 'customer-reports',
    label: reportTabLabel(data.total.customers, 'Customers'),
    children: reportTabRender(data.daily.customers),
  },
  {
    key: 'posts-reports',
    label: reportTabLabel(data.total.posts, 'Posts'),
    children: reportTabRender(data.daily.posts),
  },
  {
    key: 'transactions-reports',
    label: reportTabLabel(data.total.transactions, 'Transactions'),
    children: reportTabRender(data.daily.transactions),
  },
]
