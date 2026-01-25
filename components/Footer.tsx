
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="text-xl font-bold tracking-widest mb-6">UNFORBIDDEN</div>
            <p className="text-white/30 text-xs leading-relaxed font-light">
              An independent South African film and art incubator dedicated to the creation of "Prestige-Genre" hybrids.
            </p>
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
