
import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService';

const Vision: React.FC = () => {
  const [visionImage, setVisionImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImg = async () => {
      const img = await generateCinematicImage(
        "A conceptual architectural visualization of a glass prison floating in a dark, infinite void. Minimalist, neon blue accents, high contrast, cinematic lighting, anamorphic."
      );
      setVisionImage(img);
    };
    fetchImg();
  }, []);

  return (
    <section id="vision" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">The Core Thesis</h2>
          <h3 className="text-5xl font-serif mb-12 italic">The Transcendental Inquiry</h3>
          
          <div className="space-y-8 text-white/70 leading-relaxed font-light text-xl">
            <p>
              I am not merely directing a movie; I am conducting a creative Inquiry of the human soul. 
              Exploring the profound friction between the <span className="text-white font-normal underline decoration-white/20 underline-offset-4">Vanguard Collective</span>—the sterile, glass-and-steel prison 
              of elite expectation—and the <span className="text-white font-normal underline decoration-white/20 underline-offset-4">Unfettered Truth</span> of raw authenticity.
            </p>
            <p>
              The narrative deconstructs the lives of Luke and Chloe, navigating the invincible prisons of their pasts. 
              Truth has nothing to do with pretense. It is about the courage to be "unforbidden" in a world that demands a mask.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 glass-panel rounded-2xl border-t-2 border-blue-500/20">
                <div className="text-[10px] tracking-widest text-blue-400 font-bold mb-2 uppercase">Pole A: The Vanguard</div>
                <p className="text-sm text-white/50">Clinical, Symmetrical, Cold. The architecture of expectation.</p>
             </div>
             <div className="p-8 glass-panel rounded-2xl border-t-2 border-orange-500/20">
                <div className="text-[10px] tracking-widest text-orange-400 font-bold mb-2 uppercase">Pole B: The Unfettered</div>
                <p className="text-sm text-white/50">Visceral, Chaotic, Warm. The architecture of reality.</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="aspect-square glass-panel rounded-3xl overflow-hidden relative group">
            {visionImage ? (
              <img src={visionImage} alt="The Invincible Prison" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
            ) : (
              <div className="w-full h-full bg-white/5 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-8 left-8">
               <div className="text-[10px] tracking-widest text-white/40 mb-1 font-bold uppercase">Concept Audit</div>
               <div className="text-lg font-serif">The Invincible Prison</div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xs tracking-widest text-white/40 mb-6 font-bold uppercase">The Trilogy Architecture</h3>
            <div className="space-y-8">
              <div className="border-l border-white/10 pl-6 group">
                <div className="text-white font-bold mb-1 group-hover:text-white transition-colors">PART I: THE AWAKENING</div>
                <div className="text-sm text-white/50">Luke’s internal confrontation with his mother’s legacy.</div>
              </div>
              <div className="border-l border-white/10 pl-6 group">
                <div className="text-white/40 font-bold mb-1 group-hover:text-white/60 transition-colors">PART II: THE RESISTANCE</div>
                <div className="text-sm text-white/30">The struggle to keep truth pure against commercialization.</div>
              </div>
              <div className="border-l border-white/10 pl-6 group">
                <div className="text-white/20 font-bold mb-1 group-hover:text-white/40 transition-colors">PART III: THE LEGACY</div>
                <div className="text-sm text-white/20">Total transcendental liberation and a new artistic era.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
