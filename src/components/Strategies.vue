<template>
    <div class="strategies-page">
      <AppHeader />
      <section class="content">
        <h2>Strategies</h2>
        <p>
          At Energies, we employ a range of strategies to ensure sustainable and profitable investments.
        </p>
        <div class="strategy-section">
          <h3>ESG Integration</h3>
          <p>
            We integrate Environmental, Social, and Governance (ESG) factors into our investment process to identify risks and opportunities.
          </p>
        </div>
        <div class="strategy-section">
          <h3>Impact Investing</h3>
          <p>
            Our impact investing strategy aims to generate positive, measurable social and environmental impacts alongside financial returns.
          </p>
        </div>
        <div class="strategy-section">
          <h3>Thematic Investing</h3>
          <p>
            We focus on long-term investment themes such as clean energy, sustainable agriculture, and healthcare innovation.
          </p>
        </div>
        <div class="strategy-section">
          <h3>Engagement and Stewardship</h3>
          <p>
            We actively engage with the companies we invest in to promote sustainable practices and improve long-term performance.
          </p>
        </div>
        <div class="infographic">
          <h3>Our Investment Strategy Process</h3>
          <img src="@/assets/img/investment-strategy-process.jpg" alt="Investment Strategy Process" />
        </div>
      </section>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  
  export default {
    name: 'Strategies',
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
  
  .strategy-section {
    margin-top: 30px;
  }
  
  .strategy-section h3 {
    font-size: 28px;
    color: #004b28;
    margin-bottom: 10px;
  }
  
  .strategy-section p {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .infographic {
    margin-top: 40px;
    text-align: center;
  }
  
  .infographic h3 {
    font-size: 28px;
    color: #004b28;
    margin-bottom: 20px;
  }
  
  .infographic img {
    max-width: 100%;
    height: auto;
    border: 2px solid #004b28;
    border-radius: 8px;
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
  