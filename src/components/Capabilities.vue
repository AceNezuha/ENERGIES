<template>
    <div class="capabilities-page">
      <AppHeader />
      <section class="content">
        <h2>Capabilities</h2>
        <p>
          At Energies, our goal is to adopt a sustainable approach across our investment strategies. Our approach is built on six pillars, the core of which is ESG integration,
          investment stewardship (voting and engagement), a responsible business conduct policy and
          sector-based exclusions, and a forward-looking perspective (the ‘3Es’: energy transition,
          environmental sustainability, and equality and inclusive growth).
        </p>
        <div class="pillars">
          <div class="pillar">
            <h3>Environmental Sustainability</h3>
            <p>
              We are committed to minimizing environmental impact through sustainable practices and investment in clean energy technologies.
            </p>
          </div>
          <div class="pillar">
            <h3>ESG Integration</h3>
            <p>
              Integrating Environmental, Social, and Governance (ESG) factors into our investment decisions to ensure long-term sustainability.
            </p>
          </div>
          <div class="pillar">
            <h3>Responsible Business Conduct</h3>
            <p>
              Promoting ethical business practices and ensuring our investments align with our values and principles.
            </p>
          </div>
          <div class="pillar">
            <h3>Sector-Based Exclusions</h3>
            <p>
              Avoiding investments in sectors that do not align with our sustainability goals, such as fossil fuels and tobacco.
            </p>
          </div>
          <div class="pillar">
            <h3>Investment Stewardship</h3>
            <p>
              Engaging with companies to promote sustainable practices and responsible governance.
            </p>
          </div>
          <div class="pillar">
            <h3>Forward-Looking Perspective</h3>
            <p>
              Anticipating and preparing for future trends in energy transition, sustainability, and inclusive growth.
            </p>
          </div>
        </div>
      </section>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  
  export default {
    name: 'Capabilities',
    components: {
      AppHeader,
      AppFooter,
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .header {
    background-color: #004b28;
    color: white;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  
  .header:hover {
    background-color: #003d23;
  }
  
  .header-content {
    display: flex;
    align-items: center;
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
    margin-right: 20px;
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
  
  .content {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
    animation: fadeIn 1s ease-in-out;
  }
  
  .content h2 {
    font-size: 36px;
    font-weight: 700;
    border-bottom: 3px solid #333;
    padding-bottom: 10px;
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
  }
  
  .content h2:hover {
    border-color: #004b28;
  }
  
  .pillars {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
  }
  
  .pillar {
    flex: 1;
    min-width: 250px;
    margin: 15px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .pillar h3 {
    font-size: 24px;
    color: #004b28;
    margin-bottom: 10px;
  }
  
  .pillar p {
    font-size: 16px;
    line-height: 1.6;
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
  