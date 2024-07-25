import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from '@/router/user/index';
import adminRoutes from '@/router/admin/index';
// import axios from 'axios';

const routes = [
  ...userRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// router.beforeEach(async (to, from, next) => {
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//     if (requiresAuth) {
//         try {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 next({path: '/password'});
//             } else {
//                 await axios.get('/api/admin', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 next();
//             }
//         } catch (error) {
//             localStorage.removeItem('token');
//             next({path: '/password'});
//         }
//     } else {
//         next();
//     }
// });

export default router;
