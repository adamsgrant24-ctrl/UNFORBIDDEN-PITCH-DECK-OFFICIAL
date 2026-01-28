
import React from 'react';

interface FooterProps {
  isSyncComplete?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSyncComplete }) => {
  const buildHash = isSyncComplete ? "0xVANGUARD_42_COMMIT" : "STAGING_BETA_2.4";
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="text-xl font-bold tracking-widest mb-6 text-white">UNFORBIDDEN</div>
            <p className="text-white/30 text-xs leading-relaxed font-light mb-6">
              An independent South African film and art incubator dedicated to the creation of "Prestige-Genre" hybrids.
            </p>
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3 text-white/40">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold">origin/vanguard-main</span>
               </div>
               <div className="flex items-center gap-2 ml-8">
                  <div className={`w-1.5 h-1.5 rounded-full ${isSyncComplete ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Build: {buildHash} | Verified: {timestamp}</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <div className="text-[10px] tracking-widest text-white/20 font-bold mb-4 uppercase">Contact</div>
              <div className="text-xs text-white/50 space-y-2">
                <p>azakhem26@gmail.com</p>
                <p>+27 073 628 5307</p>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-white/20 font-bold mb-4 uppercase">Studio</div>
              <div className="text-xs text-white/50 space-y-2">
                <p>Woodstock Industrial</p>
                <p>Cape Town, ZA</p>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-white/20 font-bold mb-4 uppercase">Partners</div>
              <div className="text-xs text-white/50 space-y-2">
                <p>SAE Institute</p>
                <p>DTI South Africa</p>
                <p>GitHub Open Source</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[9px] tracking-widest text-white/20 uppercase font-bold">
            © 2026 VANGUARD PRODUCTION HOUSE. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[9px] tracking-widest text-white/20 uppercase font-bold italic">
            "Truth is the only masterpiece."
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
