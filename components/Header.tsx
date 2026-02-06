import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSyncTrigger: () => void;
  isSyncComplete: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onSyncTrigger, isSyncComplete }) => {
  const navItems = [
    { id: 'vision', label: 'THE VISION' },
    { id: 'ensemble', label: 'ENSEMBLE' },
    { id: 'methodology', label: 'METHODOLOGY' },
    { id: 'revenue', label: 'REVENUE' },
    { id: 'prospectus', label: 'PROSPECTUS' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold tracking-[0.2em] text-white">
            UNFORBIDDEN
          </div>
          <div className="h-6 w-[1px] bg-white/20 hidden xl:block" />
          <div className="text-[9px] tracking-[0.4em] text-white/30 hidden xl:block uppercase font-bold">
            VANGUARD PRODUCTION HOUSE
          </div>
        </div>

        <nav className="hidden lg:flex items-center xl:space-x-14 lg:space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                el?.scrollIntoView({ behavior: 'smooth' });
                setActiveTab(item.id);
              }}
              className={`text-[10px] tracking-[0.25em] font-bold transition-all duration-500 whitespace-nowrap ${
                activeTab === item.id 
                  ? 'text-white border-b border-white/40 pb-1' 
                  : 'text-white/40 hover:text-white pb-1 border-b border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          
          <button 
            onClick={onSyncTrigger}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isSyncComplete ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
            <span className={`text-[9px] font-mono tracking-widest ${isSyncComplete ? 'text-white/40' : 'text-amber-500/80'} group-hover:text-white transition-colors uppercase font-bold`}>
              {isSyncComplete ? 'REPO_SYNCED' : 'COMMIT_PENDING'}
            </span>
          </button>
        </nav>

        <button 
          onClick={() => document.getElementById('investor')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-black text-[9px] tracking-[0.3em] font-bold px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-all uppercase shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
        >
          Investor Access
        </button>
      </div>
    </header>
  );
};

export default Header;