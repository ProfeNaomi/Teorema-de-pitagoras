import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TriangleRight, Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export function FundamentalsTab() {
  const [hoveredPart, setHoveredPart] = useState<'a' | 'b' | 'c' | 'angle' | null>(null);

  const getPartColor = (part: string) => {
    switch(part) {
      case 'a': return hoveredPart === 'a' ? '#ef4444' : '#f87171'; // Red
      case 'b': return hoveredPart === 'b' ? '#3b82f6' : '#60a5fa'; // Blue
      case 'c': return hoveredPart === 'c' ? '#8b5cf6' : '#a78bfa'; // Purple
      case 'angle': return hoveredPart === 'angle' ? '#f59e0b' : '#fbbf24'; // Amber
      default: return '#94a3b8';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">
            Fundamentos Geométricos
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Antes de entender el teorema, debemos conocer a su protagonista exclusivo: el <strong className="text-emerald-400">Triángulo Rectángulo</strong>. El Teorema de Pitágoras SOLO funciona en este tipo de triángulos.
          </p>
        </div>
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <TriangleRight className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Interactive SVG Graphic */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center relative min-h-[400px]">
          <h3 className="absolute top-6 left-6 text-sm font-bold tracking-widest uppercase text-slate-400">
            Anatomía del Triángulo
          </h3>
          <p className="absolute top-12 left-6 text-xs text-slate-500">Pasa el mouse sobre las partes</p>
          
          <div className="relative w-64 h-64 mt-8">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Angle symbol (90 degrees) */}
              <motion.path 
                d="M 10,80 L 10,90 L 20,90" 
                fill="none" 
                stroke={getPartColor('angle')} 
                strokeWidth="2"
                onMouseEnter={() => setHoveredPart('angle')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-colors duration-300"
              />
              <motion.rect 
                x="10" y="80" width="10" height="10" 
                fill={hoveredPart === 'angle' ? '#f59e0b20' : 'transparent'} 
                onMouseEnter={() => setHoveredPart('angle')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-colors duration-300"
              />

              {/* Triangle Background fill */}
              <polygon points="10,10 10,90 90,90" fill="#1e293b" opacity="0.5" />

              {/* Leg A (Vertical) */}
              <motion.line 
                x1="10" y1="10" x2="10" y2="90" 
                stroke={getPartColor('a')} 
                strokeWidth={hoveredPart === 'a' ? '6' : '4'}
                strokeLinecap="round"
                filter={hoveredPart === 'a' ? "url(#glow)" : ""}
                onMouseEnter={() => setHoveredPart('a')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-all duration-300"
              />

              {/* Leg B (Horizontal) */}
              <motion.line 
                x1="10" y1="90" x2="90" y2="90" 
                stroke={getPartColor('b')} 
                strokeWidth={hoveredPart === 'b' ? '6' : '4'}
                strokeLinecap="round"
                filter={hoveredPart === 'b' ? "url(#glow)" : ""}
                onMouseEnter={() => setHoveredPart('b')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-all duration-300"
              />

              {/* Hypotenuse C */}
              <motion.line 
                x1="10" y1="10" x2="90" y2="90" 
                stroke={getPartColor('c')} 
                strokeWidth={hoveredPart === 'c' ? '6' : '4'}
                strokeLinecap="round"
                filter={hoveredPart === 'c' ? "url(#glow)" : ""}
                onMouseEnter={() => setHoveredPart('c')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-all duration-300"
              />
            </svg>

            {/* Labels overlay */}
            <div 
              className={`absolute top-1/2 -left-8 -translate-y-1/2 font-bold transition-all duration-300 ${hoveredPart === 'a' ? 'text-red-400 scale-125' : 'text-red-300'}`}
            >
              a
            </div>
            <div 
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold transition-all duration-300 ${hoveredPart === 'b' ? 'text-blue-400 scale-125' : 'text-blue-300'}`}
            >
              b
            </div>
            <div 
              className={`absolute top-1/2 left-1/2 font-bold transition-all duration-300 ${hoveredPart === 'c' ? 'text-purple-400 scale-125' : 'text-purple-300'}`}
              style={{ transform: 'translate(10px, -20px)' }}
            >
              c
            </div>
          </div>
        </div>

        {/* Definitions */}
        <div className="flex flex-col gap-4">
          <div 
            className={`glass-panel p-5 rounded-2xl border-l-4 transition-colors duration-300 ${hoveredPart === 'angle' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-700'}`}
            onMouseEnter={() => setHoveredPart('angle')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-white mb-1 flex items-center gap-2">
              El Ángulo Recto <span className="text-amber-400 text-sm">(90°)</span>
            </h4>
            <p className="text-sm text-slate-400">
              Es el ángulo que mide exactamente 90 grados. Forma una esquina perfecta (como la letra L o la esquina de un cuadrado). Es la característica que define al triángulo rectángulo.
            </p>
          </div>

          <div 
            className={`glass-panel p-5 rounded-2xl border-l-4 transition-colors duration-300 ${hoveredPart === 'a' || hoveredPart === 'b' ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700'}`}
            onMouseEnter={() => setHoveredPart('b')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-white mb-1 flex items-center gap-2">
              Los Catetos <span className="text-red-400">a</span> y <span className="text-blue-400">b</span>
            </h4>
            <p className="text-sm text-slate-400">
              Son los dos lados más cortos del triángulo. Tienen una propiedad especial: son los dos lados que "tocan" y forman el ángulo recto de 90 grados.
            </p>
          </div>

          <div 
            className={`glass-panel p-5 rounded-2xl border-l-4 transition-colors duration-300 ${hoveredPart === 'c' ? 'border-purple-500 bg-purple-500/5' : 'border-slate-700'}`}
            onMouseEnter={() => setHoveredPart('c')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-white mb-1 flex items-center gap-2">
              La Hipotenusa <span className="text-purple-400">c</span>
            </h4>
            <p className="text-sm text-slate-400">
              Es el lado más largo del triángulo. Siempre se encuentra exactamente en el lado opuesto al ángulo recto. Nunca toca el ángulo de 90 grados.
            </p>
          </div>
          
          <div className="mt-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-sm flex gap-3 text-slate-300 items-start">
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p>
              El Teorema de Pitágoras establece una relación matemática perfecta entre estos tres lados. Si conoces la medida de dos de ellos, <strong className="text-sky-300">siempre puedes calcular el tercero</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
