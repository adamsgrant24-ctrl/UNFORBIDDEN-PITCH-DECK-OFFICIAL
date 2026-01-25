
import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const InvestorBrief = () => {
  const [boardroomImage, setBoardroomImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const img = await generateCinematicImage(
          "A minimalist luxury penthouse boardroom at dusk, floor-to-ceiling glass windows overlooking a dark city, 35mm cinematic lighting, cold blue tones"
        );
        setBoardroomImage(img);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, []);

  return (
    <section id="investor" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {boardroomImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none transition-opacity duration-1000"
          style={{ backgroundImage: `url(${boardroomImage})` }}
        />
      )}
      {!boardroomImage && !loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-black pointer-events-none" />
      )}
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs tracking-[0.5em] text-white/40 font-bold mb-4 uppercase">Risk Mitigation</h2>
          <h3 className="text-5xl font-serif">The Hybrid Model</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-10 rounded-2xl group hover:border-white/20 transition-all">
            <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Cost Efficiency</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Filming in South Africa utilizes the 25% DTI Rebate. We achieve "Hollywood-level" visuals at a fraction of the cost, 
              leading to a significantly lower break-even point for seed investors.
            </p>
          </div>

          <div className="glass-panel p-10 rounded-2xl group hover:border-white/20 transition-all">
            <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Exposure Hedge</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              By casting international "Name" targets (Charles Dance / Giancarlo Esposito), we secure a "Commercial Floor" 
              for the project, guaranteeing pre-sales in major territories.
            </p>
          </div>

          <div className="glass-panel p-10 rounded-2xl group hover:border-white/20 transition-all">
            <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Secondary Exit</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              If distribution is delayed, the physical art collection provides immediate liquidity through high-end 
              galleries independently of box office performance.
            </p>
          </div>

          <div className="glass-panel p-10 rounded-2xl group hover:border-white/20 transition-all">
            <h4 className="text-white font-bold mb-4 tracking-widest text-xs uppercase">Equity Buy-Back</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Vanguard reserves the right to buy back initial shares at a 1.5x - 2.0x premium once Phase II funding is secured, 
              offering a guaranteed exit for early partners.
            </p>
          </div>
        </div>

        <div className="mt-20 p-12 glass-panel rounded-3xl text-center border border-white/10">
          <h4 className="text-3xl font-serif mb-6 italic">Join the Awakening</h4>
          <p className="text-white/50 mb-10 max-w-xl mx-auto font-light">
            We are selecting a limited number of partners to join Vanguard Production House in architecting a new era of Transcendental Noir.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase hover:bg-white/90 transition-all">
              Request Full Document
            </button>
            <button className="border border-white/20 text-white px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-all">
              Contact Creative Director
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorBrief;
