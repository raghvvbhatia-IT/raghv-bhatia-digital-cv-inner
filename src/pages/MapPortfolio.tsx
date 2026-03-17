import React, { useState } from 'react';
import {
  AboutSection, ExperienceSection, SkillsSection,
  ProjectsSection, HobbiesSection,
} from './FullScrollPage';
import Certifications from './Certifications';

type PinId = 'about' | 'experience' | 'skills' | 'certifications' | 'projects' | 'hobbies';

interface Station {
  id: PinId; label: string; sublabel: string;
  x: number; y: number; color: string; num: number;
}

const ST: Station[] = [
  { id: 'about',          label: 'The Origin',   sublabel: 'About Me',       x: 155,  y: 448, color: '#3d6b3f', num: 1 },
  { id: 'experience',     label: 'The Citadel',  sublabel: 'Experience',     x: 378,  y: 368, color: '#1a4f8a', num: 2 },
  { id: 'skills',         label: 'The Workshop', sublabel: 'Skills',         x: 598,  y: 290, color: '#5e1f82', num: 3 },
  { id: 'certifications', label: 'The Summit',   sublabel: 'Certifications', x: 805,  y: 188, color: '#8c1a1a', num: 4 },
  { id: 'projects',       label: 'The Foundry',  sublabel: 'Projects',       x: 1018, y: 298, color: '#b84d00', num: 5 },
  { id: 'hobbies',        label: 'The Haven',    sublabel: 'Hobbies',        x: 1238, y: 428, color: '#0a5c4a', num: 6 },
];

const TRAIL =
  'M 155,448 C 240,422 310,392 378,368 ' +
  'C 460,342 535,315 598,290 ' +
  'C 668,263 740,224 805,188 ' +
  'C 868,165 948,212 1018,298 ' +
  'C 1082,368 1175,408 1238,428';

const CSS = `
  @keyframes charBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes pinGlow { 0%,100%{opacity:.4;r:18} 50%{opacity:.1;r:32} }
  .char-bob { animation: charBob 2s ease-in-out infinite; }
  .pin-pulse { animation: pinGlow 2s ease-in-out infinite; }
`;

/* ─── Teardrop pin ─── */
const Pin: React.FC<{ x: number; y: number; num: number; color: string; active: boolean; onClick: () => void }> =
  ({ x, y, num, color, active, onClick }) => {
    const s = active ? 1.25 : 1;
    return (
      <g transform={`translate(${x},${y}) scale(${s})`} onClick={onClick} style={{ cursor: 'pointer' }}>
        {active && <circle cx="0" cy="-18" r="18" fill={color} className="pin-pulse"/>}
        {/* drop shadow */}
        <path d="M 0,4 C -5,2 -13,-6 -13,-20 A 13,13 0 1,1 13,-20 C 13,-6 5,2 0,4 Z"
              fill="rgba(0,0,0,0.25)" transform="translate(2,3)"/>
        {/* main pin */}
        <path d="M 0,2 C -4,0 -13,-8 -13,-20 A 13,13 0 1,1 13,-20 C 13,-8 4,0 0,2 Z"
              fill={active ? color : '#5a4a3a'} stroke="#f4ead0" strokeWidth="1.8"/>
        {/* inner circle */}
        <circle cx="0" cy="-20" r="8" fill="rgba(255,255,255,0.18)"/>
        <text x="0" y="-16" textAnchor="middle" dominantBaseline="central"
              fontSize="11" fontWeight="bold" fill="white" style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {num}
        </text>
      </g>
    );
  };

/* ─── Cartographic tree symbol ─── */
const MapTree: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 7 }) => (
  <g transform={`translate(${x},${y})`} opacity="0.85">
    <circle cx="0" cy={-r} r={r} fill="#4a7040" stroke="#3a5030" strokeWidth="0.8"/>
    <line x1="0" y1={-r * 2} x2="0" y2="2" stroke="#3a5030" strokeWidth="1.2"/>
    <line x1={-r} y1={-r} x2={r} y2={-r} stroke="#3a5030" strokeWidth="0.8"/>
    <line x1={-r * 0.7} y1={-r * 1.7} x2={r * 0.7} y2={-r * 0.3} stroke="#3a5030" strokeWidth="0.7"/>
    <line x1={r * 0.7} y1={-r * 1.7} x2={-r * 0.7} y2={-r * 0.3} stroke="#3a5030" strokeWidth="0.7"/>
  </g>
);

