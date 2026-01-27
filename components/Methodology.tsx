
import React from 'react';

const Methodology: React.FC = () => {
  const locationImageUrl = "https://images.squarespace-cdn.com/content/v1/5c767450ab1a623fd072dc6a/1721735178466-HT7D93GPIQ2VIQI348UN/IMG_8414.jpg?format=750w";

  return (
    <section id="methodology" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">Directorial Methodology</h2>
            <h3 className="text-5xl font-serif mb-12">The Action Card System</h3>
            
            <div className="space-y-12">
              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">01. Bypass the Ego</div>
                <p className="text-white/60 font-light leading-relaxed">
                  I do not ask my actors to "play an emotion." I ask them to execute a physical and psychological Action. 
                  This forces the actor into the present moment, generating spontaneous, high-stakes truth.
                </p>
              </div>

              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">02. The Friction</div>
                <p className="text-white/60 font-light leading-relaxed">
                  Pitting different acting schools against one another. Seasoned precision (Technical Masters) vs. Raw unscripted reality (The Impulse).
                </p>
              </div>

              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">03. The Lens as Participant</div>
                <p className="text-white/60 font-light leading-relaxed">
                  The camera follows the Action Card. "To Shatter" means handheld and intimate. "To Enclose" means static and clinical.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex items-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-white/5 bg-neutral-900 group">
              <img 
                src={locationImageUrl} 
                alt="Woodstock Studio - Location Audit" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-sm">
                <div className="text-[10px] tracking-widest text-white/40 mb-2 font-bold uppercase animate-pulse">Location Audit</div>
                <div className="text-2xl font-serif text-white italic drop-shadow-lg">Pole B: The Unfettered (Biological Chaos)</div>
                <div className="text-xs text-white/50 mt-2 font-mono">Woodstock Industrial District | -33.93, 18.45</div>
              </div>
              
              {/* Technical framing elements */}
              <div className="absolute top-6 right-6 flex items-center gap-2 opacity-40">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="text-[8px] tracking-widest text-white font-bold uppercase font-mono">REC AUDIT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
