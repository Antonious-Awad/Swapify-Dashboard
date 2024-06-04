import { Input as AntdInput, Typography, Flex } from 'antd'
import type { PasswordProps } from 'antd/es/input'
import { Lock } from '../icons'

export const InputPassword = ({
  placeholder,
  variant,
  ...rest
}: PasswordProps) => {
  return (
    <Flex align="start" vertical gap="0.5rem">
      <Typography.Text className="font-semibold">{placeholder}</Typography.Text>
      <AntdInput.Password
        placeholder={placeholder}
        variant={variant || 'borderless'}
        {...rest}
        className="bg-neutral-200"
        type="password"
        prefix={<Lock />}
        classNames={{
          input: 'h-[2.5rem]',
        }}
      />
    </Flex>
  )
}
