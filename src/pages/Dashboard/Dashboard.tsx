import { Col, Row } from 'antd'
import { useStatistics } from '../../hooks/useStatistics'
import { TransactionsByDayCard } from './TransactionsByDayCard'
import { ReportsCard } from './ReportsCard'
import { CategoryItemCard } from './CategoryItemsCard'

export const Dashboard = () => {
  const {
    getTransactionByDayQuery,
    getReportCountQuery,
    getItemsByCategoryQuery,
  } = useStatistics()

  return (
    <>
      <Row className="w-full mt-5 mb-2.5">
        <TransactionsByDayCard query={getTransactionByDayQuery} />
      </Row>
      <Row className="my-2.5 h-[26rem]" gutter={24}>
        <Col span={16}>
          <ReportsCard query={getReportCountQuery} />
        </Col>
        <Col span={8}>
          <CategoryItemCard query={getItemsByCategoryQuery} />
        </Col>
      </Row>
      <Row className="my-2.5"></Row>
    </>
  )
}
