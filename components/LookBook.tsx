import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { generateCinematicImage } from '../services/geminiService.ts';

interface LookBookSlide {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  signal: string;
  prompt: string;
  theme: 'vanguard' | 'unfettered' | 'transition';
}

const slides: LookBookSlide[] = [
  {
    id: "page1",
    title: "UNFORBIDDEN",
    subtitle: "PART 1 — THE AWAKENING",
    body: "Written by Grant A. Adams",
    signal: "In a world of absolute light, the only truth is the shadow.",
    prompt: "Cinematic film cover, glowing white text 'UNFORBIDDEN' in an infinite dark void with smoke and anamorphic blue flares, 35mm film grain, moody noir atmosphere.",
    theme: 'vanguard'
  },
  {
    id: "page2",
    title: "THE INVINCIBLE PRISON",
    subtitle: "THE EXTERIOR",
    body: "A massive glass prism glowing against the dark Cape Town sky. The surrounding gardens are manicured to a point of unnatural perfection.",
    signal: "The architecture of control.",
    prompt: "Massive glass brutalist prism glowing against a dark night sky, symmetrical architecture, clinical lighting, high contrast photography, Cape Town vibe, anamorphic lens.",
    theme: 'vanguard'
  },
  {
    id: "page3",
    title: "DISCORDANT VIVALDI",
    subtitle: "THE ATMOSPHERE",
    body: "The space is high-ceilinged and clinical, smelling of expensive perfume and floor wax. A string quartet plays a sharp, discordant Vivaldi piece.",
    signal: "Waiters move like expressionless masks, offering crystal flutes of amber champagne.",
    prompt: "High-end clinical gala, expressionless people in masks, amber champagne in crystal flutes, sterile luxury architecture, deep moody shadows, Arri Alexa cinematography.",
    theme: 'vanguard'
  },
  {
    id: "page4",
    title: "LUKE: THE MANNEQUIN",
    subtitle: "THE PROTAGONIST",
    body: "Dressed in a bespoke suit that fits like ceremonial armor, Luke possesses the lean, coiled energy of someone constantly bracing for impact.",
    signal: "His hands tell a different story—stained at the cuticles with charcoal and oil.",
    prompt: "Close up of a handsome Black man in a sharp black bespoke suit, his hands stained with charcoal dust, moody dramatic lighting, high contrast noir, deep shadows, 35mm film still.",
    theme: 'unfettered'
  },
  {
    id: "page5",
    title: "ZOLA: THE OPERATIVE",
    subtitle: "THE HANDLER",
    body: "She glides with a practiced, liquid grace, a woman who has learned to navigate the high-art world without letting it swallow her whole.",
    signal: "Silence is more expensive than any painting.",
    prompt: "Portrait of a elegant Black woman with practiced grace, sharp eyes, tracking her surroundings in a high-art gallery, liquid elegance, cinematic lighting, 35mm noir.",
    theme: 'vanguard'
  },
  {
    id: "page6",
    title: "CHLOE: THE SIGNAL",
    subtitle: "THE CATALYST",
    body: "She stands in the clinical light like a breath of cool air. Her beauty isn't curated; it's quiet and deliberate.",
    signal: "The world needs the one who paints shadows, not the one who becomes one.",
    prompt: "Portrait of a woman with quiet, deliberate beauty, looking at a canvas, soft cool cinematic lighting, high end photography, 35mm film aesthetic, teal and orange palette.",
    theme: 'unfettered'
  },
  {
    id: "page7",
    title: "THE MOTHER: THE MONUMENT",
    subtitle: "THE ARCHITECT",
    body: "Draped in architectural black, she stands with the rigid stillness of a monument. Her gaze is clinical.",
    signal: "Documenting a flaw in her masterpiece.",
    prompt: "Powerful regal Black woman in architectural black standing like a statue in a glass gallery, cold blue lighting, clinical atmosphere, powerful composition, 35mm film still.",
    theme: 'vanguard'
  },
  {
    id: "page8",
    title: "VAULT OF GLASS & SLATE",
    subtitle: "THE OFFICE",
    body: "Everything is a variation of grey. The Mother peers into a detailed architectural model of the gallery like a giant into a dollhouse.",
    signal: "We didn't build you to be honest. We built you to be essential.",
    prompt: "Minimalist executive office at night, glass and slate textures, architectural model on a table, 35mm film noir, cold grey aesthetic.",
    theme: 'vanguard'
  },
  {
    id: "page9",
    title: "THE JAGGED GRAFFITI",
    subtitle: "THE TRANSITION",
    body: "Luke walks with his head down, tie loosened. He stops at a wall covered in jagged, honest graffiti—messy, vibrant, and free.",
    signal: "Leaving the silver sedan in the shadows.",
    prompt: "Dark rainy street in Woodstock Cape Town, vibrant graffiti on a concrete wall, single street lamp, cinematic noir, 35mm anamorphic flares.",
    theme: 'transition'
  },
  {
    id: "page10",
    title: "THE AZA-KHEM",
    subtitle: "THE SANCTUARY",
    body: "Beyond the harsh circle of a single work lamp, the walls are a collage of obsession: jagged, impossible mountain ranges rendered in charcoal.",
    signal: "These are not paintings; they are scars on the wall.",
    prompt: "Dark messy artist studio, large scale charcoal drawings on raw canvas, single warm work lamp, cinematic grit, high texture, dramatic shadows.",
    theme: 'unfettered'
  },
  {
    id: "page11",
    title: "THE PORTAL",
    subtitle: "THE AWAKENING",
    body: "The phone rings: MOTHER. Luke doesn't answer. He lets it ring. He walks over to the drop cloth and pulls it off.",
    signal: "Then paint the fear. Paint the world we're building.",
    prompt: "A Black artist pulling a drop cloth off a massive canvas in a dark studio, backlit by a warm amber light, cinematic masterpiece, dust particles, 35mm film still.",
    theme: 'unfettered'
  }
];

