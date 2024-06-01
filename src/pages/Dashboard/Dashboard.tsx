import { Row } from 'antd'
import { useStatistics } from '../../hooks/useStatistics'
import { TransactionsByDayCard } from './TransactionsByDayCard'

export const Dashboard = () => {
  const { getTransactionByDayQuery } = useStatistics()

  return (
    <>
      <Row className="w-full mt-5">
        <TransactionsByDayCard query={getTransactionByDayQuery} />
      </Row>
    </>
  )
}
