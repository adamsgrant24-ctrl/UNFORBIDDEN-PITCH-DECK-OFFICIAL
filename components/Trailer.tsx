import React, { useState, useEffect, useRef } from 'react';
import { generateCinematicImage, generateTrailerVoiceover, decodeBase64, decodeAudioData } from '../services/geminiService.ts';

interface TrailerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Scene {
  text: string;
  voiceover: string;
  imagePrompt: string;
  duration: number; // in ms
}

const scenes: Scene[] = [
  {
    text: "THE WORLD IS A GRID OF STERILE EXPECTATIONS.",
    voiceover: "The world is a grid of sterile expectations.",
    imagePrompt: "Extreme close up of a human eye reflecting a grid of sterile blue lights, high contrast, cinematic noir.",
    duration: 5000
  },
  {
    text: "A MASTERPIECE BUILT TO ENCLOSE THE SOUL.",
    voiceover: "A masterpiece of obsidian and glass. Built to enclose the pulse.",
    imagePrompt: "Wide shot of a colossal brutalist obsidian tower in a snowy white void, symmetrical, 35mm anamorphic.",
    duration: 6000
  },
  {
    text: "BUT TRUTH IS AN UNFORBIDDEN FRICTION.",
    voiceover: "But truth... truth is an unforbidden friction that cannot be silenced.",
    imagePrompt: "A woman standing at the edge of a cliff made of mirrors, looking into a stormy dark ocean, neon orange highlights.",
    duration: 6000
  },
  {
    text: "SHATTER THE MASK.",
    voiceover: "Shatter the mask. Execute the action.",
    imagePrompt: "A man's hands covered in charcoal dust smashing a glass pane, shards flying in slow motion, dramatic lighting.",
    duration: 5000
  },
  {
    text: "UNFORBIDDEN",
    voiceover: "UNFORBIDDEN. Part One: The Awakening.",
    imagePrompt: "Glowing white logo text 'UNFORBIDDEN' floating in a dark infinite void with subtle smoke and anamorphic flares.",
    duration: 8000
  }
];

const Trailer: React.FC<TrailerProps> = ({ isOpen, onClose }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const [audioBuffers, setAudioBuffers] = useState<Record<number, AudioBuffer>>({});
  const [isBuffering, setIsBuffering] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (activeSourceRef.current) activeSourceRef.current.stop();
      return;
    }

    const loadTrailer = async () => {
      setIsBuffering(true);
      setError(null);
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Parallel load of first few scenes for fast start
        const loadPromises = scenes.map(async (scene, idx) => {
          const imgPromise = generateCinematicImage(scene.imagePrompt, "16:9");
          const audioPromise = generateTrailerVoiceover(scene.voiceover);
          
          const [img, audioBase64] = await Promise.all([imgPromise, audioPromise]);
          
          if (img) setImages(prev => ({ ...prev, [idx]: img }));
          if (audioBase64 && audioContextRef.current) {
            const bytes = decodeBase64(audioBase64);
            const buffer = await decodeAudioData(bytes, audioContextRef.current, 24000, 1);
            setAudioBuffers(prev => ({ ...prev, [idx]: buffer }));
          }
        });

        // Wait for first 2 scenes to be ready before starting
        await Promise.all(loadPromises.slice(0, 2));
        setIsReady(true);
        setIsBuffering(false);
        startScene(0);
      } catch (err) {
        console.error("Trailer loading failed", err);
        setError("Synchronization failed. Check API key or quota.");
        setIsBuffering(false);
      }
    };

    loadTrailer();
    return () => {
      if (activeSourceRef.current) activeSourceRef.current.stop();
    };
  }, [isOpen]);

  const startScene = (idx: number) => {
    if (idx >= scenes.length) {
      setTimeout(onClose, 2000);
      return;
    }

    setCurrentSceneIdx(idx);
    setProgress(0);

    // Play Audio
    const buffer = audioBuffers[idx];
    if (buffer && audioContextRef.current) {
      if (activeSourceRef.current) activeSourceRef.current.stop();
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      activeSourceRef.current = source;
    }

    // Progress bar and next scene trigger
    const sceneDuration = scenes[idx].duration;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / sceneDuration) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        startScene(idx + 1);
      }
    }, 50);

    return () => clearInterval(timer);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Letterbox Bars */}
      <div className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-50 border-b border-white/5 flex items-center justify-between px-10">
        <div className="text-[10px] tracking-[0.4em] font-bold text-white/30 uppercase">Inquiry Phase: Active</div>
        <button onClick={onClose} className="text-white/40 hover:text-white text-xs tracking-widest font-bold">CLOSE PROTOCOL</button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-50 border-t border-white/5 flex items-center justify-center">
         <div className="w-1/2 h-[1px] bg-white/10 relative">
            <div className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
         </div>
      </div>

      {/* Main Screen */}
      <div className="relative w-full aspect-[2.39/1] overflow-hidden">
        {isBuffering && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-6" />
            <div className="text-sm tracking-[0.6em] text-white animate-pulse uppercase">Synthesizing Masterpiece</div>
          </div>
        )}

        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black px-10 text-center">
                <div className="text-red-500 text-sm tracking-widest mb-4 uppercase font-bold">{error}</div>
                <button onClick={onClose} className="text-white/40 border border-white/20 px-6 py-2 rounded-full text-xs">Return to Dashboard</button>
            </div>
        )}

        {isReady && scenes.map((scene, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSceneIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          >
            {images[idx] ? (
              <div 
                className="w-full h-full bg-cover bg-center animate-ken-burns"
                style={{ backgroundImage: `url(${images[idx]})` }}
              />
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="text-white/10 text-xs tracking-widest uppercase">Fetching Keyframe...</div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            <div className="absolute inset-0 flex items-center justify-center px-20 text-center pointer-events-none">
              <h2 className="text-2xl md:text-5xl font-serif italic text-white/90 tracking-tight drop-shadow-2xl animate-text-reveal">
                {scene.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: ken-burns 15s ease-out infinite alternate;
        }
        @keyframes text-reveal {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-text-reveal {
          animation: text-reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Trailer;