import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Vision from './components/Vision.tsx';
import Ensemble from './components/Ensemble.tsx';
import Methodology from './components/Methodology.tsx';
import Revenue from './components/Revenue.tsx';
import TechnicalAudit from './components/TechnicalAudit.tsx';
import Prospectus from './components/Prospectus.tsx';
import InvestorBrief from './components/InvestorBrief.tsx';
import Footer from './components/Footer.tsx';
import Terminal from './components/Terminal.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const triggerSync = () => {
    setIsSyncing(true);
    setSyncComplete(false);
  };

  const handleSyncComplete = () => {
    setIsSyncing(false);
    setSyncComplete(true);
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-black bg-[#050505]">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSyncTrigger={triggerSync}
        isSyncComplete={syncComplete}
      />
      
      <main className="pt-20">
        <Hero />
        <Vision />
        <Ensemble />
        <Methodology />
        <TechnicalAudit />
        <Revenue />
        <Prospectus isSyncComplete={syncComplete} />
        <InvestorBrief />
      </main>

      <Footer isSyncComplete={syncComplete} />

      <Terminal 
        isOpen={isSyncing} 
        onClose={() => setIsSyncing(false)} 
        onComplete={handleSyncComplete}
      />
    </div>
  );
};

export default App;