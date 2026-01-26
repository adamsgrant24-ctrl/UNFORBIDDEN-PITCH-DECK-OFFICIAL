
import React, { useEffect, useState, useRef } from 'react';
import { generateCinematicImage } from '../services/geminiService.ts';
import Trailer from './Trailer.tsx';

const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    const fetchImg = async () => {
      setLoading(true);
      try {
        const img = await generateCinematicImage(
          "Wide symmetrical shot of a cold, sterile glass art gallery with blue lighting, high contrast, 35mm anamorphic noir",
          "16:9",
          true // High priority request
        );
        if (img) {
          setBgImage(img);
        } else if (retryCount < 2) {
          // Subtle retry if it fails
          setTimeout(() => setRetryCount(prev => prev + 1), 3000);
        }
      } catch (e) {
        console.error("Hero image fetch failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchImg();
  }, [retryCount]);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
      <Trailer isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />

      <div 
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${bgImage ? 'opacity-70 scale-100' : 'opacity-20 scale-105'}`}
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_70%)]" />

      {loading && !bgImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-16 h-16 border-b-2 border-white/20 rounded-full animate-spin mb-4" />
          <div className="text-[10px] tracking-[0.5em] text-white/30 font-bold uppercase animate-pulse">Synchronizing Visual Core...</div>
        </div>
      )}
      
      <div className="relative z-10 text-center px-6">
        <h2 className="text-[12px] tracking-[0.5em] text-white/50 mb-4 font-bold uppercase animate-fade-in">
          Part I: The Awakening
        </h2>
        <h1 className="text-7xl md:text-9xl font-serif tracking-tighter mb-8 leading-none bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
          UNFORBIDDEN
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          "Truth is the only masterpiece that cannot be owned."<br/>
          <span className="italic mt-4 block text-white/40">A Transcendental Inquiry of the Invincible Prison.</span>
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => setIsTrailerOpen(true)}
            className="group relative px-10 py-4 bg-white text-black font-bold tracking-[0.3em] text-[10px] uppercase rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">Initiate Trailer Protocol</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
          </button>
          
          <div className="h-10 w-[1px] bg-white/20 hidden md:block" />
          
          <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold">
            Directed by AZA-KHEM
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 animate-bounce">
         <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

export default Hero;
