import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/Login.vue';
import UserProfile from '@/pages/UserProfile.vue';
import AdminDashboard from '@/pages/Admin/AdminDashboard.vue';
import Strategies from '@/components/Strategies.vue'; // Import Strategies component from pages directory
import SustainableInvestHomepage from '@/components/SustainableInvestHomepage.vue'; // Import SustainableInvestHomepage from components directory
import Capabilities from '@/components/Capabilities.vue'
import Insights from '@/components/Insights.vue';
import Contact from '@/components/Contact.vue';
import ContactMessages from '@/pages/ContactMessages.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  {
    path: '/profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/contact-messages',
    component: ContactMessages,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/strategies',
    name: 'Strategies',
    component: Strategies,
  },
  {
    path: '/',
    name: 'SustainableInvestHomepage',
    component: SustainableInvestHomepage,
  },
  {
    path: '/capabilities',
    name: 'Capabilities',
    component: Capabilities,
  },
  {
    path: '/insights',
    name: 'Insights',
    component: Insights,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && (!loggedIn || user.role !== 'admin')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
