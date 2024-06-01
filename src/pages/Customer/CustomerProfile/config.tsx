import { Table, TableProps } from 'antd'
import { CustomerRequest } from '../../../common/types'

export const customerRequestsColumns = (
  customerName: string
): TableProps<CustomerRequest>['columns'] => [
  {
    dataIndex: 'requestId',
    key: 'requestId',
    title: 'TRANSACTION ID',
  },
  {
    dataIndex: 'timeAgo',
    key: 'timeAgo',
    title: 'CREATED',
  },
  {
    key: 'customerName',
    title: 'FROM',
    render: () => customerName,
  },
  {
    dataIndex: 'offeredItemTitle',
    key: 'offered-item',
    title: 'ITEM',
  },
  {
    dataIndex: 'requestedUserName',
    key: 'requester',
    title: 'TO',
  },
  {
    dataIndex: 'requestedItemTitle',
    key: 'requested-item',
    title: 'ITEM',
  },
  Table.EXPAND_COLUMN,
]
