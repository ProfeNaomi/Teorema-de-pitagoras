import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TriangleRight, Info, CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function FundamentalsTab() {
  const [hoveredPart, setHoveredPart] = useState<'a' | 'b' | 'c' | 'angle' | null>(null);
  const [isRightAngle, setIsRightAngle] = useState(true);

  const getPartColor = (part: string) => {
    switch(part) {
      case 'a': return hoveredPart === 'a' ? '#ef4444' : '#f87171'; // Red
      case 'b': return hoveredPart === 'b' ? '#3b82f6' : '#60a5fa'; // Blue
      case 'c': return hoveredPart === 'c' ? '#8b5cf6' : '#a78bfa'; // Purple
      case 'angle': return hoveredPart === 'angle' ? '#f59e0b' : '#fbbf24'; // Amber
      default: return '#cbd5e1'; // slate-300
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Fundamentos Geométricos
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Antes de entender el teorema, debemos conocer a su protagonista exclusivo: el <strong className="text-emerald-600">Triángulo Rectángulo</strong>. El Teorema de Pitágoras SOLO funciona en este tipo de triángulos.
          </p>
        </div>
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl border border-emerald-200 flex items-center justify-center shadow-sm">
          <TriangleRight className="w-8 h-8 text-emerald-600" />
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
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
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
                fill={hoveredPart === 'angle' ? '#fef3c7' : 'transparent'} 
                onMouseEnter={() => setHoveredPart('angle')}
                onMouseLeave={() => setHoveredPart(null)}
                className="cursor-pointer transition-colors duration-300"
              />

              {/* Triangle Background fill */}
              <polygon points="10,10 10,90 90,90" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

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
              className={`absolute top-1/2 -left-8 -translate-y-1/2 font-bold transition-all duration-300 ${hoveredPart === 'a' ? 'text-red-500 scale-125' : 'text-red-400'}`}
            >
              a
            </div>
            <div 
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold transition-all duration-300 ${hoveredPart === 'b' ? 'text-blue-500 scale-125' : 'text-blue-400'}`}
            >
              b
            </div>
            <div 
              className={`absolute top-1/2 left-1/2 font-bold transition-all duration-300 ${hoveredPart === 'c' ? 'text-purple-500 scale-125' : 'text-purple-400'}`}
              style={{ transform: 'translate(10px, -20px)' }}
            >
              c
            </div>
          </div>
        </div>

        {/* Definitions */}
        <div className="flex flex-col gap-4">
          <div 
            className={`glass-panel p-6 rounded-2xl border-l-[6px] transition-colors duration-300 ${hoveredPart === 'angle' ? 'border-amber-400 bg-amber-50' : 'border-slate-200'}`}
            onMouseEnter={() => setHoveredPart('angle')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xl">
              El Ángulo Recto <span className="text-amber-500 text-lg">(90°)</span>
            </h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Es el ángulo que mide exactamente 90 grados. Forma una esquina perfecta (como la letra L o la esquina de un cuadrado). Es la característica que define al triángulo rectángulo.
            </p>
          </div>

          <div 
            className={`glass-panel p-6 rounded-2xl border-l-[6px] transition-colors duration-300 ${hoveredPart === 'a' || hoveredPart === 'b' ? 'border-blue-400 bg-blue-50' : 'border-slate-200'}`}
            onMouseEnter={() => setHoveredPart('b')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xl">
              Los Catetos <span className="text-red-500">a</span> y <span className="text-blue-500">b</span>
            </h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Son los dos lados más cortos del triángulo. Tienen una propiedad especial: son los dos lados que "tocan" y forman el ángulo recto de 90 grados.
            </p>
          </div>

          <div 
            className={`glass-panel p-6 rounded-2xl border-l-[6px] transition-colors duration-300 ${hoveredPart === 'c' ? 'border-purple-400 bg-purple-50' : 'border-slate-200'}`}
            onMouseEnter={() => setHoveredPart('c')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-xl">
              La Hipotenusa <span className="text-purple-500">c</span>
            </h4>
            <p className="text-base text-slate-600 leading-relaxed">
              Es el lado más largo del triángulo. Siempre se encuentra exactamente en el lado opuesto al ángulo recto. Nunca toca el ángulo de 90 grados.
            </p>
          </div>
          
          <div className="mt-4 bg-sky-50 p-5 rounded-xl border border-sky-200 text-base flex gap-3 text-sky-900 items-start shadow-sm">
            <Info className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
            <p>
              El Teorema de Pitágoras establece una relación matemática perfecta entre estos tres lados. Si conoces la medida de dos de ellos, <strong>siempre puedes calcular el tercero</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Recíproco del Teorema Section */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600 mb-4">
          El Recíproco del Teorema
        </h3>
        <p className="text-xl text-slate-600 mb-8 max-w-4xl leading-relaxed">
          El Teorema funciona en ambos sentidos. <strong>Si en un triángulo se cumple la ecuación <InlineMath math="a^2 + b^2 = c^2" />, ENTONCES es obligatorio que el triángulo tenga un ángulo recto (90°)</strong>. Si la ecuación no calza, el triángulo está "descuadrado" y no es rectángulo.
        </p>
        
        <div className="glass-panel p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <div className={`p-6 rounded-2xl border-l-[6px] transition-colors duration-500 shadow-sm ${isRightAngle ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'}`}>
              {isRightAngle ? (
                <>
                  <h4 className="font-bold text-emerald-700 text-2xl mb-4 flex items-center gap-2"><CheckCircle className="w-7 h-7" /> Sí se cumple la igualdad</h4>
                  <div className="text-slate-700 text-xl flex flex-col gap-2 bg-white/50 p-4 rounded-xl">
                    <BlockMath math="3^2 + 4^2 = 5^2" />
                    <BlockMath math="9 + 16 = 25" />
                  </div>
                  <p className="text-emerald-800 font-bold mt-4 text-center text-lg">¡El ángulo es perfectamente recto (90°)!</p>
                </>
              ) : (
                <>
                  <h4 className="font-bold text-red-700 text-2xl mb-4 flex items-center gap-2"><XCircle className="w-7 h-7" /> No se cumple la igualdad</h4>
                  <div className="text-slate-700 text-xl flex flex-col gap-2 bg-white/50 p-4 rounded-xl">
                    <BlockMath math="3^2 + 4^2 \neq 5.5^2" />
                    <BlockMath math="25 \neq 30.25" />
                  </div>
                  <p className="text-red-800 font-bold mt-4 text-center text-lg">El ángulo es mayor a 90°. El triángulo se "abre".</p>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setIsRightAngle(!isRightAngle)}
              className={`w-full py-5 rounded-2xl font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 text-lg ${isRightAngle ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
            >
              {isRightAngle ? 'Ver qué pasa si "c" es más largo (no se cumple)' : 'Volver al triángulo rectángulo perfecto'}
            </button>
          </div>
          
          <div className="relative h-[300px] flex items-center justify-center bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden">
             <svg viewBox="-40 -20 160 140" className="w-full h-full max-w-[250px] overflow-visible">
                {/* Dynamic Polygon */}
                <motion.polygon 
                  animate={{ 
                    points: isRightAngle ? "0,100 80,100 0,40" : "0,100 80,100 -30,50",
                    fill: isRightAngle ? "#ecfdf5" : "#fef2f2",
                    stroke: isRightAngle ? "#10b981" : "#ef4444"
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  strokeWidth="2"
                />
                
                {/* Leg B */}
                <line x1="0" y1="100" x2="80" y2="100" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                <text x="40" y="115" textAnchor="middle" className="font-bold fill-blue-600">b = 4</text>
                
                {/* Leg A */}
                <motion.line 
                  x1="0" y1="100" 
                  animate={{ x2: isRightAngle ? 0 : -30, y2: isRightAngle ? 40 : 50 }} 
                  stroke="#ef4444" strokeWidth="4" strokeLinecap="round"
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
                <motion.text 
                  animate={{ x: isRightAngle ? -15 : -35, y: isRightAngle ? 70 : 80 }} 
                  textAnchor="middle" className="font-bold fill-red-600"
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >a = 3</motion.text>
                
                {/* Hypotenuse C */}
                <motion.line 
                  x1="80" y1="100" 
                  animate={{ x2: isRightAngle ? 0 : -30, y2: isRightAngle ? 40 : 50 }} 
                  stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round"
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
                <motion.text 
                  animate={{ x: isRightAngle ? 45 : 30, y: isRightAngle ? 65 : 60 }} 
                  textAnchor="middle" className="font-bold fill-purple-600"
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >c = {isRightAngle ? '5' : '5.5'}</motion.text>

                {/* Angle Indicator */}
                {isRightAngle ? (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <rect x="0" y="85" width="15" height="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                    <text x="8" y="115" textAnchor="middle" className="text-[10px] font-bold fill-amber-600">90°</text>
                  </motion.g>
                ) : (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <path d="M 0,80 A 20,20 0 0,0 -16.5,88.5" fill="none" stroke="#f59e0b" strokeWidth="3" />
                    <text x="-15" y="115" textAnchor="middle" className="text-[10px] font-bold fill-amber-600">120°</text>
                  </motion.g>
                )}
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
