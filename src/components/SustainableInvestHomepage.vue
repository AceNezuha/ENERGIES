<template>
  <div class="sustainable-investing">
    <AppHeader />
    <section class="content">
      <h2>Sustainable investing</h2>
      <div class="icon-row">
        <div class="icon-item">
          <i class="fas fa-leaf"></i>
          <p>Environmental Sustainability</p>
        </div>
        <div class="icon-item">
          <i class="fas fa-chart-line"></i>
          <p>ESG Integration</p>
        </div>
        <div class="icon-item">
          <i class="fas fa-handshake"></i>
          <p>Responsible Business</p>
        </div>
      </div>
      <p>
        At Energies, our goal is to adopt a sustainable approach across our investment strategies. Our approach is built on six pillars, the core of which is ESG integration,
        investment stewardship (voting and engagement), a responsible business conduct policy and
        sector-based exclusions, and a forward-looking perspective (the ‘3Es’: energy transition,
        environmental sustainability, and equality and inclusive growth).
      </p>
      <div class="chart-container">
        <InvestmentChart />
      </div>
      <h3>Why invest with a sustainable approach</h3>
      <p>
        Investing with a sustainable approach can be financially rewarding by, for example, steering clear
        of companies that are exposed to pollution lawsuits, labour unrest, shareholder disputes or other
        events that can damage their reputation and business performance.
      </p>
      <div class="additional-content">
        <div class="quote">
          <p>"Sustainable investing is not just about creating value, it's about creating a better world." - Industry Leader</p>
        </div>
        <div class="stats">
          <h3>Key Statistics</h3>
          <p>ESG investments have grown by 35% in the past five years.</p>
          <p>Companies with strong ESG practices have shown 20% higher returns.</p>
        </div>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import InvestmentChart from './InvestmentChart.vue';

export default {
  name: 'SustainableInvestHomepage',
  components: {
    AppHeader,
    AppFooter,
    InvestmentChart,
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

.icon-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.icon-item {
  text-align: center;
}

.icon-item i {
  font-size: 48px;
  color: #56ab2f;
  margin-bottom: 10px;
}

.content h3 {
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
}

.content p {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.6;
}

.chart-container {
  margin-top: 40px;
  text-align: center;
}

.additional-content {
  margin-top: 40px;
}

.quote {
  background-color: #e8f5e9;
  padding: 20px;
  border-left: 5px solid #56ab2f;
  font-style: italic;
  margin-bottom: 20px;
}

.stats {
  background-color: #fff3e0;
  padding: 20px;
  border-left: 5px solid #ffb74d;
}

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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