const Slide: React.FC<{ slide: LookBookSlide; index: number; scrollX: any }> = ({ slide, index, scrollX }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const range = [index * window.innerWidth, (index + 1) * window.innerWidth];
  const textY = useTransform(scrollX, range, [150, -150]);
  const bgScale = useTransform(scrollX, range, [1.0, 1.2]);
  const bgOpacity = useTransform(scrollX, range, [0.3, 0.6]);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const img = await generateCinematicImage(slide.prompt, "16:9");
        if (img && isMounted) setImageUrl(img);
      } catch (err) {
        console.error("LookBook Synthesis Error:", err);
      }
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchImage();
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [slide.prompt]);

  return (
    <div 
      ref={containerRef}
      className="min-w-full h-screen relative overflow-hidden snap-center flex items-center justify-center bg-black border-r border-white/5"
    >
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {imageUrl ? (
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="w-full h-full bg-[#050505] flex items-center justify-center">
               <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin opacity-20" />
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />
      <div className="scanline z-10" />
      
      <motion.div style={{ y: textY }} className="relative z-20 max-w-5xl px-12 text-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 0.5, letterSpacing: "1em" }}
          transition={{ duration: 2.5 }}
          className="text-[10px] text-white/40 mb-8 font-bold uppercase"
        >
          {slide.subtitle}
        </motion.div>

        <h2 className={`text-5xl md:text-[8rem] tracking-tighter leading-[0.85] mb-8 transition-all duration-[2000ms] ${slide.theme === 'unfettered' ? 'font-serif italic text-white/90' : 'font-bold text-white uppercase'}`}>
          {slide.title}
        </h2>

        <div className={`h-[1px] w-32 mx-auto mb-12 transition-colors duration-1000 ${slide.theme === 'unfettered' ? 'bg-orange-500/50' : slide.theme === 'vanguard' ? 'bg-blue-500/40' : 'bg-white/20'}`} />

        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
            {slide.body}
          </p>
          <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed italic font-serif">
            "{slide.signal}"
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
        <div className="flex flex-col gap-1">
          <div className="text-[8px] tracking-[0.5em] text-white/20 font-mono uppercase">ASPECT: 2.39_SCOPE</div>
          <div className="text-[8px] tracking-[0.5em] text-white/20 font-mono uppercase">PHASE: {slide.id.toUpperCase()} AUDIT</div>
        </div>
        <div className="text-[9px] tracking-[0.8em] text-white/10 font-bold uppercase">
          {index + 1} // 11
        </div>
      </div>
    </div>
  );
};

const LookBook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: containerRef });
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleExport = () => {
    window.print();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const index = Math.round(containerRef.current.scrollLeft / window.innerWidth);
        setCurrentIndex(index);
      }
    };
    const el = containerRef.current;
    el?.addEventListener('scroll', handleScroll, { passive: true });
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="lookbook" className="relative bg-black h-screen group overflow-hidden border-y border-white/5">
      {/* Header Info */}
      <div className="absolute top-12 left-12 right-12 z-50 pointer-events-none flex justify-between items-center">
        <div className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-bold">THE LOOKBOOK // Inquiry v2.5</div>
        
        <button 
          onClick={handleExport}
          className="pointer-events-auto flex items-center gap-3 glass-panel px-6 py-2.5 rounded-full text-[9px] tracking-[0.3em] font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Archive (PDF)
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar select-none cursor-ew-resize"
      >
        {slides.map((slide, idx) => (
          <Slide key={slide.id} slide={slide} index={idx} scrollX={scrollX} />
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-32 flex items-center justify-center z-50 pointer-events-none md:pointer-events-auto">
        <button 
          onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
          className={`p-6 glass-panel rounded-full text-white/10 hover:text-white transition-all duration-700 opacity-0 group-hover:opacity-100 ${currentIndex === 0 ? 'pointer-events-none invisible' : ''}`}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 w-32 flex items-center justify-center z-50 pointer-events-none md:pointer-events-auto">
        <button 
          onClick={() => scrollTo(Math.min(slides.length - 1, currentIndex + 1))}
          className={`p-6 glass-panel rounded-full text-white/10 hover:text-white transition-all duration-700 opacity-0 group-hover:opacity-100 ${currentIndex === slides.length - 1 ? 'pointer-events-none invisible' : ''}`}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-12 left-12 right-12 h-[1px] bg-white/10 z-50">
        <motion.div 
          className="h-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default LookBook;