import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const Methodology = () => {
  const [studioImage, setStudioImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const img = await generateCinematicImage(
          "A messy charcoal artist's studio in Woodstock, deep shadows, flickering warm light, oil paintings, 35mm anamorphic"
        );
        setStudioImage(img);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, []);

  return (
    <section id="methodology" className="py-24 px-6 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">Directorial Manifesto</h2>
            <h3 className="text-5xl font-serif mb-12 italic">The Action Card Protocol</h3>
            
            <div className="space-y-12">
              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">01. Ego Deconstruction</div>
                <p className="text-white/60 font-light leading-relaxed">
                  We bypass traditional "performance." Actors execute visceral physical and psychological Actions. 
                  This forces the subconscious to the surface, generating spontaneous, high-stakes biological truth.
                </p>
              </div>

              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">02. Methodological Friction</div>
                <p className="text-white/60 font-light leading-relaxed">
                  A collision of schools: Seasoned precision (Technical Masters) vs. Unscripted reality (Impulse Artists). 
                  The friction creates the Masterpiece.
                </p>
              </div>

              <div className="group">
                <div className="text-white/20 text-4xl font-serif mb-4 group-hover:text-white transition-colors">03. Participatory Optics</div>
                <p className="text-white/60 font-light leading-relaxed">
                  The lens is reactive. In the Vanguard, it is static and clinical. In the Awakening, it is intimate, 
                  handheld, and reactive to the Action Card impulses.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex items-center">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel group">
              {studioImage ? (
                <img src={studioImage} alt="Woodstock Studio" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              ) : (
                <div className={`w-full h-full ${loading ? 'bg-white/5 animate-pulse' : 'bg-gradient-to-br from-orange-950/20 to-black'}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-sm">
                <div className="text-[10px] tracking-widest text-white/40 mb-2 font-bold uppercase">Location Audit</div>
                <div className="text-2xl font-serif text-white italic">Pole B: Biological Chaos</div>
                <div className="text-xs text-white/50 mt-2">Woodstock Industrial District | Cape Town</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;