/* ─── Mountain group ─── */
const Mountain: React.FC<{ cx: number; peak: number; base: number; w: number; snow?: boolean }> =
  ({ cx, peak, base, w, snow = true }) => {
    const lx = cx - w / 2, rx = cx + w / 2;
    const snowH = peak + (base - peak) * 0.28;
    return (
      <g>
        {/* shadow face (right) */}
        <polygon points={`${cx},${peak} ${rx},${base} ${cx},${base}`} fill="#9a8860"/>
        {/* light face (left) */}
        <polygon points={`${lx},${base} ${cx},${peak} ${cx},${base}`} fill="#c4aa78"/>
        {/* overall outline */}
        <polygon points={`${lx},${base} ${cx},${peak} ${rx},${base}`}
                 fill="none" stroke="#8b7355" strokeWidth="0.8" opacity="0.6"/>
        {/* hatching on shadow face */}
        {[0.25, 0.42, 0.58, 0.74].map((t, i) => {
          const x1 = cx + (rx - cx) * t * 0.6;
          const y1 = peak + (base - peak) * t * 0.55;
          const x2 = cx + (rx - cx) * t;
          const y2 = peak + (base - peak) * t;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                       stroke="#7a6540" strokeWidth="0.7" opacity="0.45"/>;
        })}
        {/* snow cap */}
        {snow && (
          <path d={`M ${cx - (rx - cx) * 0.22},${snowH} L ${cx},${peak} L ${cx + (rx - cx) * 0.22},${snowH} L ${cx + (rx - cx) * 0.12},${snowH - (snowH - peak) * 0.3} L ${cx},${snowH + 6} L ${cx - (rx - cx) * 0.12},${snowH - (snowH - peak) * 0.3} Z`}
                fill="#f0ece0" stroke="#d8d0c0" strokeWidth="0.5"/>
        )}
      </g>
    );
  };

/* ─── Traveller character ─── */
const Traveller: React.FC = () => (
  <g>
    {/* Ground shadow */}
    <ellipse cx="0" cy="12" rx="16" ry="5" fill="rgba(60,40,10,0.18)"/>
    {/* Backpack */}
    <rect x="7" y="-38" width="13" height="22" rx="3" fill="#a0522d"/>
    <rect x="9" y="-34" width="3.5" height="14" rx="1.5" fill="#7a3a1a" opacity="0.55"/>
    <rect x="9" y="-25" width="9" height="2.5" rx="1" fill="#7a3a1a" opacity="0.4"/>
    {/* Body / jacket */}
    <rect x="-9" y="-40" width="16" height="26" rx="4" fill="#1e3a6e"/>
    {/* Collar */}
    <path d="M -4,-40 L 0,-36 L 4,-40" fill="none" stroke="#f4ead0" strokeWidth="1.2"/>
    {/* Head */}
    <circle cx="0" cy="-53" r="12" fill="#f0c8a0"/>
    {/* Hair */}
    <path d="M -11,-62 Q 0,-72 11,-62 Q 11,-56 7,-55 Q 0,-62 -7,-55 Q -11,-56 -11,-62 Z" fill="#3d2515"/>
    {/* Headphone band */}
    <path d="M -11,-63 A 11,11 0 0,1 11,-63" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <rect x="-15" y="-68" width="8" height="11" rx="4" fill="#1a1a1a"/>
    <rect x="-14" y="-67" width="6" height="9" rx="3" fill="#333"/>
    <rect x="7" y="-68" width="8" height="11" rx="4" fill="#1a1a1a"/>
    <rect x="8" y="-67" width="6" height="9" rx="3" fill="#333"/>
    {/* Eyes */}
    <circle cx="-4" cy="-54" r="2" fill="#2c1810"/>
    <circle cx="4" cy="-54" r="2" fill="#2c1810"/>
    <circle cx="-3.2" cy="-54.5" r=".7" fill="white"/>
    <circle cx="4.8" cy="-54.5" r=".7" fill="white"/>
    {/* Smile */}
    <path d="M -3.5,-48 Q 0,-45 3.5,-48" stroke="#b8703a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Left arm — laptop */}
    <rect x="-20" y="-34" width="12" height="7" rx="3" fill="#1e3a6e" transform="rotate(-12,-14,-30)"/>
    {/* Laptop body */}
    <rect x="-34" y="-34" width="22" height="14" rx="2.5" fill="#1a232e"/>
    <rect x="-33" y="-33" width="20" height="12" rx="1.5" fill="#1a4fa0"/>
    <rect x="-32" y="-32" width="6" height="2" rx=".6" fill="rgba(255,255,255,.75)"/>
    <rect x="-32" y="-29" width="11" height="2" rx=".6" fill="rgba(255,255,255,.5)"/>
    <rect x="-32" y="-26" width="9" height="2" rx=".6" fill="rgba(255,255,255,.5)"/>
    <rect x="-34" y="-20" width="22" height="3.5" rx="1" fill="#111"/>
    {/* Right arm */}
    <rect x="7" y="-36" width="5" height="18" rx="2.5" fill="#1e3a6e"/>
    {/* Trousers */}
    <rect x="-8" y="-14" width="7" height="18" rx="3" fill="#1a2e52"/>
    <rect x="1" y="-14" width="7" height="18" rx="3" fill="#1a2e52"/>
    {/* Shoes */}
    <ellipse cx="-4.5" cy="5.5" rx="7" ry="3.5" fill="#1a1a1a"/>
    <ellipse cx="4.5" cy="5.5" rx="7" ry="3.5" fill="#1a1a1a"/>
  </g>
);

