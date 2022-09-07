import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import SharedLayouts from './pages/SharedLayouts';
import Protected from './pages/Protected';
import AddExpense from './pages/AddExpense';
import Reports from './pages/Reports';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'expenses',
          element: (
            <Protected>
              {' '}
              <User />{' '}
            </Protected>
          ),
        },
        {
          path: 'products',
          element: (
            <Protected>
              {' '}
              <Products />{' '}
            </Protected>
          ),
        },
        {
          path: 'add-expense',
          element: (
            <Protected>
              {' '}
              <AddExpense />{' '}
            </Protected>
          ),
        },
        {
          path: 'reports',
          element: (
            <Protected>
              {' '}
              <Reports />{' '}
            </Protected>
          ),
        },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <Login />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
