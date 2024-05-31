import { UploadFile } from 'antd'

export type CreateCategoryProps = {
  onClose: () => void
}
export type CategoryForm = {
  image: UploadFile[]
  name: string
}
