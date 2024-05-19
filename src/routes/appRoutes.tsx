import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { APP_PATHS } from '../utils/paths'
import App from '../App'
import { LoginLayout } from '../layouts'
import { Login } from '../pages/Login'

export const appRoutes = createBrowserRouter(
  //TODO: create wrong route error element
  createRoutesFromElements(
    <Route path={APP_PATHS.landing} element={<App />}>
      <Route element={<LoginLayout />}>
        <Route path={APP_PATHS.login} element={<Login />} />
      </Route>
      <Route element={<div>app layout</div>}>
        <Route path={APP_PATHS.transactions} element={<div>transaction</div>} />
        <Route path={APP_PATHS.categories} element={<div>categories</div>} />
        <Route
          path={APP_PATHS.customerProfile}
          element={<div>customer profile</div>}
        />
        <Route path={APP_PATHS.customers} element={<div>customers list</div>} />
        <Route path={APP_PATHS.dashboard} element={<div>dash</div>} />
        <Route path={APP_PATHS.profile} element={<div>dash</div>} />
        <Route
          path={APP_PATHS.postsRequest}
          element={<div>posts requests</div>}
        />
      </Route>
    </Route>
  )
)
