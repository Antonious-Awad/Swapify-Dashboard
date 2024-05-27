import { Button, Popconfirm, Row, Space, TableProps } from 'antd'
import { Customer } from '../../common/types'
import { formatToDDMMMYYYY } from '../../utils/date'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { CustomerListColumns } from './types'

export const customerListColumns = ({
  currentId,
  isDeleting,
  onDelete,
  onEyeClick,
}: CustomerListColumns): TableProps<Customer>['columns'] => [
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
        <Space>
          <Popconfirm title="Are You Sure?" onConfirm={() => onDelete(_id)}>
            <Button
              icon={<DeleteOutlined />}
              key={_id}
              loading={isDeleting && _id === currentId}
            />
          </Popconfirm>
          <Button icon={<EyeOutlined />} onClick={() => onEyeClick(_id)} />
        </Space>
      )
    },
  },
]
