
import React, { useState } from 'react';
import Trailer from './Trailer.tsx';

const Hero: React.FC = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const heroImageUrl = "https://images.stockcake.com/public/d/2/6/d2629728-e199-4c98-bce3-a34281907fe5_large/towering-glass-monolith-stockcake.jpg";

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
      <Trailer isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />

      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 transition-all duration-[3000ms] ease-out opacity-60 scale-100"
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>
      
      {/* Overlays for Depth and Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_70%)]" />
      
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
