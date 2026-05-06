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
    text: "Si los catetos miden 6 y 8, ¿cuánto mide la hipotenusa?",
    options: ["10", "14", "100", "8"],
    correctIndex: 0,
    explanation: "a² + b² = c² ➔ 6² + 8² = c² ➔ 36 + 64 = 100. La hipotenusa es la raíz cuadrada de 100, que es 10."
  },
  {
    text: "Si la hipotenusa mide 13 y un cateto mide 5, ¿cuánto mide el otro cateto?",
    options: ["144", "12", "18", "8"],
    correctIndex: 1,
    explanation: "x² + 5² = 13² ➔ x² + 25 = 169 ➔ x² = 169 - 25 ➔ x² = 144. La raíz de 144 es 12."
  },
  {
    text: "¿Cuál de estos conjuntos NO es una terna pitagórica?",
    options: ["3, 4, 5", "5, 12, 13", "6, 8, 10", "4, 5, 6"],
    correctIndex: 3,
    explanation: "4² + 5² = 16 + 25 = 41. Pero 6² = 36. 41 no es igual a 36, por lo que (4,5,6) no es una terna pitagórica."
  },
  {
    text: "El teorema de Pitágoras se aplica...",
    options: ["A cualquier triángulo", "Solo a triángulos isósceles", "Solo a triángulos rectángulos", "A los cuadrados"],
    correctIndex: 2,
    explanation: "El teorema es una propiedad exclusiva de los triángulos rectángulos (que tienen un ángulo de 90°)."
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

  const calculateMissing = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(hypotenuse);

    if (sideA && sideB && !hypotenuse) {
      setHypotenuse(Math.sqrt(a * a + b * b).toFixed(2).replace('.00', ''));
    } else if (sideA && hypotenuse && !sideB) {
      if (c <= a) return alert("La hipotenusa debe ser el lado mayor.");
      setSideB(Math.sqrt(c * c - a * a).toFixed(2).replace('.00', ''));
    } else if (sideB && hypotenuse && !sideA) {
      if (c <= b) return alert("La hipotenusa debe ser el lado mayor.");
      setSideA(Math.sqrt(c * c - b * b).toFixed(2).replace('.00', ''));
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
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            Laboratorio de Práctica
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Pon a prueba lo que has aprendido. Usa la calculadora para resolver triángulos o enfréntate al cuestionario final.
          </p>
        </div>
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Target className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Calculator Module */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[50px]" />
          
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            Calculadora Mágica
            <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded-full">Deja un campo vacío</span>
          </h3>

          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-red-400">Cateto A</label>
              <input 
                type="number" 
                value={sideA} 
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Ej. 3"
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
            
            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-blue-400">Cateto B</label>
              <input 
                type="number" 
                value={sideB} 
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Ej. 4"
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center gap-4">
              <label className="text-sm font-bold text-purple-400">Hipotenusa</label>
              <input 
                type="number" 
                value={hypotenuse} 
                onChange={(e) => setHypotenuse(e.target.value)}
                placeholder="Ej. dejar vacío"
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
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
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all text-slate-300 active:scale-95"
              title="Limpiar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quiz Module */}
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col h-full border-t-4 border-t-emerald-500">
          {!quizFinished ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  Cuestionario
                </h3>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {currentQIndex + 1} de {quizQuestions.length}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-lg font-medium text-slate-200 mb-6 min-h-[60px]">
                  {quizQuestions[currentQIndex].text}
                </p>

                <div className="space-y-3 mb-6">
                  {quizQuestions[currentQIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[currentQIndex].correctIndex;
                    const showStatus = selectedAnswer !== null;

                    let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300";
                    if (showStatus) {
                      if (isCorrect) btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                      else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-400";
                      else btnClass = "bg-slate-800/50 border-slate-800 text-slate-500 opacity-50";
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
                      <div className={`p-4 rounded-xl text-sm mb-4 ${selectedAnswer === quizQuestions[currentQIndex].correctIndex ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200' : 'bg-red-500/10 border border-red-500/20 text-red-200'}`}>
                        <strong className="block mb-1">Explicación:</strong>
                        {quizQuestions[currentQIndex].explanation}
                      </div>
                      
                      <button 
                        onClick={nextQuestion}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
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
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-500/30">
                <GraduationCap className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">¡Completado!</h3>
              <p className="text-slate-400 mb-6">Obtuviste <strong className="text-emerald-400 text-xl">{score}</strong> de {quizQuestions.length} correctas.</p>
              
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
