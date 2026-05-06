import React from 'react';
import { motion } from 'motion/react';
import { History, Map, Landmark, Navigation } from 'lucide-react';

export function OriginTab() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400 mb-4">
            El Origen del Teorema
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Aunque lleva el nombre de Pitágoras de Samos, un filósofo griego del siglo VI a.C., la relación matemática ya era conocida por civilizaciones antiguas mucho antes de su nacimiento.
          </p>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center shadow-lg relative overflow-hidden">
           <Landmark className="w-24 h-24 text-violet-500/20 absolute -right-4 -bottom-4" />
           <div className="text-center z-10">
             <History className="w-12 h-12 text-violet-400 mx-auto mb-2" />
             <span className="font-medium text-slate-300 text-sm">Viaje en el Tiempo</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <h3 className="text-xl font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 rounded-lg"><Map className="w-5 h-5" /></span>
            Egipto y la Cuerda de 12 Nudos
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Los constructores egipcios usaban una cuerda con 12 nudos equidistantes para formar un triángulo de lados 3, 4 y 5. Al tensarla, garantizaban ángulos rectos perfectos (90°) para la construcción de pirámides y canales.
          </p>
          <div className="w-full h-24 bg-slate-900/50 rounded-xl flex items-center justify-center border border-slate-700/30">
            <div className="flex gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
          <h3 className="text-xl font-semibold text-sky-400 mb-3 flex items-center gap-2">
            <span className="p-2 bg-sky-500/10 rounded-lg"><Landmark className="w-5 h-5" /></span>
            Las Tablillas de Babilonia
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Los babilonios dejaron registros en arcilla (como la tablilla Plimpton 322, aprox. 1800 a.C.) que demuestran un conocimiento profundo de conjuntos de números que cumplen el teorema, conocidos como ternas pitagóricas.
          </p>
          <div className="w-full h-24 bg-slate-900/50 rounded-xl flex items-center justify-center border border-slate-700/30 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
            <span className="font-mono text-sky-400/80 tracking-widest text-lg font-bold">119 · 120 · 169</span>
          </div>
        </motion.div>
      </div>

      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden mt-8 border-l-4 border-l-violet-500">
        <div className="absolute right-0 top-0 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <Navigation className="w-7 h-7 text-violet-400" />
          ¿Por qué importa hoy?
        </h3>
        <p className="text-slate-300 leading-relaxed mb-6 max-w-3xl">
          El teorema de Pitágoras es el núcleo de cómo medimos distancias en nuestro universo. Sin él, la tecnología moderna no podría existir. Es la base de la geometría analítica y se utiliza en:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <h4 className="font-semibold text-emerald-400 mb-2">Sistema GPS</h4>
            <p className="text-xs text-slate-400">Calcula tu posición exacta triangulando la distancia entre tu dispositivo y los satélites en órbita usando matemáticas en 3D.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <h4 className="font-semibold text-pink-400 mb-2">Arquitectura</h4>
            <p className="text-xs text-slate-400">Asegura cimientos estables, techos con inclinaciones perfectas y estructuras perfectamente rectangulares.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <h4 className="font-semibold text-sky-400 mb-2">Videojuegos (3D)</h4>
            <p className="text-xs text-slate-400">Motores gráficos lo utilizan constantemente para calcular distancias entre objetos, colisiones y renderizado de gráficos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
