<template>
  <div class="login-container">
    <div class="background-overlay">
      <img src="@/assets/img/beautiful and serene renewable energy themed wallpaper. The image features a harmonious landscape with wind turbines, solar panels, and a hydroelect.webp" alt="Background Image" class="background-image">
    </div>
    <div class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </div>
    <div class="container" :class="{'right-panel-active': isSignUpActive}">
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1 class="create-account-heading">Create Account</h1>
          <div class="social-container">
            <a href="#" class="social" @click.prevent="redirectToOAuth('facebook')"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social" @click.prevent="redirectToOAuth('google')"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social" @click.prevent="redirectToOAuth('linkedin')"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" v-model="signUpData.name" required/>
          <input type="email" placeholder="Email" v-model="signUpData.email" required/>
          <input type="text" placeholder="Username" v-model="signUpData.username" required/>
          <div class="input-group">
            <input :type="passwordFieldType" placeholder="Password" v-model="signUpData.password" required/>
            <span class="input-group-text" @click="togglePasswordVisibility">
              <i :class="passwordFieldIcon"></i>
            </span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="handleSignIn">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social" @click.prevent="redirectToOAuth('facebook')"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social" @click.prevent="redirectToOAuth('google')"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social" @click.prevent="redirectToOAuth('linkedin')"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="text" placeholder="Username" v-model="signInData.username" required/>
          <div class="input-group">
            <input :type="passwordFieldType" placeholder="Password" v-model="signInData.password" required/>
            <span class="input-group-text" @click="togglePasswordVisibility">
              <i :class="passwordFieldIcon"></i>
            </span>
          </div>
          <button type="submit">Sign In</button>
          <a href="#" @click.prevent="showForgotPasswordModal">Forgot your password?</a>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome To Energies!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn" @click="toggleSignUp(false)">Sign In</button>
            <img src="@/assets/img/undraw_renewable_energy_re.svg" class="image" alt="Welcome Back Icon">
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" @click="toggleSignUp(true)">Sign Up</button>
            <img src="@/assets/img/undraw_sign_up.svg" class="image" alt="Hello Friend Icon">
          </div>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="isForgotPasswordModalVisible" class="modal-overlay" @click="closeForgotPasswordModal">
      <div class="modal-container modal-animate" @click.stop>
        <form @submit.prevent="handleForgotPassword">
          <h1>Forgot Password</h1>
          <input type="email" placeholder="Email" v-model="forgotPasswordData.email" required/>
          <input type="text" placeholder="Secret Key" v-model="forgotPasswordData.secretKey" required/>
          <div class="input-group">
            <input :type="forgotPasswordFieldType" placeholder="New Password" v-model="forgotPasswordData.newPassword" required/>
            <span class="input-group-text" @click="toggleForgotPasswordVisibility">
              <i :class="forgotPasswordFieldIcon"></i>
            </span>
          </div>
          <button type="submit">Reset Password</button>
          <button type="button" @click="closeForgotPasswordModal">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Secret Key Modal -->
    <div v-if="isSecretKeyModalVisible" class="modal-overlay" @click="closeSecretKeyModal">
      <div class="secret-key-modal-container modal-animate" @click.stop>
        <h1>Account Created Successfully!</h1>
        <p>Your secret key is:</p>
        <div class="secret-key-box">
          <strong>{{ secretKey }}</strong>
        </div>
        <button class="copy-button" @click="copySecretKey">
          <i class="fas fa-copy"></i> Copy Secret Key
        </button>
        <p>Please save this key safely. You will need it to reset your password.</p>
        <button type="button" @click="closeSecretKeyModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API = process.env.VUE_APP_API || 'http://localhost:3000';

