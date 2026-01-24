
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Ensemble from './components/Ensemble';
import Methodology from './components/Methodology';
import Revenue from './components/Revenue';
import TechnicalAudit from './components/TechnicalAudit';
import InvestorBrief from './components/InvestorBrief';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-20">
        <Hero />
        <Vision />
        <Ensemble />
        <Methodology />
        <TechnicalAudit />
        <Revenue />
        <InvestorBrief />
      </main>

      <Footer />
    </div>
  );
};

export default App;
