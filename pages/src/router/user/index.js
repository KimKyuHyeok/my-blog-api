import Home from '@/views/Home';
import PostDetail from '@/views/PostDetail'
import PasswordConfirm from '@/views/admin/PasswordConfirm';


const userRoutes = [
  {
    path: '/password',
    name: 'PasswordConfirm',
    component: PasswordConfirm,
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];


export default userRoutes;
