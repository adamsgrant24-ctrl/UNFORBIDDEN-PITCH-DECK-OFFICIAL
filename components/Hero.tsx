
import React, { useEffect, useState, useRef } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const Hero = () => {
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialized.current) {
          initialized.current = true;
          loadHero();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const loadHero = async () => {
      try {
        const img = await generateCinematicImage(
          "Extreme wide symmetrical shot, a colossal brutalist monolith of obsidian glass in a shimmering deep blue void, cinematic lighting, 35mm anamorphic, noir atmosphere, high contrast"
        );
        setBgImage(img);
      } catch (err) {
        console.error("Hero Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1020] via-black to-[#050505]" />
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div 
        className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out ${bgImage ? 'opacity-30' : 'opacity-0'}`}
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#020202]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.08)_0%,transparent_80%)]" />

      {loading && !bgImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-48 h-[1px] bg-white/10 animate-pulse mb-4" />
          <div className="text-[7px] tracking-[1.5em] text-white/30 font-bold uppercase animate-pulse">
            Inquiry Protocol Initializing
          </div>
        </div>
      )}
      
      <div className="relative z-10 text-center px-6 max-w-7xl">
        <div className="inline-block mb-16 overflow-hidden">
          <h2 className="text-[10px] tracking-[1.2em] text-white/40 font-bold uppercase animate-slide-up">
            INQUIRY 001: THE TRANSCENDENTAL ARCHITECTURE
          </h2>
        </div>
        
        <div className="relative mb-12">
          <h1 className="text-[12vw] font-serif tracking-[-0.05em] leading-[0.8] bg-gradient-to-b from-white via-white/90 to-white/10 bg-clip-text text-transparent drop-shadow-2xl">
            UNFORBIDDEN
          </h1>
          <div className="mt-4 text-[10px] md:text-[14px] tracking-[2.5em] text-white/20 font-bold uppercase translate-x-4">
            OFFICIAL PROSPECTUS
          </div>
        </div>
        
        <p className="text-xl md:text-3xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed italic animate-fade-in-slow">
          "The ultimate architecture is not built of stone, but of the liberation of the human soul."
        </p>
        
        <div className="mt-32 flex flex-col items-center gap-6">
          <button 
            onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-12 py-5 bg-white text-black font-bold tracking-[0.3em] text-[10px] uppercase rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">ENTER THE INQUIRY</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          <div className="flex items-center gap-4 opacity-20">
             <div className="w-12 h-[1px] bg-white" />
             <div className="text-[8px] tracking-[0.5em] font-bold uppercase">Vanguard Production House</div>
             <div className="w-12 h-[1px] bg-white" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 animate-bounce">
         <div className="text-[8px] tracking-widest font-bold uppercase">Scroll to deconstruct</div>
         <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

export default Hero;
