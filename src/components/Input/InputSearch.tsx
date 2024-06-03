import { Input as AntdInput } from 'antd'
import { SearchProps } from 'antd/es/input'
export const InputSearch = ({
  variant,
  placeholder,
  allowClear = true,
  ...rest
}: SearchProps) => {
  return (
    <AntdInput.Search
      placeholder={placeholder}
      variant={variant || 'borderless'}
      className="bg-white rounded-[8px] w-[15rem]"
      classNames={{
        input: 'h-[2.5rem]',
      }}
      allowClear={allowClear}
      {...rest}
    />
  )
}
