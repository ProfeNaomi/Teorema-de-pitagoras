import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { RotateCw, Play, Pause, HelpCircle, Info } from 'lucide-react';

type ProofId = 'classic' | 'water' | 'perigal' | 'bhaskara';

export function ProofsGalleryTab() {
  const [activeProof, setActiveProof] = useState<ProofId>('classic');
  
  // States for different proofs
  const [progress, setProgress] = useState(0); // For slider-based proofs (0 to 100)
  const [waterAngle, setWaterAngle] = useState(0); // For water wheel (rotates in multiples of 180)
  const [waterLevel, setWaterLevel] = useState(0); // 0 = catetos full, 1 = hipotenusa full
  const [isRotating, setIsRotating] = useState(false);

  const t = progress / 100;

  // Geometry dimensions for classic & dissections
  const a = 90;
  const b = 120;
  const c = 150; // Hypotenuse

  // Handle Water Wheel rotation
  const rotateWaterWheel = () => {
    if (isRotating) return;
    setIsRotating(true);
    const newAngle = waterAngle + 180;
    setWaterAngle(newAngle);
    
    // Water flows shortly after rotation starts
    const isUpright = (newAngle / 180) % 2 === 0;
    setTimeout(() => {
      setWaterLevel(isUpright ? 0 : 1);
      setIsRotating(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Tab Header Info */}
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Laboratorio de Demostraciones Visuales
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          La belleza del Teorema de Pitágoras radica en que se puede "ver" y sentir físicamente. Explora estas 4 demostraciones distintas e interactivas creadas para ayudarte a comprender por qué funciona el teorema.
        </p>
      </div>

      {/* Internal Proof Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl w-fit">
        <button
          onClick={() => { setActiveProof('classic'); setProgress(0); }}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeProof === 'classic'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Reordenamiento Clásico
        </button>
        <button
          onClick={() => { setActiveProof('water'); setProgress(0); }}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeProof === 'water'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. La Rueda de Agua 💧
        </button>
        <button
          onClick={() => { setActiveProof('perigal'); setProgress(0); }}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeProof === 'perigal'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Disección de Perigal 🧩
        </button>
        <button
          onClick={() => { setActiveProof('bhaskara'); setProgress(0); }}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeProof === 'bhaskara'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. El Puzzle de Bhaskara
        </button>
      </div>

      {/* Main Showcase Panel */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Side: Controls, Explanations & Math */}
        <div className="flex-1 w-full flex flex-col justify-between space-y-6 z-10">
          
          {/* Active Proof Titles & Explanations */}
          <div className="space-y-4">
            {activeProof === 'classic' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  Traslación de Áreas
                </div>
                <h3 className="text-2xl font-black text-slate-800">El Cuadrado de Lado a + b</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Esta demostración coloca cuatro triángulos rectángulos idénticos en las esquinas de un cuadrado grande de lado <InlineMath math="a+b" />. Al deslizar el control, los triángulos se reorganizan. El área blanca sobrante cambia de forma pero mantiene el mismo espacio exacto.
                </p>
              </>
            )}

            {activeProof === 'water' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  Demostración Hidráulica
                </div>
                <h3 className="text-2xl font-black text-slate-800">Rueda de Agua de Pitágoras</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Uno de los experimentos físicos más bellos del mundo. Al girar la rueda, el agua contenida en los dos cuadrados menores (construidos sobre los catetos <InlineMath math="a^2" /> y <InlineMath math="b^2" />) fluye por gravedad para llenar perfectamente el cuadrado mayor de la hipotenusa (<InlineMath math="c^2" />).
                </p>
              </>
            )}

            {activeProof === 'perigal' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  Disección Geométrica
                </div>
                <h3 className="text-2xl font-black text-slate-800">El Rompecabezas de Henry Perigal</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Henry Perigal descubrió en 1830 que si cortamos el cuadrado del cateto mayor (<InlineMath math="b^2" />) con dos líneas cruzadas por su centro (una paralela a la hipotenusa y otra perpendicular), obtenemos 4 piezas que, junto al cuadrado menor (<InlineMath math="a^2" />), encajan mágicamente para rellenar la hipotenusa (<InlineMath math="c^2" />).
                </p>
              </>
            )}

            {activeProof === 'bhaskara' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-xs font-bold uppercase tracking-wider">
                  Rearreglo Algebraico
                </div>
                <h3 className="text-2xl font-black text-slate-800">El Puzzle Chino (Zhoubi Suanjing)</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Presentado por Bháskara II, este puzzle organiza 4 triángulos rectángulos de hipotenusa <InlineMath math="c" /> en un cuadrado exterior. En el centro queda un pequeño hueco cuadrado de lado <InlineMath math="b-a" />. Al deslizar el control, los triángulos se separan formando dos rectángulos que equivalen a la suma de los catetos al cuadrado.
                </p>
              </>
            )}
          </div>

          {/* Interactive Controller */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Controles del Experimento</h4>
            
            {activeProof !== 'water' ? (
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress} 
                  onChange={(e) => setProgress(Number(e.target.value))} 
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none" 
                />
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span className={progress < 15 ? 'text-indigo-600 font-extrabold' : ''}>
                    Catetos Separados <span className="lowercase normal-case ml-1 font-medium"><InlineMath math="(a^2 + b^2)" /></span>
                  </span>
                  <span className={progress > 85 ? 'text-indigo-600 font-extrabold' : ''}>
                    Hipotenusa Unificada <span className="lowercase normal-case ml-1 font-medium"><InlineMath math="(c^2)" /></span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <button
                  onClick={rotateWaterWheel}
                  disabled={isRotating}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-55"
                >
                  <RotateCw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
                  Girar Rueda 180°
                </button>
                <div className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${waterLevel === 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                  <span>Estado: {waterLevel === 0 ? 'Catetos Llenos' : 'Hipotenusa Llena'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Mathematical Proof Card */}
          <div className="space-y-3 text-slate-700 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 flex items-center gap-2 text-sm md:text-base">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-indigo-700" />
              ¿Qué estamos demostrando?
            </h4>
            
            {activeProof === 'classic' && (
              <ul className="list-disc pl-5 space-y-1.5 text-[0.95rem]">
                <li>El área total del cuadrado contenedor es <InlineMath math="(a+b)^2" />.</li>
                <li>El área ocupada por los 4 triángulos azules es <InlineMath math="4 \times \frac{ab}{2} = 2ab" />.</li>
                <li>Al inicio, el espacio blanco forma dos cuadrados: <InlineMath math="a^2" /> y <InlineMath math="b^2" />.</li>
                <li>Al final, el espacio blanco se consolida en un solo cuadrado inclinado de área <InlineMath math="c^2" />.</li>
                <li>Como las piezas totales y los triángulos son los mismos, el área blanca debe ser equivalente en ambos estados: <InlineMath math="a^2 + b^2 = c^2" />.</li>
              </ul>
            )}

            {activeProof === 'water' && (
              <ul className="list-disc pl-5 space-y-1.5 text-[0.95rem]">
                <li>Cada contenedor cuadrado tiene una profundidad constante.</li>
                <li>Por lo tanto, la cantidad de agua representa directamente la superficie (área) de cada contenedor.</li>
                <li>Al girar la rueda, el agua de los contenedores menores <InlineMath math="a^2" /> y <InlineMath math="b^2" /> se vierte por completo en el contenedor mayor <InlineMath math="c^2" />.</li>
                <li>El agua llena el contenedor de la hipotenusa exactamente al borde, lo que demuestra visualmente que <InlineMath math="Volumen_c = Volumen_a + Volumen_b" />, es decir: <InlineMath math="c^2 = a^2 + b^2" />.</li>
              </ul>
            )}

            {activeProof === 'perigal' && (
              <ul className="list-disc pl-5 space-y-1.5 text-[0.95rem]">
                <li>Las 4 piezas de la disección en el cateto mayor son idénticas y congruentes.</li>
                <li>Tienen una simetría tal que el cuadrado del cateto menor <InlineMath math="a^2" /> encaja exactamente en el espacio central que dejan las 4 piezas cuando se colocan en las esquinas de <InlineMath math="c^2" />.</li>
                <li>Esta disección demuestra que podemos cortar un área y reorganizarla sin añadir ni quitar espacio.</li>
                <li>Es un puzzle perfecto que prueba físicamente la igualdad de áreas: <InlineMath math="a^2 + b^2 = c^2" />.</li>
              </ul>
            )}

            {activeProof === 'bhaskara' && (
              <ul className="list-disc pl-5 space-y-1.5 text-[0.95rem]">
                <li>El cuadrado grande formado por los 4 triángulos alineados tiene área <InlineMath math="c^2" />.</li>
                <li>El área total se puede calcular sumando las partes: <InlineMath math="\text{Área} = 4 \times (\frac{ab}{2}) + (b-a)^2" />.</li>
                <li>Expandiendo la fórmula: <InlineMath math="c^2 = 2ab + (b^2 - 2ab + a^2)" />.</li>
                <li>Los términos se cancelan mágicamente dejando: <InlineMath math="c^2 = a^2 + b^2" />.</li>
                <li>Al deslizar el control, los triángulos se separan y revelan visualmente esta misma suma de áreas de forma física.</li>
              </ul>
            )}
          </div>

        </div>

        {/* Right Side: Visual SVG Canvas */}
        <div className="flex-1 flex items-center justify-center w-full min-h-[360px] md:min-h-[420px] bg-slate-50 border border-slate-100 rounded-2xl p-4 relative overflow-hidden">
          
          {/* Active Canvas Switcher */}
          
          {/* DEMO 1: CLASSIC REARRANGEMENT */}
          {activeProof === 'classic' && (
            <div className="relative border-4 border-slate-800 rounded-2xl bg-white shadow-lg overflow-hidden shrink-0" style={{ width: a+b, height: a+b }}>
              {/* background squares (areas a^2 and b^2) */}
              <div className="absolute top-0 left-0 border-r-2 border-b-2 border-slate-300/40 flex items-center justify-center font-bold text-slate-300/80 text-3xl" style={{ width: b, height: b, opacity: 1 - t }}>
                <InlineMath math="b^2" />
              </div>
              <div className="absolute bottom-0 right-0 border-l-2 border-t-2 border-slate-300/40 flex items-center justify-center font-bold text-slate-300/80 text-2xl" style={{ width: a, height: a, opacity: 1 - t }}>
                <InlineMath math="a^2" />
              </div>

              {/* c^2 square (final state) */}
              <div 
                className="absolute flex items-center justify-center font-extrabold text-indigo-500/35 text-5xl transition-opacity duration-300 pointer-events-none"
                style={{
                  width: c,
                  height: c,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-55%, -45%) rotate(${Math.atan(a/b)}rad)`,
                  opacity: t > 0.9 ? 1 : 0
                }}
              >
                <div style={{ transform: `rotate(-${Math.atan(a/b)}rad)` }}>
                  <InlineMath math="c^2" />
                </div>
              </div>

              <svg width={a+b} height={a+b} className="absolute inset-0 drop-shadow-md">
                {/* T1: Static top-right */}
                <path d={`M ${b},0 L ${a+b},0 L ${a+b},${b} Z`} className="fill-indigo-500 stroke-indigo-600 stroke-2" />
                
                {/* T2: Moves (-b, a) */}
                <path 
                  d={`M ${b - b*t},${0 + a*t} L ${a+b - b*t},${b + a*t} L ${b - b*t},${b + a*t} Z`} 
                  className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" 
                />
                
                {/* T3: Moves (0, -b) */}
                <path 
                  d={`M ${0},${b - b*t} L ${b},${b - b*t} L ${0},${a+b - b*t} Z`} 
                  className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" 
                />
                
                {/* T4: Moves (a, 0) */}
                <path 
                  d={`M ${b + a*t},${b} L ${b + a*t},${a+b} L ${0 + a*t},${a+b} Z`} 
                  className="fill-indigo-500 stroke-indigo-600 stroke-2 transition-all duration-75" 
                />
              </svg>
            </div>
          )}

          {/* DEMO 2: WATER WHEEL */}
          {activeProof === 'water' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div 
                className="w-[330px] h-[330px] rounded-full border-[10px] border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden flex items-center justify-center"
                style={{
                  transform: `rotate(${waterAngle}deg)`,
                  transition: 'transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Decorative lines of the wheel */}
                <div className="absolute inset-0 border border-slate-700/35 rounded-full pointer-events-none" />
                <div className="absolute w-2 h-full bg-slate-800/40 left-1/2 -translate-x-1/2" />
                <div className="absolute h-2 w-full bg-slate-800/40 top-1/2 -translate-y-1/2" />

                <svg viewBox="0 0 340 340" className="w-full h-full absolute inset-0 z-10 overflow-visible">
                  
                  {/* Central Right Triangle */}
                  {/* Right vertex at (160, 190). Side a=60 up to (160, 130). Side b=80 right to (240, 190). */}
                  <polygon points="160,130 160,190 240,190" className="fill-slate-700 stroke-slate-500 stroke-2" />
                  
                  {/* Container A: side a=60. Origin top-left at (100, 130) */}
                  <g transform="translate(100, 130)">
                    {/* Water */}
                    <rect 
                      x="2" 
                      y={2 + 56 * waterLevel} 
                      width="56" 
                      height={56 * (1 - waterLevel)} 
                      rx="2"
                      className="fill-blue-500/85 stroke-blue-600/30 stroke-1 transition-all duration-1000 ease-in-out"
                    />
                    {/* Glass tank outline */}
                    <rect x="0" y="0" width="60" height="60" fill="none" className="stroke-slate-400 stroke-2" />
                    {/* Label inside tank */}
                    <text x="30" y="35" textAnchor="middle" className="font-bold text-sm fill-slate-300 tracking-wider">a²</text>
                  </g>

                  {/* Container B: side b=80. Origin top-left at (160, 190) */}
                  <g transform="translate(160, 190)">
                    {/* Water */}
                    <rect 
                      x="2" 
                      y={2 + 76 * waterLevel} 
                      width="76" 
                      height={76 * (1 - waterLevel)} 
                      rx="2"
                      className="fill-blue-500/85 stroke-blue-600/30 stroke-1 transition-all duration-1000 ease-in-out"
                    />
                    {/* Glass tank outline */}
                    <rect x="0" y="0" width="80" height="80" fill="none" className="stroke-slate-400 stroke-2" />
                    {/* Label inside tank */}
                    <text x="40" y="45" textAnchor="middle" className="font-bold text-base fill-slate-300 tracking-wider">b²</text>
                  </g>

                  {/* Container C: side c=100. Origin at (160, 130). Rotated by -53.13 deg */}
                  {/* In local coordinates, the tank is upright. */}
                  <g transform="translate(160, 130) rotate(-53.13)">
                    {/* Water */}
                    <rect 
                      x="2" 
                      y={2 + 96 * (1 - waterLevel)} 
                      width="96" 
                      height={96 * waterLevel} 
                      rx="2"
                      className="fill-blue-500/85 stroke-blue-600/30 stroke-1 transition-all duration-1000 ease-in-out"
                    />
                    {/* Glass tank outline */}
                    <rect x="0" y="0" width="100" height="100" fill="none" className="stroke-slate-400 stroke-2" />
                    {/* Label inside tank */}
                    <g transform="translate(50, 50)">
                      <text x="0" y="5" textAnchor="middle" className="font-bold text-lg fill-slate-300 tracking-wider" transform="rotate(53.13)">c²</text>
                    </g>
                  </g>

                </svg>

                {/* Central pin */}
                <div className="absolute w-5 h-5 bg-slate-800 rounded-full border-4 border-slate-600 z-20 shadow-md" />
              </div>
            </div>
          )}

          {/* DEMO 3: PERIGAL'S DISSECTION */}
          {activeProof === 'perigal' && (
            <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] md:w-[320px] md:h-[320px] overflow-visible bg-white rounded-2xl border border-slate-200/50 shadow-md relative">
              
              {/* Outer grid definitions for target and source */}
              
              {/* Smaller square (a^2): size 60x60. Original pos: (100, 130) -> (160, 190) */}
              {/* Destination center in Square C: (230, 120). Original center: (130, 160) */}
              {/* Rotates by -36.87 deg. Translation delta: (100, -40) */}
              <g 
                style={{
                  transform: `translate(${100 * t}px, ${-40 * t}px) rotate(${-36.87 * t}deg)`,
                  transformOrigin: '130px 160px',
                  transition: 'transform 0.1s linear'
                }}
              >
                <rect x="100" y="130" width="60" height="60" className="fill-red-400 stroke-red-500 stroke-2 shadow-sm" />
                <text x="130" y="165" textAnchor="middle" className="font-extrabold text-sm fill-red-800 opacity-60">a²</text>
              </g>

              {/* Four pieces of Square B (80x80, center C=(200, 230)) */}
              {/* Cut lines intersect borders at P1(240, 260), P2(170, 270), P3(160, 200), P4(230, 190) */}
              
              {/* Piece 1: Top-Right. Center starts at (220, 210). Dest center at (248, 114). delta: (28, -96) */}
              <g
                style={{
                  transform: `translate(${28 * t}px, ${-96 * t}px) rotate(${-36.87 * t}deg)`,
                  transformOrigin: '220px 210px',
                  transition: 'transform 0.1s linear'
                }}
              >
                <polygon points="200,230 230,190 240,190 240,260" className="fill-emerald-400 stroke-emerald-500 stroke-2" />
                <text x="223" y="215" textAnchor="middle" className="font-extrabold text-xs fill-emerald-800 opacity-60">1</text>
              </g>

              {/* Piece 2: Bottom-Right. Center starts at (220, 250). Dest center at (256, 158). delta: (36, -92) */}
              <g
                style={{
                  transform: `translate(${36 * t}px, ${-92 * t}px) rotate(${-36.87 * t}deg)`,
                  transformOrigin: '220px 250px',
                  transition: 'transform 0.1s linear'
                }}
              >
                <polygon points="200,230 240,260 240,270 170,270" className="fill-emerald-400/90 stroke-emerald-500 stroke-2" />
                <text x="218" y="255" textAnchor="middle" className="font-extrabold text-xs fill-emerald-800 opacity-60">2</text>
              </g>

              {/* Piece 3: Bottom-Left. Center starts at (180, 250). Dest center at (212, 166). delta: (32, -84) */}
              <g
                style={{
                  transform: `translate(${32 * t}px, ${-84 * t}px) rotate(${-36.87 * t}deg)`,
                  transformOrigin: '180px 250px',
                  transition: 'transform 0.1s linear'
                }}
              >
                <polygon points="200,230 170,270 160,270 160,200" className="fill-emerald-400/80 stroke-emerald-500 stroke-2" />
                <text x="178" y="250" textAnchor="middle" className="font-extrabold text-xs fill-emerald-800 opacity-60">3</text>
              </g>

              {/* Piece 4: Top-Left. Center starts at (180, 210). Dest center at (204, 122). delta: (24, -88) */}
              <g
                style={{
                  transform: `translate(${24 * t}px, ${-88 * t}px) rotate(${-36.87 * t}deg)`,
                  transformOrigin: '180px 210px',
                  transition: 'transform 0.1s linear'
                }}
              >
                <polygon points="200,230 160,200 160,190 230,190" className="fill-emerald-400/70 stroke-emerald-500 stroke-2" />
                <text x="183" y="208" textAnchor="middle" className="font-extrabold text-xs fill-emerald-800 opacity-60">4</text>
              </g>

              {/* Central Right Triangle (Anchor) */}
              <polygon points="160,130 160,190 240,190" className="fill-slate-100 stroke-slate-400 stroke-2 stroke-dashed" />

              {/* Targets outlines (dashed lines for educational guidance) */}
              {/* Square C (100x100 on hypotenuse) */}
              <g transform="translate(160, 130) rotate(-36.87)" className="opacity-45 pointer-events-none">
                <rect x="0" y="0" width="100" height="100" fill="none" className="stroke-indigo-400 stroke-2 stroke-dashed" />
                <text x="50" y="55" textAnchor="middle" className="font-bold text-lg fill-indigo-400" transform="rotate(36.87, 50, 50)">c²</text>
              </g>

              {/* Square B outline */}
              <rect x="160" y="190" width="80" height="80" fill="none" className="stroke-slate-300 stroke-1 stroke-dashed pointer-events-none" />
              <text x="200" y="278" textAnchor="middle" className="font-bold text-xs fill-emerald-500 opacity-65">b²</text>

              {/* Square A outline */}
              <rect x="100" y="130" width="60" height="60" fill="none" className="stroke-slate-300 stroke-1 stroke-dashed pointer-events-none" />
              <text x="130" y="122" textAnchor="middle" className="font-bold text-xs fill-red-500 opacity-65">a²</text>

            </svg>
          )}

          {/* DEMO 4: BHASKARA'S PUZZLE */}
          {activeProof === 'bhaskara' && (
            <svg viewBox="0 0 340 340" className="w-[300px] h-[300px] md:w-[320px] md:h-[320px] overflow-visible bg-white rounded-2xl border border-slate-200/50 shadow-md relative">
              
              {/* Outline of the c^2 outer square of side 100, centered at (170, 170) */}
              {/* Coordinates from 120 to 220. */}
              <g transform="translate(170, 170) rotate(-36.87) translate(-50, -50)" className="opacity-20 pointer-events-none">
                <rect x="0" y="0" width="100" height="100" fill="none" className="stroke-indigo-600 stroke-3" />
              </g>

              {/* Triangles: Leg horizontal = 80, vertical = 60. */}
              {/* Central hole is 20x20. */}

              {/* T1 (Top-Left): moves up-left (-40, -40) */}
              <g style={{ transform: `translate(${-40 * t}px, ${-40 * t}px)`, transition: 'transform 0.1s linear' }}>
                <polygon points="120,120 200,120 200,180" className="fill-amber-400 stroke-amber-500 stroke-2" />
                <text x="175" y="138" className="font-bold text-xs fill-amber-900 opacity-50">T1</text>
              </g>

              {/* T2 (Top-Right): moves up-right (40, -40) */}
              <g style={{ transform: `translate(${40 * t}px, ${-40 * t}px)`, transition: 'transform 0.1s linear' }}>
                <polygon points="220,120 220,200 160,200" className="fill-amber-400/90 stroke-amber-500 stroke-2" />
                <text x="205" y="175" className="font-bold text-xs fill-amber-900 opacity-50">T2</text>
              </g>

              {/* T3 (Bottom-Right): moves down-right (40, 40) */}
              <g style={{ transform: `translate(${40 * t}px, ${40 * t}px)`, transition: 'transform 0.1s linear' }}>
                <polygon points="220,220 140,220 140,160" className="fill-amber-400/80 stroke-amber-500 stroke-2" />
                <text x="165" y="205" className="font-bold text-xs fill-amber-900 opacity-50">T3</text>
              </g>

              {/* T4 (Bottom-Left): moves down-left (-40, 40) */}
              <g style={{ transform: `translate(${-40 * t}px, ${40 * t}px)`, transition: 'transform 0.1s linear' }}>
                <polygon points="120,220 120,140 180,140" className="fill-amber-400/70 stroke-amber-500 stroke-2" />
                <text x="135" y="165" className="font-bold text-xs fill-amber-900 opacity-50">T4</text>
              </g>

              {/* Small central square (b-a) = 20. Originally at (150, 150) -> (170, 170). Does not move. */}
              <rect x="150" y="150" width="20" height="20" className="fill-indigo-600 stroke-indigo-700 stroke-2 shadow-sm" />
              <text x="160" y="164" textAnchor="middle" className="font-extrabold text-[9px] fill-white opacity-85">c-b</text>

              {/* Secondary square guides in final layout (destinations showing a^2 and b^2) */}
              {t > 0.8 && (
                <g className="animate-in fade-in duration-300">
                  {/* Square a^2 guide on the left */}
                  <rect x="80" y="80" width="60" height="60" fill="none" className="stroke-red-500 stroke-2 stroke-dashed opacity-50" />
                  <text x="110" y="70" textAnchor="middle" className="font-bold text-xs fill-red-500">Cateto a²</text>
                  
                  {/* Square b^2 guide on the right */}
                  <rect x="200" y="200" width="80" height="80" fill="none" className="stroke-blue-500 stroke-2 stroke-dashed opacity-50" />
                  <text x="240" y="295" textAnchor="middle" className="font-bold text-xs fill-blue-500">Cateto b²</text>
                </g>
              )}

            </svg>
          )}

        </div>

      </div>

    </div>
  );
}
