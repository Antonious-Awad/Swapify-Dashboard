import { InputProps, Input as AntdInput, Typography, Flex } from 'antd'

export const Input = ({ variant, placeholder, ...rest }: InputProps) => {
  return (
    <Flex align="start" vertical gap={'0.5rem'}>
      <Typography.Text className="font-semibold">{placeholder}</Typography.Text>
      <AntdInput
        placeholder={placeholder}
        variant={variant || 'borderless'}
        {...rest}
        className="bg-neutral-200"
        classNames={{
          input: 'h-[2.5rem]',
        }}
      />
    </Flex>
  )
}
