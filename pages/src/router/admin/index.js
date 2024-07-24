import Admin from '@/views/admin/Main.vue';

const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminPage',
    component: Admin,
    meta: { requiresAuth: true }
  }
];

export default adminRoutes;
