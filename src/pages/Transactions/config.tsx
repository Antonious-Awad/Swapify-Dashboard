import { TableProps } from 'antd'
import { TableTransaction } from '../../common/types'
import { calculateTimeFromToday } from '../../utils/date'

export const TransactionTableColumns: TableProps<TableTransaction>['columns'] =
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
        calculateTimeFromToday(date),
    },
    {
      key: 'from',
      title: 'FROM',
      dataIndex: 'From',
    },
    {
      key: 'offered-item',
      title: 'ITEM',
      dataIndex: 'offered_item_name',
      render: (item: TableTransaction['offered_item_name']) => item || 'N/A',
    },
    {
      key: 'to',
      title: 'TO',
      dataIndex: 'To',
    },
    {
      key: 'requested-item',
      title: 'ITEM',
      dataIndex: 'requested_item_name',
      render: (item: TableTransaction['requested_item_name']) => item || 'N/A',
    },
  ]
