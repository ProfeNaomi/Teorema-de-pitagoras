import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ChevronRight, Maximize2 } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

const proofs = [
  {
    id: 'euclid',
    title: 'El Molino de Euclides',
    author: 'Euclides de Alejandría',
    description: 'La demostración original de los Elementos (Proposición 47). Utiliza la congruencia de triángulos y el cálculo de áreas.',
    steps: [
      'Se construyen cuadrados sobre los tres lados del triángulo rectángulo.',
      'Se traza una línea desde el ángulo recto paralela a los lados del cuadrado de la hipotenusa.',
      'Esto divide el cuadrado grande en dos rectángulos.',
      'Mediante triángulos congruentes, se demuestra que el área de cada cuadrado pequeño es igual al área de uno de los rectángulos correspondientes.',
      'Al sumar ambos rectángulos, se forma el cuadrado de la hipotenusa.'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'perigal',
    title: 'La Disección de Perigal',
    author: 'Henry Perigal (1830)',
    description: 'Una demostración visual brillante mediante el recorte y reorganización de piezas.',
    steps: [
      'Se dibuja el cuadrado sobre el cateto mayor.',
      'Se corta este cuadrado en 4 piezas idénticas trazando dos líneas a través de su centro, paralelas y perpendiculares a la hipotenusa.',
      'Estas 4 piezas, junto con el cuadrado entero del cateto menor (la quinta pieza), encajan perfectamente dentro del cuadrado de la hipotenusa.',
      'Esta traslación de áreas demuestra visualmente la equivalencia.'
    ],
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'davinci',
    title: 'Método de Da Vinci',
    author: 'Leonardo da Vinci',
    description: 'Usa hexágonos asimétricos y rotaciones para demostrar la igualdad de áreas.',
    steps: [
      'Se añaden triángulos idénticos al original a los lados de los cuadrados de los catetos y la hipotenusa.',
      'Se forman dos polígonos complejos (que parecen hexágonos irregulares).',
      'Da Vinci demostró que si rotas uno de estos polígonos 90 grados, coincide exactamente con el otro.',
      'Como los triángulos añadidos son idénticos, los cuadrados originales también deben sumar la misma área.'
    ],
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 'garfield',
    title: 'El Trapecio de Garfield',
    author: 'James A. Garfield (1876)',
    description: 'Una demostración algebraica elegante propuesta por un presidente de EE.UU.',
    steps: [
      'Se dibuja el triángulo rectángulo de lados a, b, c.',
      'Se coloca una copia del triángulo rotada 90° de modo que forme un trapecio.',
      'El área del trapecio se calcula de dos formas: por la fórmula del trapecio y sumando las áreas de los 3 triángulos que lo componen.',
      'Al igualar ambas ecuaciones y simplificar algebraicamente, obtenemos la famosa ecuación de Pitágoras.'
    ],
    color: 'from-rose-400 to-red-600'
  },
  {
    id: 'bhaskara',
    title: 'El Puzzle de Bhaskara',
    author: 'Bhaskara II (Siglo XII)',
    description: 'Conocido como el método de "¡Mira!", ya que es tan visual que casi no requiere palabras.',
    steps: [
      'Se dibujan cuatro copias del triángulo rectángulo original.',
      'Se disponen formando un cuadrado grande cuyo lado es la hipotenusa (c).',
      'En el centro queda un pequeño hueco cuadrado de lado (b - a).',
      'El área total es el cuadrado grande (c²). Si calculamos la suma de las áreas de los 4 triángulos más el hueco central, se obtiene a² + b².',
      'Por lo tanto, c² = a² + b².'
    ],
    color: 'from-violet-400 to-purple-600'
  }
];

export function ProofsGalleryTab() {
  const [selectedProof, setSelectedProof] = useState(proofs[0]);

  return (
    <div className="space-y-8 pb-10 h-full flex flex-col">
      <div className="flex flex-col md:flex-row items-center gap-6 shrink-0">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-4">
            Galería de Demostraciones
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Existen más de 300 demostraciones diferentes del Teorema de Pitágoras. Aquí presentamos las más elegantes e históricas. 
          </p>
        </div>
        <div className="w-16 h-16 bg-teal-500/10 rounded-2xl border border-teal-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
          <ImageIcon className="w-8 h-8 text-teal-400" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        {/* Navigation List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 shrink-0">
          {proofs.map((proof) => (
            <button
              key={proof.id}
              onClick={() => setSelectedProof(proof)}
              className={`text-left p-4 rounded-xl transition-all border flex items-center justify-between group
                ${selectedProof.id === proof.id 
                  ? 'bg-slate-800 border-slate-600 shadow-md scale-[1.02]' 
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
            >
              <div>
                <h4 className={`font-bold text-sm ${selectedProof.id === proof.id ? 'text-white' : 'text-slate-300'}`}>
                  {proof.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{proof.author}</p>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${selectedProof.id === proof.id ? 'text-blue-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
            </button>
          ))}
        </div>

        {/* Detailed View */}
        <div className="flex-1 glass-panel rounded-3xl overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProof.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${selectedProof.color}`} />
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 block">Demostración Seleccionada</span>
                    <h3 className="text-2xl font-black text-white">{selectedProof.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">Por {selectedProof.author}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedProof.color} bg-opacity-20 flex items-center justify-center shadow-lg`}>
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base border-l-4 border-slate-700 pl-4">
                  {selectedProof.description}
                </p>

                <div className="space-y-4 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-800" />
                  {selectedProof.steps.map((step, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex gap-4 relative z-10"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="glass-panel p-4 rounded-xl flex-1 text-sm text-slate-300 shadow-sm hover:border-slate-600 transition-colors">
                        {step}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedProof.id === 'garfield' && (
                  <div className="mt-8 bg-slate-900/80 p-6 rounded-2xl text-center border border-slate-700">
                     <span className="text-xs text-slate-500 mb-4 block uppercase tracking-widest">Resolución Algebraica (Garfield)</span>
                     <div className="text-white text-lg">
                       <BlockMath math="\text{Área Trapecio} = \frac{1}{2}(a+b)(a+b)" />
                       <BlockMath math="\text{Área 3 Triángulos} = 2 \cdot (\frac{1}{2}ab) + \frac{1}{2}c^2" />
                       <div className="my-4 text-slate-500 text-sm">Igualando ambas ecuaciones:</div>
                       <BlockMath math="\frac{1}{2}(a^2 + 2ab + b^2) = ab + \frac{1}{2}c^2" />
                       <BlockMath math="a^2 + 2ab + b^2 = 2ab + c^2" />
                       <BlockMath math="a^2 + b^2 = c^2" />
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
