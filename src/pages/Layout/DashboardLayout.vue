<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <!-- Conditionally render side bar based on user role -->
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      
      <template v-if="user && user.role === 'user'">
        <!-- User-specific sidebar links -->
        <sidebar-link to="/dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <sidebar-link to="/user">
          <md-icon>person</md-icon>
          <p>User Profile</p>
        </sidebar-link>
        <sidebar-link to="/stocklist">
          <md-icon>content_paste</md-icon>
          <p>Stock List</p>
        </sidebar-link>
        <sidebar-link to="/notifications">
          <md-icon>notifications</md-icon>
          <p>Notifications</p>
        </sidebar-link>
        <sidebar-link to="/invest">
          <md-icon>account_balance</md-icon>
          <p>Invest</p>
        </sidebar-link>
        <sidebar-link to="/wallet">
          <md-icon>account_balance_wallet</md-icon>
          <p>Wallet</p>
        </sidebar-link>
      </template>

      <template v-if="user && user.role === 'admin'">
        <!-- Admin-specific sidebar links -->
        <sidebar-link to="/admin">
          <md-icon>admin_panel_settings</md-icon>
          <p>Admin Dashboard</p>
        </sidebar-link>
        <sidebar-link to="/user">
          <md-icon>person</md-icon>
          <p>User Profile</p>
        </sidebar-link>
        <sidebar-link to="/contact-messages">
          <md-icon>mail</md-icon>
          <p>Contact Messages</p>
        </sidebar-link>
      </template>

      <sidebar-link to="/" class="active-pro">
        <md-icon>logout</md-icon>
        <p>Log out</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <!-- Conditionally render top navbar based on user role -->
      <top-navbar v-if="user && user.role !== 'admin'"></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <router-view></router-view>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/renewable-energy-investment.webp"),
      user: null,
    };
  },

  mounted() {
    // Fetch the user data from localStorage or an API call
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  },
};
</script>
