import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function ProofsGalleryTab() {
  const [progress, setProgress] = useState(0);

  const t = progress / 100;

  // Geometry dimensions
  const a = 120;
  const b = 160;
  const size = a + b; // 280

  // T1: Doesn't move
  const t1_current = `M ${b},0 L ${a+b},0 L ${a+b},${b} Z`;

  // T2: Moves by (-b, a)
  const t2_dx = -b * t;
  const t2_dy = a * t;
  const t2_current = `M ${b + t2_dx},${0 + t2_dy} L ${a+b + t2_dx},${b + t2_dy} L ${b + t2_dx},${b + t2_dy} Z`;

  // T3: Moves by (0, -b)
  const t3_dx = 0;
  const t3_dy = -b * t;
  const t3_current = `M ${0 + t3_dx},${b + t3_dy} L ${b + t3_dx},${b + t3_dy} L ${0 + t3_dx},${a+b + t3_dy} Z`;

  // T4: Moves by (a, 0)
  const t4_dx = a * t;
  const t4_dy = 0;
  const t4_current = `M ${b + t4_dx},${b + t4_dy} L ${b + t4_dx},${a+b + t4_dy} L ${0 + t4_dx},${a+b + t4_dy} Z`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Demostración Visual del Teorema
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Existen cientos de demostraciones del Teorema de Pitágoras. La siguiente es una de las más elegantes e intuitivas visualmente. 
          Al mover las piezas, podemos demostrar que el espacio que ocupan los cuadrados de los catetos es exactamente igual al espacio que ocupa el cuadrado de la hipotenusa.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        
        {/* Controles y Explicación */}
        <div className="flex-1 w-full space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800">Interactúa con la figura</h3>
            <p className="text-slate-600 text-base">
              Desliza el control para trasladar los cuatro triángulos rectángulos. Observa cómo el espacio vacío cambia de forma pero mantiene la misma área total.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={(e) => setProgress(Number(e.target.value))} 
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
            />
            <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wider">
              <span className={progress < 50 ? 'text-indigo-600' : ''}>
                Catetos <span className="lowercase normal-case ml-1"><InlineMath math="(a^2 + b^2)" /></span>
              </span>
              <span className={progress > 50 ? 'text-indigo-600' : ''}>
                Hipotenusa <span className="lowercase normal-case ml-1"><InlineMath math="(c^2)" /></span>
              </span>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900">¿Qué está pasando matemáticamente?</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>El área total del cuadrado grande es <InlineMath math="(a+b)^2" />.</li>
              <li>El área de los 4 triángulos rectángulos (azules) es <InlineMath math="4 \times (\frac{ab}{2}) = 2ab" />.</li>
              <li><strong>Al inicio:</strong> El espacio blanco restante forma dos cuadrados de áreas <InlineMath math="a^2" /> y <InlineMath math="b^2" />.</li>
              <li><strong>Al final:</strong> El espacio blanco restante forma un solo cuadrado de lado <InlineMath math="c" />, cuya área es <InlineMath math="c^2" />.</li>
              <li>Como el cuadrado grande y los triángulos son los mismos, el área blanca debe ser igual en ambos casos: <InlineMath math="a^2 + b^2 = c^2" />.</li>
            </ul>
          </div>
        </div>

        {/* Simulador Visual */}
        <div className="flex-1 flex items-center justify-center w-full lg:min-h-[400px]">
          <div className="relative border-4 border-slate-800 rounded-lg bg-white shadow-xl overflow-hidden" style={{ width: size, height: size }}>
            
            {/* Cuadrados a^2 y b^2 (Estado Inicial) */}
            <div className="absolute top-0 left-0 border-r-2 border-b-2 border-slate-300/50 flex items-center justify-center font-bold text-slate-400 text-3xl" style={{ width: b, height: b, opacity: 1 - t }}>
              <InlineMath math="b^2" />
            </div>
            <div className="absolute bottom-0 right-0 border-l-2 border-t-2 border-slate-300/50 flex items-center justify-center font-bold text-slate-400 text-2xl" style={{ width: a, height: a, opacity: 1 - t }}>
              <InlineMath math="a^2" />
            </div>

            {/* Cuadrado c^2 (Estado Final) */}
            <div 
              className="absolute flex items-center justify-center font-bold text-indigo-500/30 text-5xl transition-opacity duration-300"
              style={{
                width: Math.sqrt(a*a + b*b),
                height: Math.sqrt(a*a + b*b),
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${Math.atan(a/b)}rad)`,
                opacity: t > 0.9 ? 1 : 0
              }}
            >
              <div style={{ transform: `rotate(-${Math.atan(a/b)}rad)` }}>
                <InlineMath math="c^2" />
              </div>
            </div>

            <svg width={size} height={size} className="absolute inset-0 drop-shadow-md">
              {/* T1 */}
              <path d={t1_current} className="fill-indigo-500 stroke-indigo-600 stroke-2" />
              {/* T2 */}
              <path d={t2_current} className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" />
              {/* T3 */}
              <path d={t3_current} className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" />
              {/* T4 */}
              <path d={t4_current} className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
