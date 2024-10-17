<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Notifications</h4>
            <p class="category">Stocks Notifications!</p>
          </md-card-header>
          <md-card-content>
            <transition-group name="fade" tag="div" class="notification-cards">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-card"
                :class="{
                  'positive': notification.change > 0,
                  'negative': notification.change < 0,
                }"
              >
                <div class="notification-header">
                  <div class="notification-icon">
                    <i :class="notification.icon"></i>
                  </div>
                  <div class="notification-title">{{ notification.title }}</div>
                  <div class="notification-close" @click="removeNotification(notification.id)">x</div>
                </div>
                <div class="notification-content">
                  {{ notification.content }}
                  <span
                    :class="{
                      'positive-change': notification.change > 0,
                      'negative-change': notification.change < 0
                    }"
                  >
                    ({{ notification.change > 0 ? '+' : '' }}{{ notification.change }}%)
                  </span>
                  <div class="notification-timestamp">{{ notification.timestamp }}</div>
                </div>
              </div>
            </transition-group>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        { id: 1, title: 'Stock Update', content: 'Tesla stock price increased by', change: 2, icon: 'fas fa-arrow-up', timestamp: '10 minutes ago' },
        { id: 2, title: 'Stock Update', content: 'NextEra Energy stock price decreased by', change: -1.5, icon: 'fas fa-arrow-down', timestamp: '20 minutes ago' },
        { id: 3, title: 'Stock Update', content: 'Enphase Energy stock price remained stable.', change: 0, icon: 'fas fa-equals', timestamp: '30 minutes ago' },
        { id: 4, title: 'Stock Update', content: 'Brookfield Renewable Partners stock price increased by', change: 3, icon: 'fas fa-arrow-up', timestamp: '40 minutes ago' },
      ],
    };
  },
  methods: {
    removeNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    },
  },
  created() {
    // Make sure the notifications array is shared globally
    this.$root.notifications = this.notifications;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.notification-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-card {
  background: #f7f7f7;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.notification-card-leave-active {
  animation: fadeOut 0.5s forwards;
}

.notification-card.positive {
  border-left: 4px solid green;
}

.notification-card.negative {
  border-left: 4px solid red;
}

.notification-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-icon {
  margin-right: 8px;
}

.notification-title {
  font-weight: 600;
  flex-grow: 1;
}

.notification-close {
  cursor: pointer;
  color: red;
}

.notification-content {
  margin-top: 8px;
}

.notification-content .positive-change {
  color: green;
}

.notification-content .negative-change {
  color: red;
}

.notification-timestamp {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .notification-cards {
    padding: 8px;
  }

  .notification-card {
    padding: 12px;
  }

  .notification-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .notification-title {
    margin-bottom: 8px;
  }
}
</style>
