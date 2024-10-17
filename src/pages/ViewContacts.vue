<template>
    <div class="content">
      <h2>Contact Messages</h2>
      <table class="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact._id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ViewContacts',
    data() {
      return {
        contacts: [],
      };
    },
    mounted() {
      this.fetchContacts();
    },
    methods: {
      async fetchContacts() {
        try {
          const response = await axios.get('http://localhost:3000/admin/contacts');
          this.contacts = response.data;
        } catch (error) {
          console.error('Failed to fetch contacts', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    padding: 40px;
    max-width: 1100px;
    margin: 0 auto;
    animation: fadeIn 1s ease-in-out;
  }
  
  .content h2 {
    font-size: 36px;
    font-weight: 700;
    border-bottom: 3px solid #004b28;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .contact-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .contact-table th, .contact-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .contact-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .contact-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  