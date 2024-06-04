import { Card, Col, Row, Space, Typography } from 'antd'
import { TransactionDetailsProps, ItemKeys } from './types'

export const TransactionDetails = ({
  transactionDetails,
  isLoading,
}: TransactionDetailsProps) => {
  const itemKeys: ItemKeys[] = ['Descreption', 'price', 'title']
  const itemTitles: Record<ItemKeys, string> = {
    price: 'Price',
    title: 'Name',
    Descreption: 'Description',
  }
  return (
    <Row gutter={24}>
      <Col span={12}>
        <Card loading={isLoading} bordered={false} title="Offered Item">
          <Row>
            {itemKeys.map((key) => (
              <Col key={`offered-item-${key}`} span={8}>
                <Space size="middle" direction="vertical">
                  <Typography.Text>{itemTitles[key]}</Typography.Text>
                  <Typography.Text>
                    {transactionDetails?.offered_item[key] || 'N/A'}
                  </Typography.Text>
                </Space>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card loading={isLoading} bordered={false} title="Requested Item">
          <Row>
            {itemKeys.map((key) => (
              <Col key={`requested-item-${key}`} span={8}>
                <Space size="middle" direction="vertical">
                  <Typography.Text>{itemTitles[key]}</Typography.Text>
                  <Typography.Text>
                    {transactionDetails?.requested_item[key] || 'N/A'}
                  </Typography.Text>
                </Space>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
