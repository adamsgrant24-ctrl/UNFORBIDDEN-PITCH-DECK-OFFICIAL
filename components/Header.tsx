
import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'vision', label: 'THE VISION' },
    { id: 'ensemble', label: 'ENSEMBLE' },
    { id: 'methodology', label: 'METHODOLOGY' },
    { id: 'revenue', label: 'REVENUE' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold tracking-widest text-white">
            UNFORBIDDEN
          </div>
          <div className="h-4 w-[1px] bg-white/20 hidden md:block" />
          <div className="text-[10px] tracking-[0.3em] text-white/40 hidden md:block">
            VANGUARD PRODUCTION HOUSE
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                el?.scrollIntoView({ behavior: 'smooth' });
                setActiveTab(item.id);
              }}
              className={`text-[11px] tracking-widest font-bold transition-colors ${
                activeTab === item.id ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => document.getElementById('investor')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-black text-[10px] tracking-widest font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-all uppercase"
        >
          Investor Access
        </button>
      </div>
    </header>
  );
};

export default Header;
