import React, { useState, useEffect, useRef } from 'react';
import { generateCinematicImage } from '../services/geminiService.ts';

const Methodology: React.FC = () => {
  const [studioImage, setStudioImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialized.current) {
          initialized.current = true;
          fetchImg();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const fetchImg = async () => {
      setLoading(true);
      try {
        const img = await generateCinematicImage(
          "A messy artist's studio in Woodstock with charcoal dust, oil paintings, and warm amber flickering light, 35mm anamorphic"
        );
        if (img) setStudioImage(img);
      } catch (e) {
        console.error("Methodology image failed", e);
      } finally {
        setLoading(false);
      }
    };

    return () => observer.disconnect();
  }, []);

  return (
    <section id="methodology" ref={sectionRef} className="py-24 px-6">
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
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel">
              {studioImage ? (
                <img src={studioImage} alt="Woodstock Studio" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${loading ? 'bg-white/5 animate-pulse' : 'bg-gradient-to-br from-orange-950/20 to-black'}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-sm">
                <div className="text-[10px] tracking-widest text-white/40 mb-2 font-bold uppercase">Location Audit</div>
                <div className="text-2xl font-serif text-white italic">Pole B: The Unfettered (Biological Chaos)</div>
                <div className="text-xs text-white/50 mt-2">Woodstock Industrial District | -33.93, 18.45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;