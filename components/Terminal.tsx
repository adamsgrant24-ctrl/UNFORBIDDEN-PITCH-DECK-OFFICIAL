import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const sequence = [
    "> git add . --force",
    "> git commit -m 'VA_PROTOCOL: Syncing Prospectus v2.4'",
    "> [INFO] Hashing cinematic assets...",
    "> [SUCCESS] 42 keyframes indexed.",
    "> git push origin main",
    "> [CONNECTING] Vanguard Mainframe Server (Cape Town Node)",
    "> [AUTH] RSA Fingerprint: 0x8A22... Verified.",
    "> [TRANS] Sending ensemble_data.json (Ensemble: Charles Dance, Giancarlo Esposito)",
    "> [TRANS] Sending financial_model_v4.xlsx (R1,500,000 Allocation)",
    "> [SYNC] Updating remote 'BLUEPRINT_REPO'...",
    "> [POST] Rebuilding production cache...",
    "> [DONE] GitHub Repository Updated. Integrity: 99.98%"
  ];

  useEffect(() => {
    if (isOpen) {
      setLogs([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          const nextLog = sequence[i];
          if (typeof nextLog === 'string') {
            setLogs(prev => [...prev, nextLog]);
          }
          i++;
        } else {
          clearInterval(interval);
          const completionTimer = setTimeout(() => {
            onComplete();
            onClose();
          }, 1500);
          return () => clearTimeout(completionTimer);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen, onComplete, onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-2xl aspect-video glass-panel rounded-lg border border-amber-500/30 overflow-hidden flex flex-col shadow-[0_0_100px_rgba(245,158,11,0.1)]">
        <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[9px] font-mono tracking-widest text-white/30 uppercase font-bold italic">Vanguard Git Protocol</div>
        </div>
        <div ref={scrollRef} className="flex-grow p-6 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar">
          {logs.map((log, i) => {
            if (typeof log !== 'string') return null;
            const isSuccess = log.includes('[SUCCESS]') || log.includes('[DONE]');
            const isTransfer = log.includes('[TRANS]');
            
            return (
              <div 
                key={i} 
                className={`mb-1 ${isSuccess ? 'text-green-400' : isTransfer ? 'text-amber-500' : 'text-white/70'}`}
              >
                {log}
              </div>
            );
          })}
          <div className="w-2 h-4 bg-white/20 animate-pulse inline-block ml-1" />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
};

export default Terminal;