import { UseMutateFunction } from '@tanstack/react-query'
import { FormRule } from 'antd'
import { ChangeEvent } from 'react'
import { AppErrorResponse, DefaultApiResponse } from '../../common/types'

export const validateEnglishNumber: FormRule = {
  validator: (rule, value: string) => {
    if (value && Number.isNaN(Number(value)))
      return Promise.reject(rule.message?.toString())
    return Promise.resolve()
  },
  message: 'Only English Numbers are allowed',
}

export const uploadAdminPhotoHandler = (
  mutateFn: UseMutateFunction<DefaultApiResponse, AppErrorResponse, FormData>,
  { target: { files } }: ChangeEvent<HTMLInputElement>
) => {
  const adminNewImage = files?.[0]

  if (adminNewImage) {
    const formData = new FormData()
    formData.append('image', adminNewImage)

    mutateFn(formData)
  }
}
