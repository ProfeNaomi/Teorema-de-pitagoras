import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Triangle, Ruler, Image as ImageIcon, AlertTriangle, PenTool } from 'lucide-react';
import { OriginTab } from './components/tabs/OriginTab';
import { FundamentalsTab } from './components/tabs/FundamentalsTab';
import { TheoremTab } from './components/tabs/TheoremTab';
import { ProofsGalleryTab } from './components/tabs/ProofsGalleryTab';
import { AntiPatternsTab } from './components/tabs/AntiPatternsTab';
import { PracticeQuizTab } from './components/tabs/PracticeQuizTab';

type TabId = 'origin' | 'fundamentals' | 'theorem' | 'proofs' | 'antipatterns' | 'practice';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('origin');

  const tabs = [
    { id: 'origin', label: 'El Origen', icon: BookOpen },
    { id: 'fundamentals', label: 'Fundamentos', icon: Triangle },
    { id: 'theorem', label: 'El Teorema', icon: Ruler },
    { id: 'proofs', label: 'Demostraciones', icon: ImageIcon },
    { id: 'antipatterns', label: 'Errores Comunes', icon: AlertTriangle },
    { id: 'practice', label: 'Práctica y Quiz', icon: PenTool },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-background)] text-[var(--color-foreground)] overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400 uppercase">
            Pitágoras
          </h1>
          <p className="text-slate-400 text-xs mt-1">Plataforma Educativa v2.0</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm font-medium
                  ${isActive 
                    ? 'bg-violet-600/20 text-violet-300 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border border-violet-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                  }`}
              >
                <Icon size={18} className={isActive ? "text-violet-400" : "text-slate-500"} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 mt-auto hidden md:block">
           <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-2 rounded-lg border border-emerald-400/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistema Conectado
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-950/95 pointer-events-none" />
        <div className="relative p-6 md:p-10 max-w-[1200px] mx-auto min-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full"
            >
              {activeTab === 'origin' && <OriginTab />}
              {activeTab === 'fundamentals' && <FundamentalsTab />}
              {activeTab === 'theorem' && <TheoremTab />}
              {activeTab === 'proofs' && <ProofsGalleryTab />}
              {activeTab === 'antipatterns' && <AntiPatternsTab />}
              {activeTab === 'practice' && <PracticeQuizTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}

