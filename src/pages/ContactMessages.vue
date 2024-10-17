<template>
    <section class="content">
      <h2>Contact Messages</h2>
      <p v-if="loading">Loading messages...</p>
      <div v-if="!loading && messages.length === 0">No messages found.</div>
      <div v-if="!loading && messages.length > 0" class="messages">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="message in messages" :key="message._id">
                <td>{{ message.name }}</td>
                <td>{{ message.email }}</td>
                <td>{{ message.message }}</td>
                <td>{{ formatDate(message.date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactMessages',
  data() {
    return {
      messages: [],
      loading: true,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/contact/messages');
      this.messages = response.data;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.content {
  padding: 40px;
  max-width: 100%;
  margin: 0 auto;
  animation: fadeIn 1s ease-in-out;
}

.content h2 {
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #004b28;
  border-bottom: 2px solid #004b28;
}

.table-container {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #004b28;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

tbody td {
  font-size: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
