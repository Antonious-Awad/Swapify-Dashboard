import { PostRequestItem } from './types'
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
