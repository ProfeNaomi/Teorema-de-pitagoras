import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, XCircle, Skull, TriangleAlert } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

export function AntiPatternsTab() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            El Cementerio de Errores
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Incluso los mejores matemáticos cometen errores, pero en el Teorema de Pitágoras existen "trampas" clásicas en las que cae el 90% de los estudiantes. ¡Conócelas para evitarlas!
          </p>
        </div>
        <div className="w-16 h-16 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <Skull className="w-8 h-8 text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Error 1 */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <XCircle className="w-24 h-24 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
            El Síndrome del Triángulo Cualquiera
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Usar la fórmula <InlineMath math="a^2 + b^2 = c^2" /> en triángulos que NO tienen un ángulo de 90°.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 text-red-600 mb-2 font-bold text-sm">
              <XCircle className="w-4 h-4" /> Error:
            </div>
            <p className="text-slate-500 text-xs">"Veo un triángulo con lados 5 y 7. ¡Voy a usar Pitágoras para sacar el otro lado!"</p>
            <div className="mt-3 text-emerald-600 text-xs font-semibold">
              ✔ Solución: Verifica SIEMPRE que exista un ángulo recto antes de empezar. Si no lo hay, debes usar el Teorema del Coseno o del Seno.
            </div>
          </div>
        </motion.div>

        {/* Error 2 */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <XCircle className="w-24 h-24 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
            Identidad Equivocada (La Hipotenusa Falsa)
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Confundir un cateto con la hipotenusa. Si te dan un triángulo con cateto 3 e hipotenusa 5, ¡el otro cateto no es <InlineMath math="\sqrt{3^2 + 5^2}" />!
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 text-orange-600 mb-2 font-bold text-sm">
              <XCircle className="w-4 h-4" /> Error en Ecuación:
            </div>
            <div className="text-slate-500 text-sm mb-2"><BlockMath math="x^2 = 3^2 + 5^2 \Rightarrow x = \sqrt{34}" /></div>
            <div className="text-emerald-600 text-xs font-semibold">
              ✔ Solución Correcta: La hipotenusa siempre va sola de un lado de la ecuación. <br/>
              <span className="inline-block mt-1 font-mono bg-emerald-100 px-2 py-1 rounded">5² = 3² + x² ➔ 25 - 9 = x² ➔ x = 4</span>
            </div>
          </div>
        </motion.div>

        {/* Error 3 */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 rounded-2xl border-l-4 border-l-yellow-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <XCircle className="w-24 h-24 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
            Amnesia de Raíz Cuadrada
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Olvidarse de sacar la raíz cuadrada al final del cálculo. Es el error por "apuro" más común en exámenes.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-600 mb-2 font-bold text-sm">
              <XCircle className="w-4 h-4" /> Conclusión Prematura:
            </div>
            <div className="text-slate-500 text-xs">
              <InlineMath math="c^2 = 3^2 + 4^2 \Rightarrow c^2 = 9 + 16 \Rightarrow c^2 = 25" /><br/>
              "¡Listo! La hipotenusa mide 25 metros." (Imposible, el lado sería larguísimo comparado con los otros).
            </div>
            <div className="mt-3 text-emerald-600 text-xs font-semibold">
              ✔ Solución: <InlineMath math="c = \sqrt{25} = 5" />. Siempre pregúntate: ¿Tiene sentido esta medida?
            </div>
          </div>
        </motion.div>

        {/* Error 4 */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 rounded-2xl border-l-4 border-l-pink-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <XCircle className="w-24 h-24 text-pink-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
            Álgebra Falsa (Sumar antes de elevar)
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Un error catastrófico de álgebra. Asumir que <InlineMath math="(a + b)^2" /> es lo mismo que <InlineMath math="a^2 + b^2" />.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-pink-200">
            <div className="flex items-center gap-2 text-pink-600 mb-2 font-bold text-sm">
              <XCircle className="w-4 h-4" /> Falacia Matemática:
            </div>
            <div className="text-slate-600 text-sm mb-2 text-center text-red-600">
              <BlockMath math="\sqrt{a^2 + b^2} \neq a + b" />
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Ejemplo: <InlineMath math="\sqrt{3^2 + 4^2} = \sqrt{25} = 5" />. ¡Pero <InlineMath math="3 + 4 = 7" />!
            </p>
            <div className="text-emerald-600 text-xs font-semibold">
              ✔ Solución: Respeta la jerarquía de operaciones. Primero eleva al cuadrado, luego suma, y al final aplica la raíz.
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200 flex gap-4 items-center mt-4">
        <TriangleAlert className="w-10 h-10 text-orange-500 shrink-0" />
        <p className="text-sm text-slate-700 font-medium leading-relaxed">
          <strong>Regla de Oro:</strong> La hipotenusa siempre debe ser mayor que cualquiera de los catetos por separado, pero menor que la suma de los dos catetos. Si tu resultado rompe esta regla, tienes un error en tus cálculos.
        </p>
      </div>
    </div>
  );
}
