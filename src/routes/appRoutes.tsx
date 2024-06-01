import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { APP_PATHS } from '../utils/paths'
import App from '../App'
import { AppLayout, LoginLayout } from '../layouts'
import { Login } from '../pages/Login'
import { Transactions } from '../pages/Transactions'
import { CustomerList, CustomerProfile } from '../pages/Customer'
import { CategoriesList } from '../pages/Categories/CategoriesList'
import { AdminProfile } from '../pages/AdminProfile'
import { PostsRequests } from '../pages/PostsRequests'

export const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={APP_PATHS.landing} element={<App />}>
      <Route element={<LoginLayout />}>
        <Route path={APP_PATHS.login} element={<Login />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path={APP_PATHS.transactions} element={<Transactions />} />
        <Route path={APP_PATHS.categories} element={<CategoriesList />} />
        <Route path={APP_PATHS.customerProfile} element={<CustomerProfile />} />
        <Route path={APP_PATHS.customers} element={<CustomerList />} />
        <Route path={APP_PATHS.dashboard} element={<div>dash</div>} />
        <Route path={APP_PATHS.profile} element={<AdminProfile />} />
        <Route path={APP_PATHS.postsRequest} element={<PostsRequests />} />
      </Route>
    </Route>
  )
)
