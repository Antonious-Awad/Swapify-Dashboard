import { Button, Flex, Form } from 'antd'
import { Email } from '../../components/icons'
import { Input } from '../../components/Input/'
import { InputPassword } from '../../components/Input'
import { LoginResponse, login, type LoginRequest } from '../../api/login'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useModal } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../../utils/paths'
import { storeSessionsToken } from '../../utils/token'
import { AppErrorResponse } from '../../common/types'

export const LoginForm = () => {
  const [form] = Form.useForm()

  const { activateModal } = useModal()
  const navigate = useNavigate()

  const { mutate: loginMutate, isPending: isLoggingIn } = useMutation<
    AxiosResponse<LoginResponse>,
    AppErrorResponse,
    LoginRequest
  >({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: (response) => {
      storeSessionsToken(response.data.token)
      navigate(APP_PATHS.dashboard)
    },
    onError: (err) =>
      activateModal('danger', err.response?.data.message || 'Login Failed'),
  })

  const handleOnSubmit = (data: LoginRequest) => {
    loginMutate(data)
  }
  return (
    <>
      <div className="w-full flex justify-center my-3 flex-col">
        <div className="font-semibold">Welcome Back</div>
        <div className="text-brand-300 text-[1rem]">Sign in to continue</div>
      </div>
      <Flex vertical align="center" className="w-full">
        <Form form={form} onFinish={handleOnSubmit} className="w-[75%]">
          <Form.Item
            name={'email'}
            messageVariables={{ label: 'Email' }}
            rules={[{ required: true, type: 'email' }]}
          >
            <Input
              name="email"
              placeholder="Email"
              prefix={<Email />}
              type="email"
            />
          </Form.Item>
          <Form.Item
            name={'password'}
            messageVariables={{ label: 'Password' }}
            rules={[{ required: true }]}
          >
            <InputPassword name="password" placeholder="Password" />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className="w-[75%] h-[3.5rem] my-[1rem] font-semibold"
            loading={isLoggingIn}
          >
            <span className="text-[1.375rem]">Login</span>
          </Button>
        </Form>
      </Flex>
    </>
  )
}
