import { Image } from 'antd'
import { AvatarProps } from './types'
import { cn } from '../../common/utils'

export const Avatar = ({ src, size, className }: AvatarProps) => (
  <Image
    src={src}
    width={size}
    height={size}
    className={cn('rounded-full object-cover', className)}
    preview={{
      maskClassName: 'rounded-full',
    }}
  />
)
