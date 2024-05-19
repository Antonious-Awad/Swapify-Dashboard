import { Form } from 'antd'
export const Login = () => {
  const [form] = Form.useForm()

  return (
    <div className="absolute">
      <div className="text-danger-300">form</div>
      <div>dialog</div>
    </div>
  )
}
