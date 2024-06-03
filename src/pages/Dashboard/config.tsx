import { Col, Row, Space, TableProps, TabsProps, Typography } from 'antd'
import { GetReportsCountsRes } from '../../api/statistics'
import {
  Customer,
  PostRequestItem,
  TableTransaction,
  reportRecord,
} from '../../common/types'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { colors } from '../../styles/colors'
import { formatToDDMMMYYYY } from '../../utils/date'
import { statusColor } from '../../common/utils'

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

export const statTransactionTableColumns: TableProps<TableTransaction>['columns'] =
  [
    {
      key: 'request-id',
      title: 'TRANSACTION ID',
      dataIndex: 'request_id',
    },
    {
      dataIndex: 'creation_date',
      key: 'creation-date',
      title: 'CREATED',
      render: (date: TableTransaction['creation_date']) =>
        formatToDDMMMYYYY(date),
    },
    {
      key: 'from',
      title: 'FROM',
      dataIndex: 'From',
    },
    {
      key: 'to',
      title: 'TO',
      dataIndex: 'To',
    },
  ]

export const itemsStatisticsColumns: TableProps<PostRequestItem>['columns'] = [
  {
    dataIndex: '_id',
    key: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'user',
    key: 'user',
    title: 'CUSTOMER',
  },
  {
    dataIndex: 'status',
    key: 'status',
    title: 'STATUS',
    render: (status: PostRequestItem['status']) => {
      const className = `${statusColor[status]} font-semibold`
      return <Typography.Text className={className}>{status}</Typography.Text>
    },
  },
  {
    dataIndex: 'title',
    key: 'item_name',
    title: 'ITEM',
  },
]

export const recentUsersColumns: TableProps<Customer>['columns'] = [
  {
    dataIndex: 'username',
    render: (username: Customer['username'], { location }) => (
      <>
        <Col>
          <Row className="font-semibold text-brand-400 text-[15px]">
            {username}
          </Row>
          <Row className="text-neutral-300 text-[12px] font-medium">
            {location.city} , {location.governorate}
          </Row>
        </Col>
      </>
    ),
  },
  {
    dataIndex: '_id',
  },
]
