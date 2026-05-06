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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Header Navigation */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:h-16 gap-4 py-4 lg:py-0">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
                <Triangle size={20} className="fill-indigo-100" />
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Teorema de Pitágoras
              </h1>
            </div>
            
            {/* Tabs */}
            <nav className="flex-1 flex overflow-x-auto hide-scrollbar -mb-[17px] lg:mb-0 lg:ml-8 gap-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap text-sm font-medium
                      ${isActive 
                        ? 'border-indigo-600 text-indigo-700' 
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`}
                  >
                    <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
      </main>

    </div>
  );
}

