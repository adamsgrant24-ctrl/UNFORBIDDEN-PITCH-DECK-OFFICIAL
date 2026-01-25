
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Vision from './components/Vision.tsx';
import Ensemble from './components/Ensemble.tsx';
import Methodology from './components/Methodology.tsx';
import Revenue from './components/Revenue.tsx';
import TechnicalAudit from './components/TechnicalAudit.tsx';
import InvestorBrief from './components/InvestorBrief.tsx';
import Footer from './components/Footer.tsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen selection:bg-white selection:text-black bg-[#050505]">
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
