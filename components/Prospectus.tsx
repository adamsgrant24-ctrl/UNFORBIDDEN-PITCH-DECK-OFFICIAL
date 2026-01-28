import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService.ts';

interface ProspectusProps {
  isSyncComplete?: boolean;
}

const Prospectus: React.FC<ProspectusProps> = ({ isSyncComplete }) => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBg = async () => {
      const img = await generateCinematicImage(
        "Modern luxury office with golden amber lighting at night, high-end architecture, cinematic noir photography",
        "16:9"
      );
      setBgImage(img);
    };
    fetchBg();
  }, []);

  const ensemble = [
    { name: 'Charles Dance', role: 'The Patriarch', status: 'Priority Attachment' },
    { name: 'Giancarlo Esposito', role: 'The Broker', status: 'Priority Attachment' },
    { name: 'Teboho Mzisa', role: 'Luke (Lead)', status: 'Attached' },
    { name: 'Annette Miller', role: 'Chloe (Lead)', status: 'Attached' },
    { name: 'Pamela Nomvete', role: 'The Elder', status: 'Attached' },
    { name: 'Infiniti Chase', role: 'Echo (Vanguard)', status: 'Attached' }
  ];

  const budgetItems = [
    { category: 'Principal Talent', allocation: 'R400,000', percentage: 27, description: 'Securing Teboho Mzisa & Annette Miller.' },
    { category: 'Anamorphic Optic Kit', allocation: 'R350,000', percentage: 23, description: 'Arri/Zeiss Primes for signature 2.39:1 look.' },
    { category: 'Aza-Khem Art Dept', allocation: 'R300,000', percentage: 20, description: 'Creation of large-scale murals & installations.' },
    { category: 'Location Integrity', allocation: 'R250,000', percentage: 17, description: 'Exclusive access to key gallery & industrial sites.' },
    { category: 'Post-Production', allocation: 'R200,000', percentage: 13, description: 'Cinema-grade color grading & 5.1 sound mix.' },
  ];

  const revisionLog = [
    { id: '8a22bc', type: 'ENHANCEMENT', msg: 'Added A-List Ensemble Attachments (Dance/Esposito)', date: '2h ago' },
    { id: '1fc93e', type: 'FINANCIAL', msg: 'Calibrated Phase 1 Yield Weighting (R1.5M)', date: '4h ago' },
    { id: '77d2b1', type: 'ASSETS', msg: 'Integrated Cinematic Keyframes via Gemini_2.5', date: '6h ago' },
  ];

  return (
    <section id="prospectus" className="relative bg-[#050505] text-white py-24 px-6 font-sans overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      {bgImage && (
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none scale-110 blur-sm"
          style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-20 border-b border-white/10 pb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
          <div>
            <div className="text-[10px] tracking-[0.5em] text-amber-500 font-bold mb-4 uppercase">Financial Protocol</div>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter text-white uppercase mb-4">
              UNFORBIDDEN
            </h2>
            <p className="text-xl md:text-2xl text-white/40 italic font-light">
              Phase 1: 'The Signal' Pilot & Global Prestige Trilogy
            </p>
          </div>
          <div className="text-center md:text-right mt-8 md:mt-0">
            <div className="text-[10px] tracking-widest text-white/30 uppercase mb-1 font-bold">Target Phase 1 Capital</div>
            <div className="text-5xl font-bold tracking-tighter text-amber-500">R1,500,000</div>
            {isSyncComplete && (
              <div className="text-[8px] font-mono text-green-500 mt-2 tracking-widest font-bold uppercase">
                // SYNC_VERIFIED_PROTOCOL
              </div>
            )}
          </div>
        </header>

        {/* A-List Ensemble Integration */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-serif italic text-white/90">I. The Global Prestige Ensemble</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
            <span className="text-[10px] font-mono text-white/20">TALENT_ATTACH.LOG</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ensemble.map((actor, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 group hover:border-amber-500/30 transition-all duration-500">
                <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1 opacity-60 group-hover:opacity-100">{actor.role}</div>
                <div className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{actor.name}</div>
                <div className="text-[10px] text-white/30 mt-2 uppercase font-mono">{actor.status}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Allocation */}
        <div className="glass-panel p-10 rounded-3xl border border-white/10 mb-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />
          <h3 className="text-xl font-bold text-white uppercase mb-6 tracking-tight">Phase 1: The 'Signal' Pilot</h3>
          <p className="text-white/60 leading-relaxed mb-8 max-w-4xl font-light text-lg">
            With the attachment of global icons like <strong className="text-white font-bold">Charles Dance</strong> and <strong className="text-white font-bold">Giancarlo Esposito</strong>, the R1.5M initial raise is dedicated to the creation of the 15-minute 'Signal' Proof of Concept. This asset will be used to leverage a <span className="text-amber-500 font-bold underline decoration-amber-500/20 underline-offset-8">Series A production round of R20M+</span> for the full trilogy.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 glass-panel rounded-xl border border-white/5 text-center">
              <p className="text-3xl font-bold text-white mb-1">40%</p>
              <p className="text-[10px] uppercase text-white/30 tracking-widest font-bold">Talent Retainers</p>
            </div>
            <div className="p-6 glass-panel rounded-xl border border-white/5 text-center">
              <p className="text-3xl font-bold text-white mb-1">30%</p>
              <p className="text-[10px] uppercase text-white/30 tracking-widest font-bold">Visual Inquiry (6K)</p>
            </div>
            <div className="p-6 glass-panel rounded-xl border border-white/5 text-center">
              <p className="text-3xl font-bold text-white mb-1">20%</p>
              <p className="text-[10px] uppercase text-white/30 tracking-widest font-bold">Aza-Khem Builds</p>
            </div>
            <div className="p-6 glass-panel rounded-xl border border-white/5 text-center">
              <p className="text-3xl font-bold text-white mb-1">10%</p>
              <p className="text-[10px] uppercase text-white/30 tracking-widest font-bold">Festival Strategy</p>
            </div>
          </div>
        </div>

        {/* Capital Allocation Detailed Audit */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-serif italic text-white/90">II. Yield Architecture</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
            <span className="text-[10px] font-mono text-white/20">AUDIT_01.EXE</span>
          </div>
          
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.02]">
                  <tr>
                    <th className="px-8 py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase">Asset Category</th>
                    <th className="px-8 py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase">Allocation</th>
                    <th className="px-8 py-6 text-[10px] tracking-widest text-white/30 font-bold uppercase hidden md:table-cell">Strategic Objective</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {budgetItems.map((item, index) => (
                    <tr key={index} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-8 py-8">
                        <div className="flex flex-col max-w-xs">
                          <span className="font-bold text-white text-lg tracking-tight mb-3 group-hover:text-amber-500 transition-colors">{item.category}</span>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500/50 group-hover:bg-amber-500 transition-all duration-1000"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="text-2xl font-bold tracking-tighter text-white/90">{item.allocation}</div>
                        <div className="text-[10px] text-white/20 font-mono mt-1">{item.percentage}% Yield Weights</div>
                      </td>
                      <td className="px-8 py-8 text-white/40 text-sm font-light leading-relaxed hidden md:table-cell italic">
                        "{item.description}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Revision Log Simulation */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-sm font-bold tracking-widest text-white/30 uppercase">Repository Activity</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <div className="space-y-4">
            {revisionLog.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 glass-panel rounded-lg border border-white/5 font-mono text-[10px]">
                <div className="flex items-center gap-4">
                  <span className="text-white/20">#{log.id}</span>
                  <span className={`px-2 py-0.5 rounded ${log.type === 'FINANCIAL' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-400'}`}>{log.type}</span>
                  <span className="text-white/60">{log.msg}</span>
                </div>
                <div className="text-white/20 uppercase">{log.date}</div>
              </div>
            ))}
            {isSyncComplete && (
              <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-lg border border-green-500/20 font-mono text-[10px] animate-fade-in">
                <div className="flex items-center gap-4">
                  <span className="text-green-500/40">#vanguard</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold">SUCCESS</span>
                  <span className="text-green-400/80">Repository Synchronized: origin/vanguard-main (v2.4.0)</span>
                </div>
                <div className="text-green-500/40 uppercase">Just Now</div>
              </div>
            )}
          </div>
        </section>
        
        {/* Director's Note */}
        <section className="relative glass-panel p-16 rounded-[3rem] border border-amber-500/20 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-white/80 mb-10 max-w-3xl mx-auto leading-tight">
              "At R1.5 Million, we aren't just making a film; we are building a frequency. Every Rand is visible on screen through the depth of the shadow and the honesty of the performances."
            </blockquote>
            <div className="h-8 w-[1px] bg-amber-500/50 mx-auto mb-6" />
            <cite className="text-[11px] tracking-[0.4em] text-amber-500 font-bold uppercase not-italic">
              Aza-Khem <span className="text-white/20 mx-2">/</span> Director
            </cite>
          </div>
        </section>

        <div className="mt-20 flex justify-center">
            <button className="bg-amber-500 text-black px-12 py-5 rounded-full font-bold tracking-[0.3em] text-[10px] uppercase hover:bg-amber-400 transition-all shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                Inquire for Full Disclosure
            </button>
        </div>
      </div>
    </section>
  );
};

export default Prospectus;