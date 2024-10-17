<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="userProfilePicture" alt="User Profile" class="profile-img"/>
        </div>
      </a>

      <a
        href="DashboardLayout"
        target="_blank"
        class="simple-text logo-normal"
      >
        {{ userName }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";
import apiService from "@/apiService.js";

export default {
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Energies",
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/renewable-energy-investment.webp"),
    },
    sidebarItemColor: {
      type: String,
      default: "green",
      validator: (value) => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userProfilePicture: '',
      userName: '',
    };
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getUserProfile(token);
          const user = response.data;
          this.userProfilePicture = `http://localhost:3000${user.profilePicture}`;
          this.userName = user.name;
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}

.logo-img {
  border-radius: 50%;
  overflow: hidden;
  width: 60px; /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the entire circle */
  transform: scale(1.2); /* Zoom in the image */
  object-position: center; /* Adjust the position if necessary */
}
</style>
