import { Input as AntdInput } from 'antd'
import { SearchProps } from 'antd/es/input'
import { cn } from '../../common/utils'

export const InputSearch = ({
  variant,
  placeholder,
  allowClear = true,
  className,
  ...rest
}: SearchProps) => (
  <AntdInput.Search
    placeholder={placeholder}
    variant={variant || 'borderless'}
    className={cn('bg-white rounded-[8px] w-[15rem]', className)}
    classNames={{
      input: 'h-[2.5rem]',
    }}
    allowClear={allowClear}
    {...rest}
  />
)
