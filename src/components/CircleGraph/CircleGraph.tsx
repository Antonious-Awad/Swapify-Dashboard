import { Empty, Flex, Typography } from 'antd'
import { CircleGraphProps } from './types'

export const CircleGraph = ({ data }: CircleGraphProps) => {
  const categoryTitleStyle =
    'text-white relative font-medium opacity-[0.8] tracking-[-0.02em] leading-5'
  const categoryCountStyle =
    'text-white text-[1.5rem] relative tracking-[-0.02em] leading-5'

  const perDayStyle =
    'text-white relative tracking-[-0.02em] leading-5 font-medium opacity-[0.5]'

  if (data.length === 0)
    return <Empty description="No Categories to show" className="mt-10" />
  return (
    <div className="mx-1">
      <Flex align="center" justify="center">
        <div className="relative text-center w-[22.375rem]">
          <div className="absolute flex items-center w-[calc(100%-9.625rem)] top-[1.5rem] right-[7.75rem] left-[1.875]  justify-center gap-3xs">
            <div className="w-[12.75rem] relative rounded-[50%] bg-circle-big h-[12.75rem] z-0" />
            <div className="absolute flex items-center m-0 top-[4.25rem] flex-col justify-start gap-9xs z-1">
              <Typography.Text className={categoryTitleStyle}>
                {data[0].category}
              </Typography.Text>
              <Typography.Text className={categoryCountStyle}>
                {data[0].count}
              </Typography.Text>
              <Typography.Text className={perDayStyle}>Per Day</Typography.Text>
            </div>
          </div>
          {data?.[1] && (
            <div className="absolute flex items-center w-[calc(100%-12rem)] top-[7.75rem] right-[1.75rem] left-[10.25rem]  justify-center gap-3xs">
              <div className="w-[10.375rem] relative rounded-[50%] bg-circle-medium h-[10.375rem] z-0" />
              <div className="absolute flex items-center m-0 top-[3.125rem] flex-col justify-start gap-9xs z-1">
                <Typography.Text className={categoryTitleStyle}>
                  {data[1].category}
                </Typography.Text>
                <Typography.Text className={categoryCountStyle}>
                  {data[1].count}
                </Typography.Text>
                <Typography.Text className={perDayStyle}>
                  Per Day
                </Typography.Text>
              </div>
            </div>
          )}
          {data?.[2] && (
            <div className="absolute flex items-center w-[calc(100%-14.625rem)] top-[12.5rem] right-[10.25rem] left-[4.375rem] justify-center gap-3xs">
              <div className="w-[7.75rem] relative rounded-[50%] bg-circle-small h-[7.75rem] z-0" />
              <div className="absolute flex items-center m-0 top-[1.75rem] flex-col justify-start z-1 gap-9xs">
                <Typography.Text className={categoryTitleStyle}>
                  {data[2].category}
                </Typography.Text>
                <Typography.Text className={categoryCountStyle}>
                  {data[2].count}
                </Typography.Text>
                <Typography.Text className={perDayStyle}>
                  Per Day
                </Typography.Text>
              </div>
            </div>
          )}
        </div>
      </Flex>
    </div>
  )
}
