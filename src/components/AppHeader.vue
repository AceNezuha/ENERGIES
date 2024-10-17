<template>
  <div class="app-header-wrapper">
    <header class="header">
      <div class="header-content">
        <img src="@/components/leaf.png" alt="Energies" class="logo" />
        <div class="header-text">
          <h1>The sustainable investor for a changing world</h1>
        </div>
        <router-link to="/login" class="login-icon">
          <button class="sign-in-button">
            <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
        </router-link>
      </div>
    </header>
    <nav class="navbar">
      <ul>
        <li><router-link to="/capabilities">Capabilities</router-link></li>
        <li><router-link to="/strategies">Strategies</router-link></li>
        <li><router-link to="/insights">Insights</router-link></li>
        <li><router-link to="/">About Us</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
.app-header-wrapper {
  width: 100%;
}

.header {
  background-color: #004b28;
  color: white;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.header:hover {
  background-color: #003d23;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  height: 50px;
  transition: transform 0.3s ease;
}

.header-text h1 {
  margin-left: 20px;
  font-size: 24px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-icon {
  margin-left: auto;
}

.sign-in-button {
  background-color: #56ab2f;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.sign-in-button i {
  margin-right: 8px;
  font-size: 18px;
}

.sign-in-button:hover {
  background-color: #4caf50;
  transform: scale(1.05);
}

.navbar {
  background-color: #f5f5f5;
  padding: 10px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  width: 100%;
}

.navbar:hover {
  background-color: #e0e0e0;
}

.navbar ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  margin: 0;
}

.navbar a {
  text-decoration: none;
  color: #004b28;
  font-weight: 500;
  padding: 10px 20px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.navbar a:hover {
  color: #2e7d32;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
</style>
