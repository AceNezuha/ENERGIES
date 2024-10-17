<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h3>About Us</h3>
        <p>At Energies, we are committed to promoting sustainable investment practices that contribute to a better world.</p>
      </div>
      <div class="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/capabilities">Capabilities</router-link></li>
          <li><router-link to="/strategies">Strategies</router-link></li>
          <li><router-link to="/insights">Insights</router-link></li>
          <li><router-link to="/">About Us</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
      <div class="footer-section contact">
        <h3>Contact Us</h3>
        <p>Email: info@energies.com</p>
        <p>Phone: +03-3343-4343</p>
        <p>Address: 123 Taman Merdeka, Eco City, Malaysia</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Energies. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #004b28;
  color: white;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin: 10px 20px;
}

.footer-section h3 {
  font-size: 20px;
  margin-bottom: 15px;
  border-bottom: 2px solid white;
  display: inline-block;
  padding-bottom: 5px;
}

.footer-section p, .footer-section ul, .footer-section li {
  margin: 0;
  padding: 0;
}

.footer-section ul {
  list-style: none;
  padding-left: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #2e7d32;
}

.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 10px;
}
</style>
