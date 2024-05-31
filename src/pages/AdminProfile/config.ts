import { FormRule } from 'antd'

export const validateEnglishNumber: FormRule = {
  validator: (rule, value: string) => {
    if (value && Number.isNaN(Number(value)))
      return Promise.reject(rule.message?.toString())
    return Promise.resolve()
  },
  message: 'Only English Numbers are allowed',
}