/* ─── Compass Rose ─── */
const Compass: React.FC = () => (
  <g transform="translate(1330,528)">
    <circle r="46" fill="#f4ead0" stroke="#8b6914" strokeWidth="2"/>
    <circle r="42" fill="none" stroke="#c8a84b" strokeWidth="0.8"/>
    {/* Ordinal spikes (NE/NW/SE/SW) */}
    {[45,135,225,315].map(a => (
      <polygon key={a} points="0,-42 -4,-12 0,-20 4,-12" fill="#c8a84b"
               transform={`rotate(${a})`}/>
    ))}
    {/* Cardinal N (dark) */}
    <polygon points="0,-42 -6,-14 0,-22 6,-14" fill="#2c1810"/>
    {/* Cardinal S/E/W (gold) */}
    <polygon points="0,42 -6,14 0,22 6,14" fill="#8b6914"/>
    <polygon points="42,0 14,-6 22,0 14,6" fill="#8b6914"/>
    <polygon points="-42,0 -14,-6 -22,0 -14,6" fill="#8b6914"/>
    {/* Center */}
    <circle r="7" fill="#8b6914"/>
    <circle r="3.5" fill="#f4ead0"/>
    {/* Labels */}
    <text x="0" y="-52" textAnchor="middle" fontSize="13" fontWeight="bold"
          fill="#2c1810" fontFamily="Georgia,serif">N</text>
    <text x="0" y="63" textAnchor="middle" fontSize="10" fill="#8b6914" fontFamily="Georgia,serif">S</text>
    <text x="56" y="4" textAnchor="middle" fontSize="10" fill="#8b6914" fontFamily="Georgia,serif">E</text>
    <text x="-56" y="4" textAnchor="middle" fontSize="10" fill="#8b6914" fontFamily="Georgia,serif">W</text>
  </g>
);

