
import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const Revenue: React.FC = () => {
  const [revenueImage, setRevenueImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const img = await generateCinematicImage(
          "A high-end modern art gallery at night, massive charcoal drawings on white walls, cold lighting, symmetrical composition, 35mm film frame"
        );
        setRevenueImage(img);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, []);

  const projections = [
    { class: '"Shadow" Series (Physical)', volume: "10 Works", price: "R 50,000", total: "R 500,000" },
    { class: '"Aza-Khem" Landscapes', volume: "5 Works", price: "R 120,000", total: "R 600,000" },
    { class: 'Limited Edition Prints', volume: "100 Units", price: "R 5,000", total: "R 500,000" },
    { class: 'Artist Studies / Sigils', volume: "10 Works", price: "R 15,000", total: "R 150,000" },
    { class: 'Digital Provenance (Initial Mint)', volume: "25 NFTs", price: "R 10,000", total: "R 250,000" },
  ];

  return (
    <section id="revenue" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">Section III: Revenue Architecture</h2>
            <h3 className="text-5xl font-serif mb-8">Asset Diversification</h3>
            <p className="text-white/60 mb-8 font-light leading-relaxed">
              Vanguard does not rely solely on traditional box office. We treat every production as a multi-layered asset class. 
              By integrating physical art collections and Digital Provenance, we provide investors with multiple points of entry and exit.
            </p>

            <div className="aspect-square glass-panel rounded-2xl overflow-hidden mb-8 relative">
              {revenueImage ? (
                <img src={revenueImage} alt="Art Asset Visualization" className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-1000" />
              ) : (
                <div className={`w-full h-full ${loading ? 'bg-white/5 animate-pulse' : 'bg-gradient-to-br from-white/5 to-black'}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute bottom-6 left-6">
                 <div className="text-[10px] tracking-widest text-white/30 font-bold uppercase">Market Visualization</div>
                 <div className="text-sm font-serif italic">The Commodity of Truth</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-l-4 border-white">
              <div className="text-white font-bold mb-2 tracking-widest text-[10px] uppercase">The 10% Clause</div>
              <p className="text-xs text-white/50 leading-relaxed">
                Vanguard retains a 10% royalty on all secondary sales. This creates a long-tail revenue stream independent of box office cycles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase">Asset Class</th>
                    <th className="py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase">Volume</th>
                    <th className="py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase">Projected Price</th>
                    <th className="py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase text-right">Total Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projections.map((p, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 text-sm font-bold text-white/80">{p.class}</td>
                      <td className="py-6 text-sm text-white/50">{p.volume}</td>
                      <td className="py-6 text-sm text-white/50">{p.price}</td>
                      <td className="py-6 text-sm font-bold text-white text-right">{p.total}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="py-8 text-[11px] tracking-[0.3em] font-bold text-white/30 uppercase">Total Seed Phase Asset Valuation</td>
                    <td className="py-8 text-2xl font-serif text-white text-right">R 2,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
