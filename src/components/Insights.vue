<template>
    <div>
      <AppHeader />
      <section class="content">
        <h2>Insights</h2>
        <p>
          At Energies, we believe in the power of knowledge and staying informed. Our insights section provides the latest research, analysis, and thought leadership on sustainable investing and market trends.
        </p>
        <div class="insights-sections">
          <div class="insight-section">
            <img src="@/assets/img/market-analysis.png" alt="Market Analysis" />
            <h3>Market Analysis</h3>
            <p>
              Our team of experts analyzes market trends and provides in-depth reports on the current state of the market, highlighting key opportunities and risks.
            </p>
          </div>
          <div class="insight-section">
            <img src="@/assets/img/research-reports.jpg" alt="Research Reports" />
            <h3>Research Reports</h3>
            <p>
              We publish comprehensive research reports on various topics related to sustainable investing, including ESG factors, impact investing, and more.
            </p>
          </div>
          <div class="insight-section">
            <img src="@/assets/img/thought-leadership.jpg" alt="Thought Leadership" />
            <h3>Thought Leadership</h3>
            <p>
              Our thought leadership articles offer expert opinions and perspectives on the future of sustainable investing and the evolving market landscape.
            </p>
          </div>
          <div class="insight-section">
            <img src="@/assets/img/case-studies.jpg" alt="Case Studies" />
            <h3>Case Studies</h3>
            <p>
              Explore real-world case studies showcasing successful sustainable investment strategies and their impact on the market and communities.
            </p>
          </div>
        </div>
        <div class="recent-articles">
          <h3>Recent Articles</h3>
          <ul>
            <li><a href="#">The Future of ESG Investing</a></li>
            <li><a href="#">How Renewable Energy is Transforming Markets</a></li>
            <li><a href="#">Top 10 Sustainable Investment Strategies</a></li>
            <li><a href="#">Impact of Climate Change on Financial Markets</a></li>
          </ul>
        </div>
      </section>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  
  export default {
    name: 'Insights',
    components: {
      AppHeader,
      AppFooter,
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
  
  .content p {
    font-size: 18px;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  
  .insights-sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }
  
  .insight-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(50% - 20px);
    text-align: center;
  }
  
  .insight-section img {
    width: 300px;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .insight-section h3 {
    font-size: 24px;
    color: #004b28;
    margin-bottom: 10px;
  }
  
  .insight-section p {
    font-size: 16px;
    line-height: 1.5;
  }
  
  .recent-articles {
    margin-top: 40px;
  }
  
  .recent-articles h3 {
    font-size: 28px;
    color: #004b28;
    margin-bottom: 20px;
  }
  
  .recent-articles ul {
    list-style: none;
    padding: 0;
  }
  
  .recent-articles li {
    margin-bottom: 10px;
  }
  
  .recent-articles a {
    text-decoration: none;
    color: #004b28;
    font-size: 18px;
    transition: color 0.3s;
  }
  
  .recent-articles a:hover {
    color: #2e7d32;
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
  