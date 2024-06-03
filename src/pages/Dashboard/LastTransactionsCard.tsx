import { BaseStatisticsCardProps } from './types'
import { APP_PATHS } from '../../utils/paths'
import { TitleWithMoreDetails } from '../../components/TitleWithMoreDetails'
import { Card, Table } from 'antd'
import { TableTransaction } from '../../common/types'
import { statTransactionTableColumns } from './config'
import { GetAcceptedTransactionsStatRes } from '../../api/statistics'

export const LastTransactionsCard = ({
  query,
}: BaseStatisticsCardProps<GetAcceptedTransactionsStatRes>) => {
  return (
    <Card bordered={false} className="w-full" loading={query.isLoading}>
      <TitleWithMoreDetails
        title="Last Transactions"
        moreDetailsPath={APP_PATHS.transactions}
      />
      <Table<TableTransaction>
        columns={statTransactionTableColumns}
        dataSource={query.data?.data}
        rowKey={({ request_id: _id }) => _id}
      />
    </Card>
  )
}
