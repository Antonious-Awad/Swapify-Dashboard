import { PostRequestItem, RangeOptions } from './types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const statusColor: Record<PostRequestItem['status'], string> = {
  pending: 'text-warning-300',
  expired: 'text-danger-300',
  rejected: 'text-danger-400',
  accepted: 'text-success-300',
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const rangeOptions: { value: RangeOptions; label: string }[] = [
  {
    value: '3_months',
    label: '3 Months',
  },
  {
    value: '6_months',
    label: '6 Months',
  },
  {
    value: '9_months',
    label: '9 Months',
  },
  {
    value: '12_months',
    label: '12 Months',
  },
]
