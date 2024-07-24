const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/PasswordConfirm'),
    meta: { requiresAuth: true }
  }
];

export default adminRoutes;
