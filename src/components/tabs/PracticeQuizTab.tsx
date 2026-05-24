import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, GraduationCap, Target } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import confetti from 'canvas-confetti';

type Question = {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const quizQuestions: Question[] = [
  {
    text: "Si los catetos de un triángulo rectángulo miden 3 cm y 4 cm, ¿cuánto mide la hipotenusa?",
    options: ["5 cm", "7 cm", "25 cm", "6 cm"],
    correctIndex: 0,
    explanation: "a² + b² = c² ➔ 3² + 4² = c² ➔ 9 + 16 = 25. La hipotenusa es la raíz cuadrada de 25, que es 5 cm. Esta es la terna pitagórica más famosa del mundo."
  },
  {
    text: "Si los catetos de un triángulo rectángulo miden 6 y 8, ¿cuánto mide la hipotenusa?",
    options: ["10", "14", "100", "8"],
    correctIndex: 0,
    explanation: "a² + b² = c² ➔ 6² + 8² = c² ➔ 36 + 64 = 100. La hipotenusa es la raíz cuadrada de 100, que es 10."
  },
  {
    text: "Si la hipotenusa de un triángulo rectángulo mide 13 y un cateto mide 5, ¿cuánto mide el otro cateto?",
    options: ["144", "12", "18", "8"],
    correctIndex: 1,
    explanation: "x² + 5² = 13² ➔ x² + 25 = 169 ➔ x² = 169 - 25 ➔ x² = 144. La raíz cuadrada de 144 es 12."
  },
  {
    text: "¿Cuál de estos conjuntos numéricos NO es una terna pitagórica?",
    options: ["3, 4, 5", "5, 12, 13", "6, 8, 10", "4, 5, 6"],
    correctIndex: 3,
    explanation: "4² + 5² = 16 + 25 = 41. Sin embargo, 6² = 36. Como 41 no es igual a 36, el conjunto (4, 5, 6) no es una terna pitagórica."
  },
  {
    text: "¿A qué tipo de triángulos se aplica de forma estricta el teorema de Pitágoras?",
    options: ["A cualquier tipo de triángulo", "Solo a triángulos isósceles", "Solo a triángulos rectángulos", "A todos los paralelogramos"],
    correctIndex: 2,
    explanation: "El teorema de Pitágoras es una propiedad geométrica exclusiva de los triángulos rectángulos (aquellos que poseen un ángulo recto de 90°)."
  },
  {
    text: "En un triángulo rectángulo, ¿cuál es la medida del ángulo que se encuentra exactamente opuesto a la hipotenusa?",
    options: ["45°", "90°", "180°", "60°"],
    correctIndex: 1,
    explanation: "La hipotenusa siempre se encuentra en el lado opuesto al ángulo recto de 90 grados, que además es el ángulo más grande de todo el triángulo."
  },
  {
    text: "Una escalera de 10 metros se apoya contra una pared vertical. Si la base de la escalera se sitúa a 6 metros de la pared, ¿a qué altura de la pared llega la escalera?",
    options: ["8 metros", "4 metros", "16 metros", "9 metros"],
    correctIndex: 0,
    explanation: "La escalera es la hipotenusa (10) y la base es un cateto (6). Altura² + 6² = 10² ➔ Altura² + 36 = 100 ➔ Altura² = 64. La raíz de 64 es 8 metros."
  },
  {
    text: "Una pantalla de televisión tiene un ancho de 24 pulgadas y un alto de 18 pulgadas. ¿De cuántas pulgadas es la diagonal de la pantalla?",
    options: ["30 pulgadas", "42 pulgadas", "26 pulgadas", "35 pulgadas"],
    correctIndex: 0,
    explanation: "El ancho y el alto forman los dos catetos. Diagonal² = 24² + 18² = 576 + 324 = 900. La raíz cuadrada de 900 es 30 pulgadas."
  },
  {
    text: "Un excursionista camina 9 km en línea recta hacia el norte y después 12 km hacia el este. ¿A qué distancia en línea recta se encuentra de su punto de partida?",
    options: ["15 km", "21 km", "18 km", "13 km"],
    correctIndex: 0,
    explanation: "Las direcciones norte y este forman un ángulo recto (90°). Los catetos son 9 y 12. Distancia² = 9² + 12² = 81 + 144 = 225. La raíz cuadrada de 225 es 15 km."
  },
  {
    text: "Un árbol proyecta una sombra de 15 metros en el suelo. Si la distancia en línea recta desde la copa del árbol hasta el extremo de la sombra es de 17 metros, ¿cuál es la altura del árbol?",
    options: ["8 metros", "2 metros", "32 metros", "10 metros"],
    correctIndex: 0,
    explanation: "La sombra es un cateto (15) y la visual es la hipotenusa (17). Altura² + 15² = 17² ➔ Altura² + 225 = 289 ➔ Altura² = 64. La raíz de 64 es 8 metros."
  },
  {
    text: "Si multiplicamos todos los elementos de la terna pitagórica (3, 4, 5) por la constante 3, obtenemos (9, 12, 15). ¿Se cumple el teorema para este nuevo grupo?",
    options: ["Sí, cualquier múltiplo de una terna pitagórica sigue siendo una terna pitagórica", "No, al multiplicar se pierde la propiedad fundamental", "Solo si multiplicamos por números pares", "Solo funciona si dibujamos el triángulo en una cuadrícula"],
    correctIndex: 0,
    explanation: "Si a² + b² = c², entonces (k·a)² + (k·b)² = k²(a² + b²) = (k·c)². Los múltiplos homotéticos conservan la proporcionalidad pitagórica."
  },
  {
    text: "¿Cuántos nudos equidistantes utilizaban los antiguos constructores egipcios en sus cuerdas para trazar ángulos rectos perfectos en las pirámides?",
    options: ["12 nudos (formando lados de 3, 4 y 5)", "10 nudos (formando lados de 2, 3 y 5)", "3 nudos (formando lados de 1, 1 y 1)", "9 nudos"],
    correctIndex: 0,
    explanation: "Los constructores egipcios amarraban cuerdas con 12 nudos equidistantes. Al tensarla en las esquinas de lados 3, 4 y 5 nudos, obtenían un ángulo recto perfecto."
  },
  {
    text: "¿Qué civilización grabó tablillas de arcilla con ternas pitagóricas (como la Plimpton 322) más de mil años antes del nacimiento de Pitágoras?",
    options: ["Los Babilonios", "Los Romanos", "Los Mayas", "Los Griegos"],
    correctIndex: 0,
    explanation: "La tablilla babilónica Plimpton 322, fechada en 1800 a.C., demuestra que esta civilización ya dominaba la teoría de los números pitagóricos mediante escritura cuneiforme."
  },
  {
    text: "¿Qué tipo de número descubrieron los pitagóricos al aplicar el teorema a un triángulo de catetos iguales a 1, provocando una crisis intelectual?",
    options: ["Un número irracional (la raíz cuadrada de 2, √2)", "El número Pi (π)", "El número de oro o razón áurea (φ)", "Un número negativo"],
    correctIndex: 0,
    explanation: "Al tener catetos de lado 1, la hipotenusa es c = √1² + 1² = √2. Los pitagóricos descubrieron que √2 no puede escribirse como una fracción, lo que rompió su filosofía cosmológica."
  },
  {
    text: "De acuerdo con las crónicas históricas, ¿qué le sucedió a Hípaso de Metaponto tras revelar al público el secreto de la existencia de números irracionales?",
    options: ["Fue arrojado al mar por sus compañeros de secta", "Recibió una distinción de honor por el rey", "Fue exiliado a la biblioteca de Alejandría", "Fue nombrado director de la Escuela Pitagórica"],
    correctIndex: 0,
    explanation: "La secta pitagórica creía que el cosmos se basaba en enteros y fracciones racionales. La existencia de √2 rompía su doctrina. Considerado traición, Hípaso fue arrojado al mar."
  },
  {
    text: "Si en lugar de construir cuadrados sobre los lados de un triángulo rectángulo construimos semicírculos, ¿se mantiene la igualdad de las superficies?",
    options: ["Sí, el teorema se cumple para cualquier figura geométrica semejante construida sobre los lados", "No, la ecuación c² = a² + b² es estrictamente para cuadrados", "Solo funciona si las figuras tienen bordes rectos", "Solo funciona si son triángulos equiláteros"],
    correctIndex: 0,
    explanation: "El teorema generalizado de Pitágoras establece que si se construyen figuras semejantes sobre los lados de un triángulo rectángulo, el área de la hipotenusa equivale a la suma de las de los catetos."
  },
  {
    text: "La fórmula matemática para calcular la distancia entre dos coordenadas en el plano cartesiano es una aplicación directa de...",
    options: ["El Teorema de Pitágoras", "La Regla de Tres Simple", "La Ley de Gravitación Universal", "La Geometría Esférica"],
    correctIndex: 0,
    explanation: "Al trazar la recta entre dos puntos (x₁,y₁) y (x₂,y₂), formamos un triángulo rectángulo virtual donde las diferencias en X e Y son los catetos. La distancia d es la hipotenusa: d = √((x₂-x₁)² + (y₂-y₁)²)."
  },
  {
    text: "Si los lados de un triángulo miden exactamente 7 cm, 24 cm y 25 cm, ¿podemos garantizar matemáticamente que es un triángulo rectángulo?",
    options: ["Sí, debido a que se cumple la relación recíproca: 7² + 24² = 25²", "No, ya que no nos han especificado los ángulos interiores", "Solo si es un triángulo de lados simétricos", "No, el teorema de Pitágoras nunca es aplicable a la inversa"],
    correctIndex: 0,
    explanation: "El teorema recíproco dice que si a² + b² = c², el ángulo opuesto al lado mayor es necesariamente recto (90°). En este caso, 49 + 576 = 625, lo cual coincide con 25² (625)."
  },
  {
    text: "¿Qué matemático propuso la generalización xⁿ + yⁿ = zⁿ, afirmando que no tiene soluciones enteras no nulas para n > 2?",
    options: ["Pierre de Fermat", "Isaac Newton", "Albert Einstein", "René Descartes"],
    correctIndex: 0,
    explanation: "Pierre de Fermat anotó en 1637 que tenía una demostración para este teorema, conocido como el Último Teorema de Fermat. La prueba tardó 358 años en resolverse, gracias a Andrew Wiles en 1995."
  },
  {
    text: "Si en un triángulo cualquiera se cumple que la suma a² + b² es MENOR que c² (siendo c el lado más largo), ¿qué clase de triángulo tenemos?",
    options: ["Un triángulo obtusángulo (posee un ángulo mayor de 90°)", "Un triángulo acutángulo (todos sus ángulos miden menos de 90°)", "Un triángulo equilátero regular", "Es matemáticamente imposible que eso ocurra"],
    correctIndex: 0,
    explanation: "Por la Ley de Cosenos: c² = a² + b² - 2ab·cos(C). Si a² + b² < c², entonces cos(C) es negativo, lo que significa que el ángulo C es mayor de 90 grados (obtuso)."
  }
];

export function PracticeQuizTab() {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [hypotenuse, setHypotenuse] = useState<string>('');
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Helper to extract the number if it's formatted as a root
  const parseValue = (val: string) => {
    if (!val) return NaN;
    if (val.includes('≈')) {
      const parts = val.split('≈');
      return parseFloat(parts[1].trim());
    }
    return parseFloat(val);
  };

  const formatResult = (squared: number) => {
    const root = Math.sqrt(squared);
    if (Number.isInteger(root)) return root.toString();
    return `√${squared} ≈ ${root.toFixed(2)}`;
  };

  const calculateMissing = () => {
    const a = parseValue(sideA);
    const b = parseValue(sideB);
    const c = parseValue(hypotenuse);

    if (sideA && sideB && !hypotenuse) {
      setHypotenuse(formatResult(a * a + b * b));
    } else if (sideA && hypotenuse && !sideB) {
      if (c <= a) return alert("La hipotenusa debe ser el lado mayor.");
      setSideB(formatResult(c * c - a * a));
    } else if (sideB && hypotenuse && !sideA) {
      if (c <= b) return alert("La hipotenusa debe ser el lado mayor.");
      setSideA(formatResult(c * c - b * b));
    } else {
      alert("Por favor, ingresa exactamente 2 valores para calcular el tercero.");
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQIndex].correctIndex) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#8b5cf6']
      });
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(c => c + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mb-4">
            Laboratorio de Práctica
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Pon a prueba lo que has aprendido. Usa la calculadora para resolver triángulos o enfréntate al cuestionario final.
          </p>
        </div>
        <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Target className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Calculator Module */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[50px]" />
          
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            Calculadora Mágica
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">Deja un campo vacío</span>
          </h3>

          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-red-600">Cateto A</label>
              <input 
                type="text" 
                value={sideA} 
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Ej. 3"
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm font-mono text-lg"
              />
            </div>
            
            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-blue-600">Cateto B</label>
              <input 
                type="text" 
                value={sideB} 
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Ej. 4"
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm font-mono text-lg"
              />
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-purple-600">Hipotenusa</label>
              <input 
                type="text" 
                value={hypotenuse} 
                onChange={(e) => setHypotenuse(e.target.value)}
                placeholder="Ej. dejar vacío"
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-800 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-sm font-mono text-lg"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={calculateMissing}
              className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Calcular Faltante
            </button>
            <button 
              onClick={() => { setSideA(''); setSideB(''); setHypotenuse(''); }}
              className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all text-slate-600 active:scale-95 shadow-sm"
              title="Limpiar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Inline Graficador Visual Section */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-2">Graficador en Vivo</h4>
            <div className="relative w-full aspect-video max-h-[250px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
              
              {(() => {
                const valA = parseValue(sideA);
                const valB = parseValue(sideB);
                
                if (!isNaN(valA) && !isNaN(valB) && valA > 0 && valB > 0) {
                  const padding = 30;
                  const maxW = 300;
                  const maxH = 200;
                  const scale = Math.min((maxW - padding*2) / valB, (maxH - padding*2) / valA);
                  
                  const pixelA = valA * scale;
                  const pixelB = valB * scale;
                  
                  return (
                    <svg width="300" height="200" className="overflow-visible z-10" viewBox="0 0 300 200">
                      <g transform={`translate(${(300 - pixelB) / 2}, ${(200 + pixelA) / 2})`}>
                        {/* Hypotenuse */}
                        <line x1="0" y1={-pixelA} x2={pixelB} y2="0" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
                        <text x={pixelB / 2 + 10} y={-pixelA / 2 - 10} className="fill-purple-700 font-bold font-mono text-sm">
                          c = {parseValue(hypotenuse) ? hypotenuse : '?'}
                        </text>
                        {/* Cateto A */}
                        <line x1="0" y1="0" x2="0" y2={-pixelA} stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                        <text x="-20" y={-pixelA / 2} textAnchor="end" className="fill-red-700 font-bold font-mono text-sm" dominantBaseline="middle">
                          a = {valA}
                        </text>
                        {/* Cateto B */}
                        <line x1="0" y1="0" x2={pixelB} y2="0" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                        <text x={pixelB / 2} y="20" textAnchor="middle" className="fill-blue-700 font-bold font-mono text-sm">
                          b = {valB}
                        </text>
                        {/* Right Angle Indicator */}
                        <rect x="0" y="-12" width="12" height="12" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                      </g>
                    </svg>
                  );
                } else {
                  return (
                    <div className="z-10 text-slate-400 font-medium text-center text-sm px-4">
                      Llena el Cateto A y B para graficar.
                    </div>
                  );
                }
              })()}
            </div>
          </div>

        </div>

        {/* Quiz Module */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col h-full border-t-4 border-t-emerald-500">
          {!quizFinished ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  Cuestionario
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  {currentQIndex + 1} de {quizQuestions.length}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-lg font-medium text-slate-700 mb-6 min-h-[60px]">
                  {quizQuestions[currentQIndex].text}
                </p>

                <div className="space-y-3 mb-6">
                  {quizQuestions[currentQIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[currentQIndex].correctIndex;
                    const showStatus = selectedAnswer !== null;

                    let btnClass = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";
                    if (showStatus) {
                      if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                      else if (isSelected) btnClass = "bg-red-50 border-red-500 text-red-700";
                      else btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-70";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={showStatus}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between font-medium ${btnClass}`}
                      >
                        {option}
                        {showStatus && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                        {showStatus && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-auto"
                    >
                      <div className={`p-4 rounded-xl text-sm mb-4 ${selectedAnswer === quizQuestions[currentQIndex].correctIndex ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                        <strong className="block mb-1">Explicación:</strong>
                        {quizQuestions[currentQIndex].explanation}
                      </div>
                      
                      <button 
                        onClick={nextQuestion}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
                      >
                        {currentQIndex < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-200">
                <GraduationCap className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-2">¡Completado!</h3>
              <p className="text-slate-600 mb-6">Obtuviste <strong className="text-emerald-600 text-xl">{score}</strong> de {quizQuestions.length} correctas.</p>
              
              <button 
                onClick={resetQuiz}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-900/50 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
