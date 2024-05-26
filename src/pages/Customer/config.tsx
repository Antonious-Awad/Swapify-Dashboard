import { Button, Popconfirm, Row, TableProps } from 'antd'
import { Customer } from '../../common/types'
import { formatToDDMMMYYYY } from '../../utils/date'
import { DeleteOutlined } from '@ant-design/icons'

export const customerListColumns = (
  onDelete: (id: Customer['_id']) => void,
  isDeleting: boolean,
  currentId: string
): TableProps<Customer>['columns'] => [
  {
    dataIndex: '_id',
    key: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'username',
    key: 'name',
    title: 'Name',
    render: (username: Customer['username'], { email }) => (
      <>
        <Row className="font-semibold text-brand-400">{username}</Row>
        <Row className="text-neutral-300">{email}</Row>
      </>
    ),
  },
  {
    dataIndex: 'phone',
    key: 'phone',
    title: 'Phone Number',
  },
  {
    dataIndex: 'createdAt',
    key: 'createdAt',
    title: 'Created',
    render: (createdAt: Customer['createdAt']) => formatToDDMMMYYYY(createdAt),
  },
  {
    key: 'action',
    title: 'Actions',
    render: (_, { _id }) => {
      return (
        <Popconfirm title="Are You Sure?" onConfirm={() => onDelete(_id)}>
          <Button
            icon={<DeleteOutlined />}
            key={_id}
            loading={isDeleting && _id === currentId}
          />
        </Popconfirm>
      )
    },
  },
]
