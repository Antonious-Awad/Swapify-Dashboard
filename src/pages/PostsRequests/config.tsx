import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, TableProps, Typography } from 'antd'
import { PostRequestItem } from '../../common/types'
import { formatToDDMMMYYYY } from '../../utils/date'
import { statusColor } from '../../common/utils'

export const itemsListColumns = (
  handleStatus: (id: string, status: PostRequestItem['status']) => void,
  isUpdatingStatus: boolean,
  currId: string
): TableProps<PostRequestItem>['columns'] => [
  {
    dataIndex: '_id',
    key: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'user',
    key: 'user',
    title: 'USER',
    render: (user: PostRequestItem['user']) => user.username,
  },
  {
    dataIndex: 'created_at',
    key: 'created_at',
    title: 'CREATED',
    render: (created: PostRequestItem['created_at']) =>
      formatToDDMMMYYYY(created),
  },
  {
    dataIndex: 'title',
    key: 'item_name',
    title: 'ITEM',
  },
  {
    dataIndex: 'category',
    key: 'category',
    title: 'CATEGORY',
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
    key: 'action',
    title: 'Actions',
    render: (_, { _id }) => (
      <Space>
        <Popconfirm
          title="Are You Sure?"
          onConfirm={() => handleStatus(_id, 'accepted')}
        >
          <Button
            icon={<CheckCircleOutlined />}
            className="text-success-400 border-success-400"
            loading={isUpdatingStatus && currId === _id}
          >
            Approve
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Are You Sure?"
          onConfirm={() => handleStatus(_id, 'rejected')}
        >
          <Button
            icon={<CloseCircleOutlined />}
            className="text-danger-400 border-danger-400"
            loading={isUpdatingStatus && currId === _id}
          >
            Reject
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]
