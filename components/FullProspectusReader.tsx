import React, { useEffect, useState } from 'react';
import { generateCinematicImage } from '../services/geminiService.ts';

interface FullProspectusReaderProps {
  onClose: () => void;
}

const FullProspectusReader: React.FC<FullProspectusReaderProps> = ({ onClose }) => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchImg = async () => {
      const img = await generateCinematicImage("A dark infinite library of architectural blueprints, cinematic lighting, 35mm film", "16:9");
      setBgImage(img);
    };
    fetchImg();
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-black text-white/90 flex flex-col font-sans">
      {/* Background Ambience */}
      {bgImage && (
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
        />
      )}

      {/* Navigation Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-black/80 backdrop-blur-xl relative z-20">
        <div className="flex items-center gap-6">
          <div className="text-[10px] tracking-[0.4em] font-bold text-white uppercase">UNFORBIDDEN</div>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">The Architectural Prospectus</div>
        </div>
        <button 
          onClick={onClose}
          className="text-[10px] tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors uppercase border border-white/10 px-6 py-2 rounded-full"
        >
          Exit Protocol
        </button>
      </header>

      {/* Content Scroller */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto py-32 px-10">
          
          {/* Title Section */}
          <section className="mb-40 text-center">
            <div className="text-[12px] tracking-[0.8em] text-white/30 mb-8 uppercase font-bold italic animate-fade-in">Private & Confidential</div>
            <h1 className="text-7xl md:text-9xl font-serif tracking-tighter mb-12 uppercase leading-none">UNFORBIDDEN</h1>
            <p className="text-xl md:text-3xl text-white/60 italic font-light mb-12">Part I: The Awakening — A Trilogy</p>
            <div className="h-12 w-[1px] bg-white/10 mx-auto mb-12" />
            <div className="text-[11px] tracking-[0.4em] text-white/80 uppercase font-bold mb-2">BY AZA-KHEM</div>
            <div className="text-[10px] tracking-widest text-white/30 uppercase font-mono">azakhem26@gmail.com | 0736285307</div>
          </section>

          {/* Preamble */}
          <section className="mb-40 text-center border-y border-white/5 py-32">
            <h2 className="text-[10px] tracking-[0.5em] text-white/20 mb-12 uppercase font-bold">The Preamble</h2>
            <blockquote className="text-4xl md:text-5xl font-serif italic mb-12 leading-tight text-white/90">
              "Truth is the only masterpiece that cannot be owned."
            </blockquote>
            <p className="text-lg text-white/40 font-light italic">"A Creative Inquiry of the human soul."</p>
          </section>

          {/* Mission Statement */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs tracking-[0.5em] text-white/30 uppercase font-bold">Mission Statement</h3>
               <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <h4 className="text-4xl font-serif italic mb-8">Vanguard Production House: The Architect's Office</h4>
            <p className="text-xl text-white/60 leading-relaxed font-light mb-12">
              Vanguard Production House is an independent South African film and art incubator dedicated to the creation of "Prestige-Genre" hybrids. We architect high-concept narratives that bridge the gap between regional authenticity and global elite markets. Our methodology fuses traditional cinematic excellence with emerging digital provenance and physical art asset management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass-panel p-8 rounded-2xl">
                <div className="text-amber-500 font-bold mb-4 tracking-widest text-[10px] uppercase">01. Narrative Architecture</div>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  We specialize in the "Transcendental Noir" aesthetic—creating visual worlds that act as psychological audits. By utilizing the Action Card System, we ensure our productions deliver raw, spontaneous truth within a highly controlled technical framework.
                </p>
              </div>
              <div className="glass-panel p-8 rounded-2xl">
                <div className="text-blue-500 font-bold mb-4 tracking-widest text-[10px] uppercase">02. Asset Diversification</div>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  Vanguard does not rely solely on traditional box office. We treat every production as a multi-layered asset class. By integrating physical art collections (The Aza-Khem Series) and Digital Provenance (Smart Contracts), we provide our investors with multiple points of entry and exit.
                </p>
              </div>
            </div>
          </section>

          {/* The Vision Detailed */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs tracking-[0.5em] text-white/30 uppercase font-bold">Section I: The Vision</h3>
               <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <h4 className="text-4xl font-serif italic mb-12">The Transcendental Inquiry</h4>
            <div className="space-y-12 text-xl text-white/60 leading-relaxed font-light">
               <p>
                 I am not merely directing a movie; I am conducting a creative Inquiry of the human soul. I am exploring the profound friction between the Vanguard Collective—the sterile, glass-and-steel prison of elite expectation—and the Unfettered Truth of raw, fresh, and courageous authenticity.
               </p>
               <div className="p-12 glass-panel border border-white/10 rounded-3xl bg-white/[0.01]">
                 <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-xs italic">The Architecture of the Trilogy</h5>
                 <div className="space-y-10">
                   <div>
                     <div className="text-white text-lg font-bold mb-2">Part I: The Awakening</div>
                     <p className="text-white/40 text-sm">Luke’s internal confrontation with his mother’s legacy and his first glimpse of a new sanctuary.</p>
                   </div>
                   <div className="border-t border-white/5 pt-10">
                     <div className="text-white/70 text-lg font-bold mb-2">Part II: The Resistance</div>
                     <p className="text-white/30 text-sm">The struggle to keep the truth pure as the world attempts to commercialize his brand.</p>
                   </div>
                   <div className="border-t border-white/5 pt-10">
                     <div className="text-white/40 text-lg font-bold mb-2">Part III: The Legacy</div>
                     <p className="text-white/20 text-sm">The total transcendental liberation and the birth of a new artistic era.</p>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* Directorial Methodology */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs tracking-[0.5em] text-white/30 uppercase font-bold">Section III: Method</h3>
               <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <h4 className="text-4xl font-serif italic mb-12 uppercase">The Action Card System</h4>
            <div className="space-y-8 text-white/60 font-light">
              <p className="text-xl">To achieve the "unfettered" honesty this script demands, I move away from traditional over-rehearsal. My primary tool is the Action Card System—a bespoke method designed to generate spontaneous, high-stakes truth on camera.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="p-6 border border-white/10 rounded-xl bg-black">
                  <div className="text-amber-500 font-bold mb-1 tracking-widest text-[10px] uppercase">Luke</div>
                  <div className="text-lg text-white font-bold mb-2">TO SHATTER</div>
                  <p className="text-xs text-white/40 italic">"His objective is to destroy the professional boundary and the clinical silence of the gallery."</p>
                </div>
                <div className="p-6 border border-white/10 rounded-xl bg-black">
                  <div className="text-blue-500 font-bold mb-1 tracking-widest text-[10px] uppercase">The Mother</div>
                  <div className="text-lg text-white font-bold mb-2">TO ENCLOSE</div>
                  <p className="text-xs text-white/40 italic">"Her objective is to maintain the perimeter of the 'Vanguard Collective', treating every emotional outburst as a structural flaw."</p>
                </div>
                <div className="p-6 border border-white/10 rounded-xl bg-black">
                  <div className="text-white/80 font-bold mb-1 tracking-widest text-[10px] uppercase">The Critic</div>
                  <div className="text-lg text-white font-bold mb-2">TO LABEL</div>
                  <p className="text-xs text-white/40 italic">"His objective is to categorize and strip the raw power of the work by forcing it into a safe context."</p>
                </div>
                <div className="p-6 border border-white/10 rounded-xl bg-black">
                  <div className="text-amber-200 font-bold mb-1 tracking-widest text-[10px] uppercase">The Patron</div>
                  <div className="text-lg text-white font-bold mb-2">TO COMMODIFY</div>
                  <p className="text-xs text-white/40 italic">"His objective is to hunt for the 'investment', treating the artist as a rare specimen under glass."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Architecture */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs tracking-[0.5em] text-white/30 uppercase font-bold">Section V: Revenue</h3>
               <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <h4 className="text-4xl font-serif italic mb-12 uppercase">Yield Architecture</h4>
            <div className="glass-panel p-10 rounded-3xl overflow-hidden border border-white/5 mb-12">
               <div className="flex flex-col md:flex-row justify-between mb-12 border-b border-white/5 pb-8">
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Seed Phase Valuation</h5>
                    <p className="text-5xl font-bold tracking-tighter text-amber-500">R2,000,000</p>
                  </div>
                  <div className="mt-6 md:mt-0 text-right">
                    <h5 className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-2">Mechanism</h5>
                    <p className="text-sm font-mono text-white/60 uppercase tracking-widest italic"> origin/asset_liquidation.exe </p>
                  </div>
               </div>

               <div className="space-y-6">
                 {[
                   { name: '"Shadow" Series (Physical)', val: "R 500,000", volume: "10 Works" },
                   { name: '"Aza-Khem" Landscapes', val: "R 600,000", volume: "5 Works" },
                   { name: "Limited Edition Giclée Prints", val: "R 500,000", volume: "100 Units" },
                   { name: "Digital Provenance (Initial Mint)", val: "R 250,000", volume: "25 NFTs" },
                   { name: "Artist Studies / Sigils", val: "R 150,000", volume: "10 Works" }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center py-4 border-b border-white/[0.03]">
                      <div>
                        <div className="text-white font-bold text-lg tracking-tight">{item.name}</div>
                        <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">{item.volume}</div>
                      </div>
                      <div className="text-xl font-bold text-white/90 font-mono tracking-tighter">{item.val}</div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-8 glass-panel border-t-2 border-amber-500/30 rounded-2xl">
                  <h6 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">The "First-Out" Priority</h6>
                  <p className="text-sm text-white/40 leading-relaxed italic">"100% of the initial R2,000,000 Asset Yield is allocated to the Repayment of Seed Investors. This ensures capital is recouped before the film enters its distribution cycle."</p>
               </div>
               <div className="p-8 glass-panel border-t-2 border-blue-500/30 rounded-2xl">
                  <h6 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Legacy Royalty (10%)</h6>
                  <p className="text-sm text-white/40 leading-relaxed italic">"A hard-coded instruction within the Smart Contract triggering a 10% redistribution of sale prices back to the Equity Pool upon secondary market transactions."</p>
               </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xs tracking-[0.5em] text-white/30 uppercase font-bold">Section IV: The Technical Audit</h3>
               <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/60 font-light">
               <div>
                  <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Acquisition Architecture</h5>
                  <div className="space-y-6">
                    <div>
                      <div className="text-white font-bold">ARRI ALEXA 35</div>
                      <p className="text-sm">17 stops of Dynamic Range. Capture clinical whites and obsidian blacks without losing data.</p>
                    </div>
                    <div>
                      <div className="text-white font-bold">VINTAGE 35MM ANAMORPHIC</div>
                      <p className="text-sm">2.39:1 Aspect Ratio. Oval Bokeh and horizontal flares to create psychological pressure.</p>
                    </div>
                    <div>
                      <div className="text-white font-bold">4.6K NATIVE | LOGC4</div>
                      <p className="text-sm">Global standard for Netflix/Apple TV+. Triple-redundancy cloud architecture.</p>
                    </div>
                  </div>
               </div>
               <div className="glass-panel p-8 rounded-2xl border border-white/5">
                  <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Site Coordinates</h5>
                  <div className="space-y-8 font-mono text-xs">
                    <div>
                      <div className="text-blue-400 mb-1">Pole A: The Vanguard (Clinical Geometry)</div>
                      <p className="text-white/30">Site: The Norval Foundation, Steenberg.</p>
                      <p className="text-white/60">-34.07698368, 18.42856298</p>
                    </div>
                    <div className="border-t border-white/5 pt-8">
                      <div className="text-amber-500 mb-1">Pole B: The Unfettered (Biological Chaos)</div>
                      <p className="text-white/30">Site: Woodstock Industrial District.</p>
                      <p className="text-white/60">-33.93, 18.45</p>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Closing Invitation */}
          <section className="text-center py-40 border-t border-white/10">
            <h4 className="text-5xl font-serif italic mb-16 leading-tight">"The blueprints are drawn. The foundations are set. The audit is underway."</h4>
            <div className="flex flex-col items-center gap-6">
              <div className="text-[12px] tracking-[0.5em] text-white/40 mb-8 uppercase font-bold">We invite you to witness the awakening.</div>
              <img src="https://media.licdn.com/dms/image/v2/D4E03AQGBjbIwBAWflQ/profile-displayphoto-crop_800_800/B4EZvDkMEFGcAM-/0/1768512603135?e=1772064000&v=beta&t=jKcEJnZM07ztuXc8tvnmivaTl2PG-fw8gTTWPDNjqNw" alt="Aza-Khem" className="w-32 h-32 rounded-full grayscale border-2 border-white/10 mb-6 object-cover" />
              <div className="text-lg font-bold text-white">AZA-KHEM</div>
              <div className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold mb-12">Director & Lead Architect</div>
              
              <button 
                onClick={() => window.print()}
                className="text-[10px] tracking-[0.3em] font-bold text-amber-500 hover:text-amber-400 uppercase flex items-center gap-3 border border-amber-500/20 px-8 py-3 rounded-full transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-4H5v4a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
                </svg>
                Export Audit Log
              </button>
            </div>
          </section>

        </div>
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.005),rgba(0,255,0,0.005),rgba(0,0,255,0.005))] bg-[length:100%_4px,3px_100%] z-50" />
    </div>
  );
};

export default FullProspectusReader;