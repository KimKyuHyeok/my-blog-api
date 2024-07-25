import AdminPage from '@/views/admin/AdminPage.vue';

const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true }
  }
];

export default adminRoutes;
