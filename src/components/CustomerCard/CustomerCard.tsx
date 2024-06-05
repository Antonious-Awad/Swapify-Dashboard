import { Card, Col, Divider, Row, Space, Typography } from 'antd'
import { CustomerCardProps } from './types'
import { Avatar } from '../Avatar'

export const CustomerCard = ({
  isLoading,
  customerDetails,
}: CustomerCardProps) => {
  const { Title, Text } = Typography
  return (
    <Card bordered={false} className="m-auto mt-[3rem]" loading={isLoading}>
      <Row gutter={24} align="middle">
        <Col span={3}>
          <Avatar size={100} src={customerDetails?.image?.url} />
        </Col>
        <Col span={5} className="mb-[1rem]">
          <Title level={3}>{customerDetails?.username}</Title>
          <Text>{customerDetails?.email}</Text>
        </Col>
        <Col span={1}>
          <Divider type="vertical" className="bg-neutral-300 h-[8.75rem]" />
        </Col>
        <Col span={6}>
          <Space direction="vertical" className="font-medium">
            <Text className="text-neutral-300">PERSONAL INFORMATION</Text>
            <Space size="large">
              <Text>Contact Number</Text>
              <Text>{customerDetails?.phone}</Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Divider type="vertical" className="bg-neutral-300 h-[8.75rem]" />
        </Col>
        <Col span={6}>
          <Row>
            <Space direction="vertical">
              <Text className="text-neutral-300 uppercase font-medium">
                Address
              </Text>
              <Text>
                {customerDetails?.location.city} ,{' '}
                {customerDetails?.location.governorate}
              </Text>
            </Space>
          </Row>
          <Row>
            <Col span={12}>
              <Title level={2}>{customerDetails?.NumberOfRequest}</Title>

              <Text className="text-neutral-300 font-medium">
                Total Requests
              </Text>
            </Col>

            <Col span={12}>
              <Title level={2}>{customerDetails?.NumberOfPosts}</Title>

              <Text className="text-neutral-300 font-medium">Posts</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
