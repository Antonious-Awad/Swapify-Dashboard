import { App as AppAntd } from 'antd'
import { Outlet } from 'react-router-dom'

const App = () => (
  <AppAntd>
    <Outlet />
  </AppAntd>
)

export default App
