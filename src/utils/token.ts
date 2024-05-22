export const storeSessionsToken = (token: string) =>
  sessionStorage.setItem('token', token)

export const getSessionsToken = () => sessionStorage.getItem('token')

export const removeSessionsToken = () => sessionStorage.removeItem('token')

export const checkValidToken = () => {
  const token = sessionStorage.getItem('token')
  return !!token
}
