import { Button, Popconfirm, TableProps, Typography } from 'antd'
import { Category, Customer } from '../../common/types'
import { formatToDDMMMYYYY } from '../../utils/date'
import { DeleteOutlined } from '@ant-design/icons'

export const categoriesListColumns = (
  onDelete: (id: Category['id']) => void,
  isDeleting: boolean,
  currentId: string
): TableProps<Category>['columns'] => [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Category Name',
    render: (name: Category['name']) => (
      <Typography.Text className="font-semibold text-brand-300">
        {name}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'itemCount',
    key: 'count',
    title: 'Number of Items',
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
    render: (_, { id }) => {
      return (
        <Popconfirm title="Are You Sure?" onConfirm={() => onDelete(id)}>
          <Button
            icon={<DeleteOutlined />}
            key={id}
            loading={isDeleting && id === currentId}
          />
        </Popconfirm>
      )
    },
  },
]
