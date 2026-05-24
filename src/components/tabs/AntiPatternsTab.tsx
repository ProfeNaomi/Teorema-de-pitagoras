import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, XCircle, Skull, TriangleAlert } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

export function AntiPatternsTab() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            El Cementerio de Errores
          </h2>
          <p className="text-slate-600 text-xl leading-relaxed">
            Incluso los mejores matemáticos cometen errores, pero en el Teorema de Pitágoras existen "trampas" clásicas en las que cae el 90% de los estudiantes. ¡Conócelas para evitarlas!
          </p>
        </div>
        <div className="w-20 h-20 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          <Skull className="w-10 h-10 text-red-500" />
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-8">
        {/* Error 1 */}
        <motion.div whileHover={{ scale: 1.01 }} className="glass-panel p-8 rounded-3xl border-l-[6px] border-l-red-500 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <XCircle className="w-40 h-40 text-red-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm">1</span>
            El Síndrome del Triángulo Cualquiera
          </h3>
          <p className="text-slate-600 text-lg mb-6 max-w-4xl">
            Usar la fórmula <InlineMath math="a^2 + b^2 = c^2" /> en triángulos que NO tienen un ángulo de 90°.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-red-200 max-w-4xl">
            <div className="flex items-center gap-2 text-red-600 mb-3 font-extrabold text-lg">
              <XCircle className="w-6 h-6" /> Error:
            </div>
            <p className="text-slate-500 text-base italic">"Veo un triángulo con lados 5 y 7. ¡Voy a usar Pitágoras para sacar el otro lado!"</p>
            <div className="mt-4 text-emerald-600 text-base font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              ✔ Solución: Verifica SIEMPRE que exista un ángulo recto antes de empezar. Si no lo hay, debes usar el Teorema del Coseno o del Seno.
            </div>
          </div>
        </motion.div>

        {/* Error 2 */}
        <motion.div whileHover={{ scale: 1.01 }} className="glass-panel p-8 rounded-3xl border-l-[6px] border-l-orange-500 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <XCircle className="w-40 h-40 text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm">2</span>
            Identidad Equivocada (La Hipotenusa Falsa)
          </h3>
          <p className="text-slate-600 text-lg mb-6 max-w-4xl">
            Confundir un cateto con la hipotenusa. Si te dan un triángulo con cateto 3 e hipotenusa 5, ¡el otro cateto no es <InlineMath math="\sqrt{3^2 + 5^2}" />!
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-orange-200 max-w-4xl">
            <div className="flex items-center gap-2 text-orange-600 mb-4 font-extrabold text-lg">
              <XCircle className="w-6 h-6" /> Error en Ecuación:
            </div>
            <div className="text-slate-500 text-xl mb-4 bg-white p-3 rounded-lg border border-slate-200 inline-block">
              <BlockMath math="x^2 = 3^2 + 5^2 \Rightarrow x = \sqrt{34}" />
            </div>
            <div className="text-emerald-600 text-base font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              ✔ Solución Correcta: La hipotenusa siempre va sola de un lado de la ecuación. <br/>
              <span className="inline-block mt-3 font-mono bg-white border border-emerald-200 px-4 py-2 rounded-lg text-lg text-emerald-700 shadow-sm">
                5² = 3² + x² ➔ 25 - 9 = x² ➔ x = 4
              </span>
            </div>
          </div>
        </motion.div>

        {/* Error 3 */}
        <motion.div whileHover={{ scale: 1.01 }} className="glass-panel p-8 rounded-3xl border-l-[6px] border-l-yellow-500 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <XCircle className="w-40 h-40 text-yellow-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm">3</span>
            Amnesia de Raíz Cuadrada
          </h3>
          <p className="text-slate-600 text-lg mb-6 max-w-4xl">
            Olvidarse de sacar la raíz cuadrada al final del cálculo. Es el error por "apuro" más común en exámenes.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-yellow-200 max-w-4xl">
            <div className="flex items-center gap-2 text-yellow-600 mb-4 font-extrabold text-lg">
              <XCircle className="w-6 h-6" /> Conclusión Prematura:
            </div>
            <div className="text-slate-500 text-lg mb-3 bg-white p-3 rounded-lg border border-slate-200 inline-block">
              <InlineMath math="c^2 = 3^2 + 4^2 \Rightarrow c^2 = 9 + 16 \Rightarrow c^2 = 25" />
            </div>
            <p className="text-slate-500 text-base italic mb-4">"¡Listo! La hipotenusa mide 25 metros." (Imposible, el lado sería larguísimo comparado con los otros).</p>
            <div className="text-emerald-600 text-base font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              ✔ Solución: <span className="mx-2 bg-white px-2 py-1 rounded border border-emerald-200"><InlineMath math="c = \sqrt{25} = 5" /></span>. Siempre pregúntate: ¿Tiene sentido esta medida?
            </div>
          </div>
        </motion.div>

        {/* Error 4 */}
        <motion.div whileHover={{ scale: 1.01 }} className="glass-panel p-8 rounded-3xl border-l-[6px] border-l-pink-500 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <XCircle className="w-40 h-40 text-pink-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm">4</span>
            Álgebra Falsa (Sumar antes de elevar)
          </h3>
          <p className="text-slate-600 text-lg mb-6 max-w-4xl">
            Un error catastrófico de álgebra. Asumir que <InlineMath math="(a + b)^2" /> es lo mismo que <InlineMath math="a^2 + b^2" />.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-pink-200 max-w-4xl">
            <div className="flex items-center gap-2 text-pink-600 mb-4 font-extrabold text-lg">
              <XCircle className="w-6 h-6" /> Falacia Matemática:
            </div>
            <div className="text-slate-600 text-xl mb-4 bg-white p-3 rounded-lg border border-slate-200 inline-block text-red-600">
              <BlockMath math="\sqrt{a^2 + b^2} \neq a + b" />
            </div>
            <p className="text-lg text-slate-500 mb-4">
              Ejemplo: <InlineMath math="\sqrt{3^2 + 4^2} = \sqrt{25} = 5" />. ¡Pero <InlineMath math="3 + 4 = 7" />!
            </p>
            <div className="text-emerald-600 text-base font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              ✔ Solución: Respeta la jerarquía de operaciones. Primero eleva al cuadrado, luego suma, y al final aplica la raíz.
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-3xl border border-red-200 flex gap-6 items-center mt-8 shadow-sm">
        <TriangleAlert className="w-16 h-16 text-orange-500 shrink-0" />
        <p className="text-xl text-slate-800 font-medium leading-relaxed">
          <strong className="text-orange-600 font-black text-2xl block mb-2">Regla de Oro:</strong> 
          La hipotenusa siempre debe ser mayor que cualquiera de los catetos por separado, pero menor que la suma de los dos catetos. Si tu resultado rompe esta regla, tienes un error en tus cálculos.
        </p>
      </div>
    </div>
  );
}
