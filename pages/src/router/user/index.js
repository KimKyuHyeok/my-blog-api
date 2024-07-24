import Home from '@/views/Home';
import PostDetail from '@/views/PostDetail'
import PasswordConfirm from '@/views/admin/PasswordConfirm';


const userRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail
  },
  {
    path: '/password',
    name: 'PasswordConfirm',
    component: PasswordConfirm
  },
];


export default userRoutes;