export default {
  data() {
    return {
      isSignUpActive: false,
      isForgotPasswordModalVisible: false,
      isSecretKeyModalVisible: false,
      secretKey: '',
      signInData: {
        username: '',
        password: ''
      },
      signUpData: {
        name: '',
        email: '',
        username: '',
        password: ''
      },
      forgotPasswordData: {
        email: '',
        secretKey: '',
        newPassword: ''
      },
      passwordFieldType: 'password',
      passwordFieldIcon: 'fas fa-eye',
      forgotPasswordFieldType: 'password',
      forgotPasswordFieldIcon: 'fas fa-eye'
    };
  },
  methods: {
    toggleSignUp(isActive) {
      this.isSignUpActive = isActive;
    },
    showForgotPasswordModal() {
      this.isForgotPasswordModalVisible = true;
    },
    closeForgotPasswordModal() {
      this.isForgotPasswordModalVisible = false;
      this.clearForgotPasswordData();
    },
    showSecretKeyModal(secretKey) {
      this.secretKey = secretKey;
      this.isSecretKeyModalVisible = true;
    },
    closeSecretKeyModal() {
      this.isSecretKeyModalVisible = false;
    },
    clearForgotPasswordData() {
      this.forgotPasswordData.email = '';
      this.forgotPasswordData.secretKey = '';
      this.forgotPasswordData.newPassword = '';
    },
    async handleSignIn() {
      try {
        const response = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.signInData),
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const user = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(user));
        iziToast.success({
          title: 'Success',
          message: 'Login Successful. Welcome back!',
          timeout: 1200,
          position: 'topRight'
        });
        setTimeout(() => {
          this.$router.push(user.role === 'admin' ? '/admin' : '/dashboard');
        }, 1200);
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: 'Error',
          message: 'Login Failed. Please check your credentials and try again.',
          position: 'topRight'
        });
      }
    },
    async handleSignUp() {
      if (!this.isValidEmail(this.signUpData.email)) {
        return iziToast.error({ title: 'Error', message: 'Please enter a valid email address.', position: 'topRight' });
      }
      if (this.signUpData.password.length < 6) {
        return iziToast.error({ title: 'Error', message: 'Password must be at least 6 characters long.', position: 'topRight' });
      }
      try {
        const response = await fetch(`${API}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.signUpData),
        });
        if (!response.ok) throw new Error('Sign up failed');
        const data = await response.json();
        this.showSecretKeyModal(data.secretKey);
        iziToast.success({
          title: 'Success',
          message: 'Sign Up Successful. Please log in to continue.',
          timeout: 2000,
          position: 'topRight'
        });
        setTimeout(() => {
          this.signUpData = { name: '', email: '', username: '', password: '' };
          this.toggleSignUp(false);
        }, 2000);
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: 'Error',
          message: 'Sign Up Failed. Please check your details and try again.',
          position: 'topRight'
        });
      }
    },
    async handleForgotPassword() {
      try {
        const response = await fetch(`${API}/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.forgotPasswordData),
        });
        if (!response.ok) throw new Error('Reset password failed');
        iziToast.success({
          title: 'Success',
          message: 'Password reset successfully. Please log in with your new password.',
          timeout: 2000,
          position: 'topRight'
        });
        setTimeout(() => {
          this.clearForgotPasswordData();
          this.closeForgotPasswordModal();
        }, 2000);
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: 'Error',
          message: 'Reset Password Failed. Please check your details and try again.',
          position: 'topRight'
        });
      }
    },
    goBack() {
      this.$router.push('/');
    },
    redirectToOAuth(provider) {
      let oauthUrl = '';
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
      switch (provider) {
        case 'facebook':
          oauthUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${redirectUri}&scope=email`;
          break;
        case 'google':
          oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile`;
          break;
        case 'linkedin':
          oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress`;
          break;
        default:
          console.error('Unsupported OAuth provider');
      }
      window.location.href = oauthUrl;
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    },
    toggleForgotPasswordVisibility() {
      this.forgotPasswordFieldType = this.forgotPasswordFieldType === 'password' ? 'text' : 'password';
      this.forgotPasswordFieldIcon = this.forgotPasswordFieldType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    },
    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
    copySecretKey() {
      navigator.clipboard.writeText(this.secretKey).then(() => {
        iziToast.success({
          title: 'Success',
          message: 'Secret Key copied to clipboard.',
          position: 'topRight'
        });
      }).catch(err => {
        console.error('Could not copy text: ', err);
        iziToast.error({
          title: 'Error',
          message: 'Failed to copy Secret Key. Please try again.',
          position: 'topRight'
        });
      });
    }
  }
};
</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(to right, #e0f7fa, #e0f2f1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  color: #4caf50;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #4caf50;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background-color 0.3s, color 0.3s;
  z-index: 2;
}

.back-button i {
  margin-right: 8px;
}

.back-button:hover {
  background-color: #4caf50;
  color: white;
}

.container {
  background: #f6f5f7;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 
              0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  z-index: 1;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(to right, #a8e063, #56ab2f);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a .fab.fa-facebook-f {
  color: #3b5998;
}

.social-container a .fab.fa-google-plus-g {
  color: #db4437;
}

.social-container a .fab.fa-linkedin-in {
  color: #0077b5;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.input-group {
  position: relative;
  width: 100%;
}

.input-group input {
  width: 100%;
  padding-right: 40px;
}

.input-group-text {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #56ab2f;
  background-color: #56ab2f;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

h1 {
  font-weight: bold;
  margin: 0;
}

.create-account-heading {
  font-size: 2rem;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.icon, .image {
  width: 50%;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container,
.secret-key-modal-container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 400px;
  max-width: 90%;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-container h1,
.secret-key-modal-container h1 {
  margin-bottom: 1rem;
}

.modal-container input,
.secret-key-modal-container input {
  margin-bottom: 1rem;
}

.modal-container button,
.secret-key-modal-container button {
  margin: 0.5rem;
}

.secret-key-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 1rem 0;
  font-size: 1.1rem;
  max-width: 100%;
  word-break: break-all;
}

.copy-button {
  background: #56ab2f;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    max-width: 100%;
  }

  .overlay-container,
  .overlay {
    display: none;
  }

  .sign-in-container,
  .sign-up-container {
    width: 100%;
  }

  .container.right-panel-active .sign-in-container,
  .container.right-panel-active .sign-up-container {
    transform: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
