<template>
    <div>
      <AppHeader />
      <section class="content">
        <h2>Contact</h2>
        <p>
          If you have any questions, feel free to reach out to us. We're here to help!
        </p>
        <div class="contact-section">
          <div class="contact-info">
            <h3>Contact Information</h3>
            <p>Email: info@energies.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Taman Merdeka, Eco City, Malaysia</p>
          </div>
          <div class="contact-form">
            <h3>Send Us a Message</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" required />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="message" required></textarea>
              </div>
              <button type="submit" class="submit-button">Send Message</button>
            </form>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </section>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import axios from 'axios';
  
  export default {
    name: 'Contact',
    components: {
      AppHeader,
      AppFooter,
    },
    data() {
      return {
        name: '',
        email: '',
        message: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post('http://localhost:3000/contact', {
            name: this.name,
            email: this.email,
            message: this.message,
          });
          console.log('Form submitted', response.data);
          this.successMessage = 'Message sent successfully!';
          this.errorMessage = '';
          // Reset form fields
          this.name = '';
          this.email = '';
          this.message = '';
        } catch (error) {
          console.error('Failed to submit form', error);
          this.errorMessage = 'Failed to send message. Please try again later.';
          this.successMessage = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    padding: 40px;
    max-width: 900px;
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
  
  .content p {
    font-size: 18px;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  
  .contact-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .contact-info {
    flex: 1 1 40%;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .contact-form {
    flex: 1 1 50%;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .contact-form h3,
  .contact-info h3 {
    font-size: 24px;
    color: #004b28;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  .submit-button {
    background-color: #56ab2f;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .submit-button:hover {
    background-color: #4caf50;
    transform: scale(1.05);
  }
  
  .success-message {
    color: green;
    margin-top: 20px;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
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
  