import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TitleWithMoreDetailsProps } from './types'

export const TitleWithMoreDetails = ({
  title,
  moreDetailsPath,
}: TitleWithMoreDetailsProps) => {
  const navigate = useNavigate()
  return (
    <Flex justify="space-between" className="mb-4">
      <Typography.Text className="font-semibold text-[18px]">
        {title}
      </Typography.Text>
      <Button type="link" onClick={() => navigate(moreDetailsPath)}>
        <Typography.Text className="text-brand-200 font-medium text-[14px]">
          More Details
        </Typography.Text>
      </Button>
    </Flex>
  )
}