/* ─── Full map scene ─── */
const MapScene: React.FC<{ active: PinId | null; onPin: (id: PinId) => void }> = ({ active, onPin }) => {
  const charSt = active ? ST.find(s => s.id === active)! : ST[0];
  return (
    <svg width="100%" height="100%" viewBox="0 0 1400 600"
         preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <defs>
        {/* Parchment gradient */}
        <radialGradient id="parch" cx="50%" cy="50%" r="75%">
          <stop offset="0%"   stopColor="#f5ead0"/>
          <stop offset="100%" stopColor="#e8d4a8"/>
        </radialGradient>
        {/* Water pattern */}
        <pattern id="waves" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0,5 Q 5,0 10,5 Q 15,10 20,5" fill="none" stroke="#5b9ec0" strokeWidth="0.8" opacity="0.5"/>
        </pattern>
        {/* Forest fill */}
        <pattern id="forest-fill" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="5" fill="#4a7040" opacity="0.25"/>
        </pattern>
        {/* Vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
          <stop offset="60%"  stopColor="transparent"/>
          <stop offset="100%" stopColor="rgba(60,40,10,0.18)"/>
        </radialGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>

      {/* ── Parchment background ── */}
      <rect x="0" y="0" width="1400" height="600" fill="url(#parch)"/>
      {/* Subtle horizontal banding to suggest elevation/contours */}
      <path d="M 0,500 Q 350,480 700,495 Q 1050,510 1400,490 L 1400,600 L 0,600 Z" fill="#e0cc98" opacity="0.35"/>
      <path d="M 0,540 Q 350,525 700,538 Q 1050,550 1400,530 L 1400,600 L 0,600 Z" fill="#d4c090" opacity="0.3"/>
      <rect x="0" y="0" width="1400" height="600" fill="url(#vignette)"/>

      {/* ── Terrain colour fills ── */}
      {/* Highland plateau (warm tan behind mountains) */}
      <path d="M 480,200 Q 600,155 700,140 Q 820,128 940,165 Q 1060,200 1150,230 Q 1050,290 900,290 Q 750,285 600,300 Q 520,305 480,310 Z"
            fill="#d4b87a" opacity="0.45"/>
      {/* Mid-green belt */}
      <path d="M 0,380 Q 200,340 400,360 Q 600,380 800,350 Q 1000,320 1200,355 Q 1300,370 1400,360 L 1400,600 L 0,600 Z"
            fill="#7a9e60" opacity="0.55"/>
      {/* Lowland near trail */}
      <path d="M 0,430 Q 300,415 600,428 Q 900,440 1200,420 Q 1300,415 1400,425 L 1400,600 L 0,600 Z"
            fill="#6a9050" opacity="0.45"/>
      {/* Green valley floors */}
      <ellipse cx="260" cy="470" rx="180" ry="60" fill="#7aaa58" opacity="0.3"/>
      <ellipse cx="1120" cy="455" rx="200" ry="65" fill="#7aaa58" opacity="0.28"/>

      {/* ── Forest patches ── */}
      <ellipse cx="240" cy="430" rx="110" ry="55" fill="url(#forest-fill)" stroke="#4a7040" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="480" cy="410" rx="80" ry="40" fill="url(#forest-fill)" stroke="#4a7040" strokeWidth="0.8" opacity="0.6"/>
      <ellipse cx="1050" cy="415" rx="105" ry="50" fill="url(#forest-fill)" stroke="#4a7040" strokeWidth="0.8" opacity="0.65"/>
      <ellipse cx="1290" cy="445" rx="90" ry="42" fill="url(#forest-fill)" stroke="#4a7040" strokeWidth="0.8" opacity="0.6"/>

      {/* ── Mountains ── */}
      {/* Background range (smaller, lighter) */}
      <Mountain cx={400}  peak={195} base={320} w={240} snow={false}/>
      <Mountain cx={1020} peak={210} base={335} w={220} snow={false}/>
      {/* Main central range */}
      <Mountain cx={620}  peak={110} base={320} w={290}/>
      <Mountain cx={805}  peak={ 68} base={310} w={340}/>
      <Mountain cx={990}  peak={125} base={325} w={270}/>
      {/* Far flanking peaks */}
      <Mountain cx={200}  peak={235} base={340} w={180} snow={false}/>
      <Mountain cx={1200} peak={240} base={345} w={175} snow={false}/>

      {/* ── River ── */}
      {/* River flows from near Summit down through centre */}
      <path d="M 805,188 Q 830,240 818,290 Q 806,340 840,380 Q 875,420 910,408 Q 950,396 980,420"
            fill="none" stroke="#7ab8d8" strokeWidth="12" opacity="0.55" strokeLinecap="round"/>
      <path d="M 805,188 Q 830,240 818,290 Q 806,340 840,380 Q 875,420 910,408 Q 950,396 980,420"
            fill="none" stroke="url(#waves)" strokeWidth="12" opacity="0.6" strokeLinecap="round"/>
      {/* River label */}
      <text x="870" y="335" fontSize="9" fill="#3a6a90" fontStyle="italic" fontFamily="Georgia,serif"
            transform="rotate(-60,870,335)" opacity="0.7">River of Time</text>

      {/* ── Lake ── */}
      <ellipse cx="1168" cy="388" rx="105" ry="42" fill="#7ab8d8" opacity="0.55"/>
      <ellipse cx="1168" cy="385" rx="98" ry="36" fill="url(#waves)" opacity="0.7"/>
      <ellipse cx="1168" cy="383" rx="88" ry="28" fill="#a8d4e8" opacity="0.35"/>
      <text x="1168" y="387" textAnchor="middle" fontSize="9.5" fill="#1a4a70" fontStyle="italic"
            fontFamily="Georgia,serif" opacity="0.8">Reflection Lake</text>

      {/* ── Tree symbols ── */}
      {/* Forest patch 1 */}
      <MapTree x={194} y={438} r={8}/> <MapTree x={222} y={452} r={7}/> <MapTree x={250} y={440} r={9}/>
      <MapTree x={210} y={470} r={7}/> <MapTree x={240} y={476} r={8}/> <MapTree x={270} y={460} r={7}/>
      <MapTree x={175} y={462} r={6}/> <MapTree x={295} y={448} r={7}/>
      {/* Forest patch 2 */}
      <MapTree x={452} y={418} r={7}/> <MapTree x={478} y={432} r={8}/> <MapTree x={506} y={420} r={7}/>
      <MapTree x={464} y={448} r={6}/> <MapTree x={492} y={456} r={7}/>
      {/* Forest patch 3 */}
      <MapTree x={1012} y={422} r={8}/> <MapTree x={1040} y={438} r={9}/> <MapTree x={1068} y={424} r={7}/>
      <MapTree x={1025} y={456} r={7}/> <MapTree x={1055} y={462} r={8}/> <MapTree x={1082} y={445} r={6}/>
      {/* Forest patch 4 */}
      <MapTree x={1258} y={452} r={7}/> <MapTree x={1284} y={466} r={8}/> <MapTree x={1310} y={450} r={7}/>
      <MapTree x={1270} y={480} r={6}/> <MapTree x={1298} y={484} r={7}/>

      {/* ── The Trail ── */}
      {/* Road casing (outer, cream) */}
      <path d={TRAIL} stroke="#e8d4a0" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Road fill */}
      <path d={TRAIL} stroke="#a07840" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Centre dash */}
      <path d={TRAIL} stroke="#c8a050" strokeWidth="1.5" fill="none" strokeDasharray="14 10"
            strokeLinecap="round" opacity="0.7"/>

      {/* ── Decorative Map Border ── */}
      <rect x="8"  y="8"  width="1384" height="584" fill="none" stroke="#8b6914" strokeWidth="3.5"/>
      <rect x="15" y="15" width="1370" height="570" fill="none" stroke="#c8a84b" strokeWidth="1"/>
      {/* Corner ornaments */}
      {[[8,8],[1384,8],[8,576],[1384,576]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`}>
          <rect x="-6" y="-6" width="20" height="20" fill="#8b6914"/>
          <rect x="-2" y="-2" width="12" height="12" fill="#f4ead0"/>
          <rect x="1"  y="1"  width="6"  height="6"  fill="#c8a84b"/>
        </g>
      ))}

      {/* ── Title Banner ── */}
      <rect x="478" y="18" width="444" height="70" fill="#2c1810" rx="3"/>
      <rect x="482" y="22" width="436" height="62" fill="none" stroke="#c8a84b" strokeWidth="1"/>
      <text x="700" y="46" textAnchor="middle" fontSize="20" fontWeight="bold"
            fill="#f4ead0" fontFamily="Georgia,serif" letterSpacing="4">RAGHV BHATIA</text>
      <text x="700" y="72" textAnchor="middle" fontSize="11" fill="#c8a84b"
            fontFamily="Georgia,serif" letterSpacing="3">A  PROFESSIONAL  JOURNEY</text>

      {/* ── Legend ── */}
      <rect x="20" y="480" width="150" height="108" fill="#f4ead0" stroke="#8b6914" strokeWidth="1.2" rx="2"/>
      <text x="95" y="497" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2c1810"
            fontFamily="Georgia,serif" letterSpacing="2">LEGEND</text>
      <line x1="28" y1="501" x2="162" y2="501" stroke="#8b6914" strokeWidth="0.8"/>
      {/* Trail */}
      <path d="M 30,512 L 70,512" stroke="#a07840" strokeWidth="4" strokeLinecap="round"/>
      <path d="M 30,512 L 70,512" stroke="#c8a050" strokeWidth="1" strokeDasharray="8 5" strokeLinecap="round" opacity="0.7"/>
      <text x="78" y="516" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">Trail of Journey</text>
      {/* Mountain */}
      <polygon points="30,530 44,516 58,530" fill="#c4aa78"/>
      <polygon points="37,524 44,516 51,524 48,520 44,523 40,520" fill="#f0ece0"/>
      <text x="68" y="530" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">Mountain Range</text>
      {/* Forest */}
      <circle cx="42" cy="545" r="7" fill="#4a7040" stroke="#3a5030" strokeWidth="0.8"/>
      <line x1="42" y1="552" x2="42" y2="558" stroke="#3a5030" strokeWidth="1.2"/>
      <text x="58" y="549" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">Forest</text>
      {/* Water */}
      <path d="M 28,565 Q 35,561 42,565 Q 49,569 56,565" fill="none" stroke="#5b9ec0" strokeWidth="2" strokeLinecap="round"/>
      <text x="66" y="569" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">River / Lake</text>
      {/* Pin */}
      <path d="M 42,581 C 38,579 34,575 34,570 A 8,8 0 1,1 50,570 C 50,575 46,579 42,581 Z"
            fill="#5a4a3a" stroke="#f4ead0" strokeWidth="1"/>
      <text x="58" y="579" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">Location Pin</text>

      {/* ── Compass Rose ── */}
      <Compass/>

      {/* ── Scale Bar ── */}
      <g transform="translate(20,455)">
        <rect x="0" y="0" width="140" height="10" fill="#2c1810"/>
        <rect x="0" y="0" width="70" height="10" fill="#f4ead0"/>
        <rect x="70" y="0" width="70" height="10" fill="#2c1810"/>
        <text x="0"   y="22" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">0</text>
        <text x="62"  y="22" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">50</text>
        <text x="126" y="22" fontSize="9" fill="#2c1810" fontFamily="Georgia,serif">100 km</text>
      </g>

      {/* ── Traveller character ── */}
      <g style={{
        transform: `translate(${charSt.x}px,${charSt.y - 68}px)`,
        transition: active ? 'transform 0.85s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}>
        <g className="char-bob">
          <Traveller/>
        </g>
      </g>

      {/* ── Station Pins (rendered last = on top) ── */}
      {ST.map(s => (
        <Pin key={s.id} x={s.x} y={s.y} num={s.num} color={s.color}
             active={active === s.id} onClick={() => onPin(s.id)}/>
      ))}

      {/* Pin labels */}
      {ST.map(s => {
        const isActive = active === s.id;
        const offsetY = isActive ? 28 : 22;
        return (
          <g key={`lbl-${s.id}`} onClick={() => onPin(s.id)} style={{ cursor: 'pointer', pointerEvents: 'none' }}>
            <text x={s.x} y={s.y + offsetY} textAnchor="middle"
                  fontSize={isActive ? 11.5 : 10} fontWeight="bold" fontFamily="Georgia,serif"
                  fill={isActive ? s.color : '#2c1810'}
                  stroke="#f4ead0" strokeWidth="3" paintOrder="stroke"
                  style={{ userSelect: 'none', transition: 'all .3s' }}>
              {s.label}
            </text>
            <text x={s.x} y={s.y + offsetY + (isActive ? 15 : 13)} textAnchor="middle"
                  fontSize={isActive ? 9.5 : 8.5} fontFamily="Georgia,serif" fontStyle="italic"
                  fill={isActive ? s.color : '#5a4a3a'} opacity="0.9"
                  stroke="#f4ead0" strokeWidth="2.5" paintOrder="stroke"
                  style={{ userSelect: 'none' }}>
              {s.sublabel}
            </text>
          </g>
        );
      })}

      {/* ── Decorative text ── */}
      <text x="700" y="566" textAnchor="middle" fontSize="9.5" fill="#8b6914" fontStyle="italic"
            fontFamily="Georgia,serif" opacity="0.7">
        "Here be the milestones of a Technology Professional"
      </text>
    </svg>
  );
};

/* ─── Render section content ─── */
const renderContent = (id: PinId): React.ReactNode => {
  switch (id) {
    case 'about':          return <AboutSection/>;
    case 'experience':     return <ExperienceSection/>;
    case 'skills':         return <SkillsSection/>;
    case 'certifications': return <Certifications/>;
    case 'projects':       return <ProjectsSection/>;
    case 'hobbies':        return <HobbiesSection/>;
  }
};

/* ─── Main ─── */
const MapPortfolio: React.FC = () => {
  const [active, setActive] = useState<PinId | null>(null);
  const st = active ? ST.find(s => s.id === active)! : null;
  const idx = active ? ST.findIndex(s => s.id === active) : -1;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#e8d4a8' }}>
      <style>{CSS}</style>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        <MapScene active={active} onPin={id => setActive(p => p === id ? null : id)}/>
        {!active && (
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(44,24,16,0.72)', color: '#f4ead0', padding: '7px 22px',
            borderRadius: 3, fontSize: 12.5, whiteSpace: 'nowrap', pointerEvents: 'none',
            fontFamily: 'Georgia, serif', letterSpacing: 1, border: '1px solid rgba(200,168,75,0.5)',
          }}>
            ✦ Click a location pin to explore the journey ✦
          </div>
        )}
      </div>

      {/* Drawer */}
      <div style={{
        height: active ? '46%' : '42px',
        transition: 'height 0.42s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', flexShrink: 0,
        boxShadow: '0 -4px 18px rgba(44,24,10,0.22)',
        borderTop: '2px solid #8b6914',
      }}>
        {/* Header tab */}
        <div style={{
          height: 42, flexShrink: 0, display: 'flex', alignItems: 'center',
          padding: '0 20px', cursor: active ? 'pointer' : 'default',
          background: st ? st.color : '#2c1810',
          justifyContent: 'space-between', userSelect: 'none',
        }} onClick={() => active && setActive(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {st ? (
              <>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
                  STOP {st.num} OF {ST.length}
                </span>
                <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.3)' }}/>
                <span style={{ fontSize: 15, fontWeight: 'bold', color: 'white', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
                  {st.label}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', fontFamily: 'Georgia,serif' }}>
                  — {st.sublabel}
                </span>
              </>
            ) : (
              <span style={{ fontSize: 13, color: '#c8a84b', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
                ✦  Click a pin on the map to begin your journey
              </span>
            )}
          </div>
          {active && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {idx > 0 && (
                <button onClick={e => { e.stopPropagation(); setActive(ST[idx-1].id); }} style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white', padding: '3px 12px', borderRadius: 2, cursor: 'pointer',
                  fontSize: 12, fontFamily: 'Georgia,serif', letterSpacing: 0.5,
                }}>← Prev</button>
              )}
              {idx < ST.length - 1 && (
                <button onClick={e => { e.stopPropagation(); setActive(ST[idx+1].id); }} style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white', padding: '3px 12px', borderRadius: 2, cursor: 'pointer',
                  fontSize: 12, fontFamily: 'Georgia,serif', letterSpacing: 0.5,
                }}>Next →</button>
              )}
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>✕</span>
            </div>
          )}
        </div>
        {/* Content */}
        {active && (
          <div style={{ flex: 1, overflow: 'auto', background: '#ddd8d1' }}>
            {renderContent(active)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPortfolio;
