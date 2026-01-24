
import React, { useEffect, useState } from 'react';
import { generateCinematicImage } from '../services/geminiService';

const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImg = async () => {
      const img = await generateCinematicImage(
        "Wide symmetrical shot of a cold, sterile glass art gallery with blue lighting, high contrast, 35mm anamorphic"
      );
      setBgImage(img);
    };
    fetchImg();
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-60"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0a0a0a]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      
      <div className="relative z-10 text-center px-6">
        <h2 className="text-[12px] tracking-[0.5em] text-white/50 mb-4 font-bold uppercase">
          Part I: The Awakening
        </h2>
        <h1 className="text-7xl md:text-9xl font-serif tracking-tighter mb-8 leading-none">
          UNFORBIDDEN
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          "Truth is the only masterpiece that cannot be owned."<br/>
          <span className="italic mt-4 block">A Transcendental Inquiry of the Invincible Prison.</span>
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="h-20 w-[1px] bg-gradient-to-b from-white/40 to-transparent hidden md:block" />
          <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
            Directed by AZA-KHEM
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
