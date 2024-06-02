import { Col, Row } from 'antd'
import { useStatistics } from '../../hooks/useStatistics'
import { TransactionsByDayCard } from './TransactionsByDayCard'
import { ReportsCard } from './RepostsCard'

export const Dashboard = () => {
  const { getTransactionByDayQuery, getReportCountQuery } = useStatistics()

  return (
    <>
      <Row className="w-full mt-5 mb-2.5">
        <TransactionsByDayCard query={getTransactionByDayQuery} />
      </Row>
      <Row className="my-2.5">
        <Col span={12}>
          <ReportsCard query={getReportCountQuery} />
        </Col>
      </Row>
    </>
  )
}
