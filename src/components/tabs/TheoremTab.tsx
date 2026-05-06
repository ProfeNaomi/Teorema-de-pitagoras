import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, Shapes, BookOpen } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';

export function TheoremTab() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
            El Teorema y Su Fórmula
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            La joya de la corona. El Teorema de Pitágoras establece que, en todo triángulo rectángulo, el cuadrado de la longitud de la hipotenusa es igual a la suma de los cuadrados de las longitudes de los catetos.
          </p>
        </div>
        <div className="w-16 h-16 bg-pink-50 rounded-2xl border border-pink-200 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.1)]">
          <Calculator className="w-8 h-8 text-pink-500" />
        </div>
      </div>

      {/* Main Formula Display */}
      <div className="glass-panel p-8 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-pink-50" />
        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6 relative z-10">La Ecuación Fundamental</h3>
        <div className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 filter drop-shadow-sm relative z-10">
          <BlockMath math="c^2 = a^2 + b^2" />
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base relative z-10">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <InlineMath math="c" /> = <span className="text-purple-600 font-semibold">Hipotenusa</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <InlineMath math="a, b" /> = <span className="text-blue-600 font-semibold">Catetos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pythagorean Triples */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-2xl border-t-4 border-t-amber-400">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Shapes className="w-5 h-5 text-amber-500" />
            Ternas Pitagóricas
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Son conjuntos de tres números enteros positivos que cumplen exactamente con el teorema. Son los "favoritos" de los profesores porque no dan decimales.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-sm space-y-2">
            <div className="flex items-center justify-between text-amber-700 bg-amber-100 px-3 py-2 rounded">
              <span>3, 4, 5</span>
              <span><InlineMath math="3^2 + 4^2 = 5^2 \Rightarrow 9 + 16 = 25" /></span>
            </div>
            <div className="flex items-center justify-between text-slate-600 px-3 py-2">
              <span>5, 12, 13</span>
              <span><InlineMath math="25 + 144 = 169" /></span>
            </div>
            <div className="flex items-center justify-between text-slate-600 px-3 py-2">
              <span>8, 15, 17</span>
              <span><InlineMath math="64 + 225 = 289" /></span>
            </div>
          </div>
        </motion.div>

        {/* The Dark Side - Irrationals */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-2xl border-t-4 border-t-slate-400">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-500" />
            El Lado Oscuro: <InlineMath math="\sqrt{2}" />
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Los pitagóricos creían que todos los números eran racionales (fracciones perfectas). Pero al aplicar el teorema a un cuadrado de lado 1, la diagonal resultó ser <InlineMath math="\sqrt{1^2 + 1^2} = \sqrt{2}" />.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-3 italic">
              "El descubrimiento de los números irracionales fue un secreto tan perturbador que cuenta la leyenda que ahogaron a Hípaso de Metaponto por revelarlo."
            </p>
            <div className="text-center font-mono text-slate-500 text-xs break-all">
              1.4142135623730950488016887242096...
            </div>
          </div>
        </motion.div>

        {/* The Reciprocal */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-2xl md:col-span-2 border-l-4 border-l-sky-400">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            El Recíproco del Teorema
          </h3>
          <p className="text-slate-600 text-sm mb-4 max-w-3xl">
            El teorema también funciona al revés. Si tienes un triángulo con tres lados <InlineMath math="a, b, c" /> y descubres que la ecuación <InlineMath math="a^2 + b^2 = c^2" /> se cumple mágicamente, entonces <strong>puedes afirmar con 100% de seguridad que el triángulo es rectángulo</strong>. Esta es la técnica matemática para "verificar" ángulos rectos en construcción sin usar un transportador.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
