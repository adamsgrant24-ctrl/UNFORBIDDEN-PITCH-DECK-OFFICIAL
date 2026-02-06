import React, { useState, useEffect, useRef } from 'react';
import { generateCinematicImage } from '../services/geminiService.ts';

interface Character {
  name: string;
  talent: string;
  role: string;
  description: string;
  tagline: string;
  imageUrl: string | null;
}

const characters: Character[] = [
  {
    name: "LUKE",
    talent: "Teboho Mzisa",
    role: "The Obsidian Shadow",
    description: "Represents the raw, visceral core of the 'Action Card' system. A master of the physical impulse.",
    tagline: "TO SHATTER",
    imageUrl: "https://d26oc3sg82pgk3.cloudfront.net/files/media/uploads/casting_call/6d11ba7d-5585-4b5c-9813-b73b25378d88-bWFpbi1uLW4tMC0wLTAtMC0w.JPEG"
  },
  {
    name: "CHLOE",
    talent: "Annette Miller",
    role: "The Anchor",
    description: "The bridge between the old truth and the new awakening. She holds the emotional center of the Inquiry.",
    tagline: "TO HOLD",
    imageUrl: "https://static.wixstatic.com/media/7aa071_d959f5b20fdb4cc5baade8999cd92225~mv2.png/v1/crop/x_0,y_55,w_1094,h_1069/fill/w_440,h_430,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-04-21%20at%2015_26_37.png"
  },
  {
    name: "ZOLA",
    talent: "Infiniti Chase",
    role: "The Kinetic Impulse",
    description: "The unexpected variable. She ignites the friction between the Vanguard Collective and the Unfettered Truth.",
    tagline: "TO CATALYZE",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-2235578658-68dbfd9290ff9.jpg?resize=980:*"
  },
  {
    name: "THE MOTHER",
    talent: "Pamela Nomvete",
    role: "The Gatekeeper",
    description: "The clinical, controlling force that manages Luke’s life. She is the architect of the Vanguard prison.",
    tagline: "TO ENCLOSE",
    imageUrl: "https://www.zkhiphani.co.za/wp-content/uploads/2017/01/Pamela-Nomvete.jpg"
  },
  {
    name: "THE CRITIC",
    talent: "Giancarlo Esposito",
    role: "The Analytical Void",
    description: "The judge of the 'Masterpiece'. He measures truth against the yardstick of marketability and clinical perfection.",
    tagline: "TO DISSECT",
    imageUrl: "https://external-preview.redd.it/giancarlo-esposito-says-his-secret-role-is-an-original-and-v0-EZviJpAjbg38PF_0PJkq_luhZWNyv4voQLX_h-Kfxfo.jpg?width=1080&crop=smart&auto=webp&s=a7a4e6f16b7f90605678460e5c804995a141133c"
  },
  {
    name: "THE PATRON",
    talent: "Charles Dance",
    role: "The Commodity Consumer",
    description: "Old money; views the artist as a specimen under glass. Represents the commodification of raw truth.",
    tagline: "TO COMMODIFY",
    imageUrl: "https://i.pinimg.com/736x/85/b4/8a/85b48a1eb7ab761553eeb38f72f3ebc2.jpg"
  }
];

const CharacterCard: React.FC<{ char: Character }> = ({ char }) => {
  const [displayUrl, setDisplayUrl] = useState<string | null>(char.imageUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSynthesized, setIsSynthesized] = useState(false);
  const triggerRef = useRef(false);

  const handleImageError = async () => {
    if (triggerRef.current) return;
    triggerRef.current = true;
    setIsGenerating(true);
    
    // Determine ethnicity descriptor for prompt enhancement
    const isBlackCharacter = ["LUKE", "ZOLA", "THE MOTHER"].includes(char.name);
    const descriptor = isBlackCharacter ? (char.name === "THE MOTHER" ? "regal Black woman" : "handsome Black man") : "person";

    try {
      const aiImage = await generateCinematicImage(
        `High-end cinematic portrait of a ${descriptor} as the character ${char.name}, played by ${char.talent}. Noir aesthetic, moody dramatic lighting, ${char.role}, transcendental film still.`,
        "3:4"
      );
      
      if (aiImage) {
        setDisplayUrl(aiImage);
        setIsSynthesized(true);
      }
    } catch (err) {
      console.error(`Failed to synthesize ${char.name}:`, err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="group relative overflow-hidden aspect-[3/4] glass-panel rounded-xl border border-white/5 bg-black">
      {displayUrl ? (
        <img 
          src={displayUrl} 
          alt={char.name} 
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isSynthesized ? 'opacity-70 group-hover:opacity-100' : 'grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100'} ${isGenerating ? 'opacity-0 scale-110' : 'scale-100'}`}
        />
      ) : (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
           <span className="text-white/10 font-serif text-8xl select-none animate-pulse">{char.name[0]}</span>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <div className="text-[9px] tracking-[0.5em] text-white/70 font-bold uppercase text-center px-4">Synthesizing {char.name}...</div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-[10px] tracking-widest text-white/50 mb-2 font-bold uppercase">{char.role}</div>
        <h3 className="text-2xl font-serif mb-1">{char.name}</h3>
        <div className="text-sm text-white/40 mb-4 italic">{char.talent}</div>
        <p className="text-xs text-white/60 mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
          {char.description}
        </p>
        <div className="inline-block border border-white/20 px-3 py-1 rounded text-[10px] tracking-widest text-white font-bold uppercase">
          {char.tagline}
        </div>
      </div>
    </div>
  );
};

const Ensemble: React.FC = () => {
  return (
    <section id="ensemble" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-xs tracking-[0.4em] text-white/40 font-bold mb-4 uppercase">Section II: The Cast</h2>
          <h3 className="text-5xl font-serif">The Ensemble</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char) => (
            <CharacterCard key={char.name} char={char} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ensemble;