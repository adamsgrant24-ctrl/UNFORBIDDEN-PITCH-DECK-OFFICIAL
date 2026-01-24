
import React, { useEffect, useState } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const img = await generateCinematicImage(
          "Wide symmetrical shot of a cold, sterile glass art gallery with blue lighting, high contrast, 35mm anamorphic"
        );
        setBgImage(img);
      } catch (e) {
        console.error("Hero image fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
      <div 
        className={`absolute inset-0 transition-opacity duration-2000 ${bgImage ? 'opacity-60' : 'opacity-20'}`}
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Fallback/Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-1/2 h-1/2 bg-white/[0.02] blur-3xl animate-pulse" />
        </div>
      )}
      
      <div className="relative z-10 text-center px-6">
        <h2 className="text-[12px] tracking-[0.5em] text-white/50 mb-4 font-bold uppercase animate-fade-in">
          Part I: The Awakening
        </h2>
        <h1 className="text-7xl md:text-9xl font-serif tracking-tighter mb-8 leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          UNFORBIDDEN
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          "Truth is the only masterpiece that cannot be owned."<br/>
          <span className="italic mt-4 block">A Transcendental Inquiry of the Invincible Prison.</span>
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="h-20 w-[1px] bg-gradient-to-b from-white/40 to-transparent hidden md:block" />
          <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold">
            Directed by AZA-KHEM
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
