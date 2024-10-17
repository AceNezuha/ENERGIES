import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import StockList from "@/pages/StockList.vue";
import Notifications from "@/pages/Notifications.vue";
import Invest from "@/pages/Invest.vue";
import SustainableInvestHomepage from "@/components/SustainableInvestHomepage.vue";
import Login from '@/pages/Login.vue'; 
import Wallet from '@/pages/Wallet.vue'; 
import AdminDashboard from '@/pages/AdminDashboard.vue';
import Strategies from '@/components/Strategies.vue'; 
import Capabilities from '@/components/Capabilities.vue'
import Insights from '@/components/Insights.vue';
import Contact from '@/components/Contact.vue';
import ContactMessages from '@/pages/ContactMessages.vue';

const routes = [
  {
    path: "/",
    name: "SustainableInvestHomepage",
    component: SustainableInvestHomepage,
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "admin",
        name: "Admin",
        component: AdminDashboard,
      },
      {
        path: "contact-messages",
        name: "ContactMessages",
        component: ContactMessages,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      {
        path: "stocklist",
        name: "Stock List",
        component: StockList,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "invest",
        name: "Invest",
        component: Invest,
      },
      {
        path: "wallet",
        name: "Wallet",
        component: Wallet,
      },
      
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/strategies',
    name: 'Strategies',
    component: Strategies,
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

export default routes;
