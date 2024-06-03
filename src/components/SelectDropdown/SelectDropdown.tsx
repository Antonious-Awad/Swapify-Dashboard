import { Select, SelectProps } from 'antd'

export const SelectDropdown = ({
  placeholder,
  variant,
  allowClear = true,
  ...props
}: SelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      variant={variant || 'borderless'}
      allowClear={allowClear}
      className="bg-white rounded-[8px] w-[15rem] h-[3rem]"
      {...props}
    />
  )
}
