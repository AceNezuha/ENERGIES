<template>
  <div class="profile-container">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">My Profile</h4>
        <p class="category">Biodata!</p>
      </md-card-header>
      <md-card-content>
        <div class="profile-section">
          <user-card :cardUserImage="user.profilePicture" :userName="`${user.firstName} ${user.lastName}`" :userQuote="user.bio" />
          <div class="section-header">
            <h3>Personal Information</h3>
            <md-button class="md-icon-button md-primary" @click="editPersonalInfo">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="section-content">
            <div class="info-item">
              <label>First Name</label>
              <span>{{ user.firstName }}</span>
            </div>
            <div class="info-item">
              <label>Last Name</label>
              <span>{{ user.lastName }}</span>
            </div>
            <div class="info-item">
              <label>Email Address</label>
              <span>{{ user.email }}</span>
            </div>
            <div class="info-item">
              <label>Phone</label>
              <span>{{ user.phone }}</span>
            </div>
            <div class="info-item">
              <label>Bio</label>
              <span>{{ user.bio }}</span>
            </div>
          </div>
        </div>
        <div class="profile-section">
          <div class="section-header">
            <h3>Address</h3>
            <md-button class="md-icon-button md-primary" @click="editAddress">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="section-content">
            <div class="info-item">
              <label>Country</label>
              <span>{{ user.country }}</span>
            </div>
            <div class="info-item">
              <label>City/State</label>
              <span>{{ user.cityState }}</span>
            </div>
            <div class="info-item">
              <label>Postal Code</label>
              <span>{{ user.postalCode }}</span>
            </div>
            <div class="info-item">
              <label>TAX ID</label>
              <span>{{ user.taxId }}</span>
            </div>
          </div>
        </div>
        <div class="profile-section">
          <div class="section-header">
            <h3>Profile Picture</h3>
            <div class="file-input-container">
              <md-button class="md-raised md-primary" @click="triggerFileInput">
                <md-icon>cloud_upload</md-icon>
                <span>Choose File</span>
              </md-button>
              <input type="file" class="file-input" ref="fileInput" @change="handleFileUpload" />
              <span class="file-name">{{ selectedFileName }}</span>
            </div>
            <md-button class="md-raised md-primary" @click="uploadProfilePicture">
              <md-icon>cloud_upload</md-icon>
              <span>Upload Picture</span>
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <md-dialog :md-active.sync="isEditingPersonalInfo" class="centered-dialog">
      <md-dialog-title>Edit Personal Information</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>First Name</label>
          <md-input v-model="user.firstName" />
        </md-field>
        <md-field>
          <label>Last Name</label>
          <md-input v-model="user.lastName" />
        </md-field>
        <md-field>
          <label>Email Address</label>
          <md-input v-model="user.email" />
        </md-field>
        <md-field>
          <label>Phone</label>
          <md-input v-model="user.phone" />
        </md-field>
        <md-field>
          <label>Bio</label>
          <md-textarea v-model="user.bio" />
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="savePersonalInfo">Save</md-button>
        <md-button @click="isEditingPersonalInfo = false">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="isEditingAddress" class="centered-dialog">
      <md-dialog-title>Edit Address</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Country</label>
          <md-input v-model="user.country" />
        </md-field>
        <md-field>
          <label>City/State</label>
          <md-input v-model="user.cityState" />
        </md-field>
        <md-field>
          <label>Postal Code</label>
          <md-input v-model="user.postalCode" />
        </md-field>
        <md-field>
          <label>TAX ID</label>
          <md-input v-model="user.taxId" />
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="saveAddress">Save</md-button>
        <md-button @click="isEditingAddress = false">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import UserCard from "@/pages/UserProfile/UserCard.vue";
import apiService from "@/apiService.js"; // Import the apiService

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bio: "",
        country: "",
        cityState: "",
        postalCode: "",
        taxId: "",
        profilePicture: "", // Add this line
      },
      isEditingPersonalInfo: false,
      isEditingAddress: false,
      selectedFile: null, // Add this line
      selectedFileName: "", // Add this line
    };
  },
  methods: {
    async fetchUserProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getUserProfile(token);
          this.user = response.data;
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    },
    editPersonalInfo() {
      this.isEditingPersonalInfo = true;
    },
    async savePersonalInfo() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await apiService.updateUserProfile(token, this.user);
          this.isEditingPersonalInfo = false;
        } catch (error) {
          console.error("Failed to save personal info:", error);
        }
      }
    },
    editAddress() {
      this.isEditingAddress = true;
    },
    async saveAddress() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await apiService.updateUserProfile(token, this.user);
          this.isEditingAddress = false;
        } catch (error) {
          console.error("Failed to save address:", error);
        }
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile ? this.selectedFile.name : "";
    },
    async uploadProfilePicture() {
      const token = localStorage.getItem("token");
      if (token && this.selectedFile) {
        const formData = new FormData();
        formData.append('profilePicture', this.selectedFile);

        try {
          const response = await apiService.uploadProfilePicture(token, formData);
          this.user.profilePicture = response.data.profilePicture;
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
        }
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    }
  },
  mounted() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.profile-container {
  padding: 24px;
  font-family: 'Roboto', sans-serif;
}

.md-card {
  margin-bottom: 24px;
}

.profile-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-content {
  display: flex;
  flex-wrap: wrap;
}

.info-item {
  flex: 1 1 45%;
  margin-bottom: 16px;
}

.info-item label {
  display: block;
  font-weight: bold;
  color: #333;
}

.info-item span {
  display: block;
  margin-top: 4px;
  color: #555;
}

.md-icon-button {
  position: relative;
  top: -4px;
}

.md-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}

.md-dialog-title {
  background-color: #4caf50;
  color: #fff;
}

.centered-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.file-input-container {
  display: flex;
  align-items: center;
}

.file-input {
  display: none;
}

.file-name {
  margin-left: 16px;
  color: #555;
}

.md-button span {
  margin-left: 8px;
}
</style>
