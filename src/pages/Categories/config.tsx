import { DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Popconfirm, Row, type TableProps, Typography } from 'antd'
import { Category, Customer } from '../../common/types'
import { formatToDDMMMYYYY } from '../../utils/date'
import { Avatar } from '../../components/Avatar'

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
    render: (name: Category['name'], { image }) => (
      <Row align="middle">
        <Col span={4}>
          <Avatar src={image?.url} size={50} />
        </Col>
        <Col>
          <Typography.Text className="font-semibold text-brand-300">
            {name}
          </Typography.Text>
        </Col>
      </Row>
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
    render: (createdAt: Customer['created_at']) => formatToDDMMMYYYY(createdAt),
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

export const normalizeUploadFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
