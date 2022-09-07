// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'add expense',
    path: '/dashboard/add-expense',
    icon: getIcon('carbon:document-add'),
  },
  {
    title: 'expenses',
    path: '/dashboard/expenses',
    icon: getIcon('icon-park-solid:transaction'),
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon('bxs:report'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
