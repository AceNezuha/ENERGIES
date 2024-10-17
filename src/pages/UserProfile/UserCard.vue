<template>
  <md-card class="user-card">
    <div class="user-card-header">
      <img class="user-avatar" :src="fullImagePath" />
      <div class="user-info">
        <h3>{{ userName }}</h3>
        <p>{{ userTitle }}</p>
        <blockquote>{{ userQuote }}</blockquote>
      </div>
    </div>
  </md-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/user2.png"),
    },
    userName: {
      type: String,
      default: '',
    },
    userTitle: {
      type: String,
      default: '',
    },
    userQuote: {
      type: String,
      default: 'Edit your bio',
    },
  },
  computed: {
    fullImagePath() {
      return this.cardUserImage.startsWith('/uploads')
        ? `http://localhost:3000${this.cardUserImage}`
        : this.cardUserImage;
    }
  }
};
</script>


<style scoped>
.user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.user-card-header {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
}

.user-info {
  flex-grow: 1;
}

.user-info h3 {
  margin: 0;
  font-size: 1.25rem;
}

.user-info p {
  margin: 4px 0;
  color: #888;
}

.user-info blockquote {
  margin: 0;
  font-style: italic;
  color: #555;
}
</style>
