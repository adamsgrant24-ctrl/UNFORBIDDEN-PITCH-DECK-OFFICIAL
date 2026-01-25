
import React, { useState } from 'react';
import { generateCinematicImage } from '../services/geminiService.tsx';

const characters = [
  {
    name: "LUKE",
    talent: "Teboho Mzisa",
    role: "The Obsidian Shadow",
    description: "Represents the raw, visceral core of the 'Action Card' system. A master of the physical impulse who exists at the friction point of the Inquiry.",
    tagline: "TO SHATTER",
    imageUrl: "https://d26oc3sg82pgk3.cloudfront.net/files/media/uploads/casting_call/6d11ba7d-5585-4b5c-9813-b73b25378d88-bWFpbi1uLW4tMC0wLTAtMC0w.JPEG"
  },
  {
    name: "CHLOE",
    talent: "Annette Miller",
    role: "The Anchor",
    description: "The bridge between the old truth and the new awakening. She holds the emotional center of the Inquiry against the clinical Vanguard.",
    tagline: "TO HOLD",
    imageUrl: "https://static.wixstatic.com/media/7aa071_d959f5b20fdb4cc5baade8999cd92225~mv2.png/v1/crop/x_0,y_55,w_1094,h_1069/fill/w_440,h_430,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-04-21%20at%2015_26_37.png"
  },
  {
    name: "ZOLA",
    talent: "Infiniti Chase",
    role: "The Kinetic Impulse",
    description: "The unexpected variable. She ignites the friction between the Vanguard Collective and the Unfettered Truth.",
    tagline: "TO CATALYZE",
    imageUrl: "https://z-p3-scontent.fcpt1-1.fna.fbcdn.net/v/t39.30808-6/614252486_122292148502230881_1169823324019197250_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF-XyslqllbU3dRQvFwsyxFZ-dGGoKCFnVn50YagoIWda5R3C3hxdMmsCyskP_h4TphVx80fzlbO9-c9PF27wbd&_nc_ohc=5Bo6IzO_NV4Q7kNvwFpFXgs&_nc_oc=AdlXdFjFmeTJTj7W209NuBVOqh6j6QU8j4QSYpZnSypiv_pT7d592ohStkuKKlY7-v0&_nc_zt=23&_nc_ht=z-p3-scontent.fcpt1-1.fna&_nc_gid=Tl6LNh14wq2Kpwk_pryoXg&oh=00_Afqbb06R9xFr6wQ006ObUtKgMxzzECbBPE2uLxYqKznBJw&oe=697AFAD8"
  },
  {
    name: "THE MOTHER",
    talent: "Pamela Nomvete",
    role: "The Gatekeeper",
    description: "The clinical, controlling force that manages Luke’s life. She is the chief architect of the Vanguard prison.",
    tagline: "TO ENCLOSE",
    imageUrl: "https://z-p3-scontent.fcpt1-1.fna.fbcdn.net/v/t51.82787-15/574358563_18494699617075979_6964922146901599829_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGK1-X5Q6X3Byzzf9yJcdcSDoRPhVbmvS8OhE-FVua9LyZPV9BLVIYOJYCq1a5grqFGqalH91W2LEdjst1zWepN&_nc_ohc=wHrhHW62pfEQ7kNvwEDgVD8&_nc_oc=Adn94vvbS2_0ZwXETxXUlcTgRVImnbjgU2M011Bq5OcIiV_XtPHH4xPw4dytSuEIEqc&_nc_zt=23&_nc_ht=z-p3-scontent.fcpt1-1.fna&_nc_gid=l9pCT7ASTBWLhPNFHqRNRQ&oh=00_AfqZtGWmhSU7Hyq2UHCfph-TUH_AlBceyPgakOU2cpEjFA&oe=697AFECE"
  },
  {
    name: "THE CRITIC",
    talent: "Giancarlo Esposito",
    role: "The Analytical Void",
    description: "The judge of the 'Masterpiece'. He measures truth against the cold yardstick of clinical perfection.",
    tagline: "TO DISSECT",
    imageUrl: "https://external-preview.redd.it/giancarlo-esposito-says-his-secret-role-is-an-original-and-v0-EZviJpAjbg38PF_0PJkq_luhZWNyv4voQLX_h-Kfxfo.jpg?width=1080&crop=smart&auto=webp&s=a7a4e6f16b7f90605678460e5c804995a141133c"
  },
  {
    name: "THE PATRON",
    talent: "Charles Dance",
    role: "The Commodity Consumer",
    description: "Old money personified. He views the artist as a specimen under obsidian glass. The consumer of raw truth.",
    tagline: "TO COMMODIFY",
    imageUrl: "https://i.pinimg.com/736x/85/b4/8a/85b48a1eb7ab761553eeb38f72f3ebc2.jpg"
  }
];

const CharacterCard = ({ char }: any) => {
  const [displayUrl, setDisplayUrl] = useState(char.imageUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const [failedOnce, setFailedOnce] = useState(false);

  const handleImageError = async () => {
    if (failedOnce || isGenerating) return;
    setFailedOnce(true);
    setIsGenerating(true);
    
    try {
      const prompt = `Noir cinematic portrait of ${char.talent} as ${char.name}, deep shadows, high contrast blue and amber lighting, 35mm film grain, anamorphic.`;
      const aiImage = await generateCinematicImage(prompt, "3:4");
      if (aiImage) setDisplayUrl(aiImage);
    } catch (err) {
      console.error("Ensemble card regeneration failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="group relative overflow-hidden aspect-[3/4] glass-panel rounded-2xl border border-white/5 bg-[#0a0a0a]">
      {displayUrl ? (
        <img 
          src={displayUrl} 
          alt={char.name} 
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ${isGenerating ? 'opacity-20 blur-xl' : 'opacity-60 group-hover:opacity-100'}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-transparent">
           <span className="text-white/5 font-serif text-9xl select-none">{char.name[0]}</span>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-16 h-[0.5px] bg-white/40 animate-pulse mb-6" />
          <div className="text-[7px] tracking-[1em] text-white/60 font-bold uppercase animate-pulse">
            Splicing Data
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
      
      <div className="absolute bottom-0 left-0 right-0 p-10 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
        <div className="text-[8px] tracking-[0.5em] text-white/30 mb-3 font-bold uppercase">{char.role}</div>
        <h3 className="text-3xl font-serif mb-2 group-hover:text-white transition-colors">{char.name}</h3>
        <div className="text-xs text-white/20 mb-6 italic tracking-widest">{char.talent}</div>
        
        <p className="text-[11px] text-white/40 mb-8 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-1000 max-h-0 group-hover:max-h-32 overflow-hidden font-light">
          {char.description}
        </p>
        
        <div className="inline-block border border-white/10 group-hover:border-white/40 px-5 py-2 rounded-full text-[8px] tracking-[0.3em] text-white/60 font-bold uppercase transition-all group-hover:bg-white group-hover:text-black">
          {char.tagline}
        </div>
      </div>
    </div>
  );
};

const Ensemble = () => {
  return (
    <section id="ensemble" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-[10px] tracking-[0.6em] text-white/20 font-bold mb-6 uppercase">Section II: The Cast</h2>
          <h3 className="text-6xl font-serif italic text-white/80">The Ensemble</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {characters.map((char) => (
            <CharacterCard key={char.name} char={char} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ensemble;
