import { PostRequestItem } from './types'

export const statusColor: Record<PostRequestItem['status'], string> = {
  pending: 'text-warning-300',
  expired: 'text-danger-300',
  rejected: 'text-danger-400',
  accepted: 'text-success-300',
}
