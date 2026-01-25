
import React, { useState, useEffect } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const TechnicalAudit = () => {
  const [techImage, setTechImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const img = await generateCinematicImage(
          "Macro shot of a high-end anamorphic ARRI camera lens, light hitting the glass elements, technical blue light flares, 35mm anamorphic aesthetic"
        );
        setTechImage(img);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, []);

  const specs = [
    { label: "CAMERA SYSTEM", value: "ARRI ALEXA 35" },
    { label: "OPTICS", value: "VINTAGE 35MM ANAMORPHIC" },
    { label: "COLOR SPACE", value: "LOGC4 (NETFLIX STANDARD)" },
    { label: "DYNAMIC RANGE", value: "17 STOPS" },
    { label: "ASPECT RATIO", value: "2.39:1 CINEMASCOPE" },
    { label: "AUDIO FORMAT", value: "DOLBY ATMOS" },
  ];

  return (
    <section id="technical" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">The Technical Audit</h2>
            <h3 className="text-5xl font-serif mb-8">Optical Rigour</h3>
            <p className="max-w-md text-white/50 font-light text-sm italic mb-12">
              "We utilize spatial audio to 'trap' the audience. Symmetrical fields in the Vanguard, chaotic immersion in the Awakening."
            </p>
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {specs.map((spec) => (
                <div key={spec.label} className="border-l border-white/10 pl-6 group hover:border-white transition-colors">
                  <div className="text-[10px] tracking-widest text-white/30 mb-2 font-bold uppercase">{spec.label}</div>
                  <div className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group rounded-3xl overflow-hidden glass-panel aspect-[4/5]">
            {techImage ? (
              <img src={techImage} alt="Technical Rigour" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000" />
            ) : (
              <div className={`w-full h-full ${loading ? 'bg-white/5 animate-pulse' : 'bg-gradient-to-b from-blue-900/10 to-black'}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="text-[10px] tracking-widest text-white/40 mb-1 font-bold uppercase">Optic Audit</div>
              <div className="text-lg font-serif italic text-white/80">The 2.39:1 Inquiry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalAudit;
