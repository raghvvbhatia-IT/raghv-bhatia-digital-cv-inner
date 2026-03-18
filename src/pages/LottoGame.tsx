import React, { useRef, useEffect, useState, useCallback } from 'react';

// ── Wheel config ────────────────────────────────────────────────────────────
const SIZE = 300;
const SEG_COUNT = 8;
const SEG_ANGLE = (2 * Math.PI) / SEG_COUNT;

// Segment 0 (YOU WIN!) always lands at pointer (top).
// Landing rotation r satisfies: r - π/2 + SEG_ANGLE/2 = 3π/2  →  r = -π/8 ≡ 15π/8
// We add 6 full spins so wheel visibly rotates: TARGET = 14π - π/8
const TARGET_ROTATION = 14 * Math.PI - Math.PI / 8;

const SEGMENTS = [
  { label: 'YOU WIN!',   bg: '#FFD700', fg: '#1a1a1a' },
  { label: 'TRY AGAIN',  bg: '#6b7280', fg: '#ffffff' },
  { label: 'ALMOST!',    bg: '#3b82f6', fg: '#ffffff' },
  { label: 'SO CLOSE!',  bg: '#10b981', fg: '#ffffff' },
  { label: 'NEXT TIME',  bg: '#f97316', fg: '#ffffff' },
  { label: 'LUCKY?',     bg: '#8b5cf6', fg: '#ffffff' },
  { label: 'JACKPOT?',   bg: '#ef4444', fg: '#ffffff' },
  { label: 'SPIN AGAIN', bg: '#ec4899', fg: '#ffffff' },
];

// ── Wheel renderer ──────────────────────────────────────────────────────────
function drawWheel(canvas: HTMLCanvasElement | null, rotation: number): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 6;

  ctx.clearRect(0, 0, SIZE, SIZE);

  // Glow ring
  ctx.save();
  ctx.shadowColor = 'rgba(255,215,0,0.35)';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#0f0c29';
  ctx.beginPath();
  ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Segments
  for (let i = 0; i < SEG_COUNT; i++) {
    const start = rotation + i * SEG_ANGLE - Math.PI / 2;
    const end   = start + SEG_ANGLE;
    const mid   = start + SEG_ANGLE / 2;

    ctx.fillStyle = SEGMENTS[i].bg;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(mid);
    ctx.textAlign = 'right';
    ctx.fillStyle = SEGMENTS[i].fg;
    ctx.font = 'bold 11px Arial, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 3;
    ctx.fillText(SEGMENTS[i].label, r - 10, 4);
    ctx.restore();
  }

  // Center hub
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.arc(cx, cy, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 11px Arial Black, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LOTTO', cx, cy);
  ctx.textBaseline = 'alphabetic';
}

// ── Component ───────────────────────────────────────────────────────────────
type Phase = 'idle' | 'spinning' | 'won' | 'revealed';

const LottoGame: React.FC = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rotRef     = useRef(0);
  const rafRef     = useRef(0);
  const [phase,   setPhase]   = useState<Phase>('idle');
  const [flipped, setFlipped] = useState(false);

  // Initial draw
  useEffect(() => {
    drawWheel(canvasRef.current, rotRef.current);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Spin ──────────────────────────────────────────────────────────────────
  const spinWheel = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('spinning');

    const duration  = 4600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const t    = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4); // ease-out quart

      rotRef.current = TARGET_ROTATION * ease;
      drawWheel(canvasRef.current, rotRef.current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setPhase('won'), 550);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [phase]);

  // ── Reveal (card flip + CV download) ─────────────────────────────────────
  const handleReveal = useCallback(() => {
    if (flipped) return;
    setFlipped(true);
    setPhase('revealed');

    const link = document.createElement('a');
    link.href     = '/Raghv_Bhatia_CV.pdf';
    link.download = 'Raghv_Bhatia_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [flipped]);

  // ── Styles ────────────────────────────────────────────────────────────────
  const cardBase: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 18,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backfaceVisibility: 'hidden',
  };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      userSelect: 'none', position: 'relative',
      fontFamily: 'Arial, sans-serif',
    }}>

      {/* ── Title ── */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{
          fontSize: 62, fontWeight: 900, margin: 0,
          color: '#FFD700', letterSpacing: 10,
          textShadow: '0 0 30px rgba(255,215,0,0.55), 0 0 60px rgba(255,165,0,0.25)',
        }}>
          LOTTO
        </h1>
        <p style={{ color: '#9999bb', fontSize: 13, margin: '6px 0 0', letterSpacing: 3 }}>
          YOUR LUCKY DAY AWAITS
        </p>
      </div>

      {/* ── Wheel + pointer ── */}
      <div style={{ position: 'relative', marginBottom: 26 }}>
        {/* Pointer arrow */}
        <div style={{
          position: 'absolute', top: -14, left: '50%',
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '13px solid transparent',
          borderRight: '13px solid transparent',
          borderTop: '26px solid #FFD700',
          zIndex: 2,
          filter: 'drop-shadow(0 3px 8px rgba(255,215,0,0.9))',
        }} />

        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          onClick={spinWheel}
          style={{
            display: 'block', borderRadius: '50%',
            cursor: phase === 'idle' ? 'pointer' : 'default',
            boxShadow: '0 0 60px rgba(255,215,0,0.2)',
          }}
        />
      </div>

      {/* ── CTA below wheel ── */}
      {phase === 'idle' && (
        <button
          onClick={spinWheel}
          style={{
            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            color: '#1a1a1a', border: 'none',
            padding: '13px 46px', borderRadius: 50,
            fontSize: 16, fontWeight: 900, cursor: 'pointer',
            letterSpacing: 3, textTransform: 'uppercase',
            boxShadow: '0 6px 24px rgba(255,165,0,0.45)',
          }}
        >
          🎰 Click to Spin
        </button>
      )}

      {phase === 'spinning' && (
        <p style={{ color: '#FFD700', fontSize: 15, letterSpacing: 3, margin: 0 }}>
          ✨ Spinning...
        </p>
      )}

      {/* ── YOU WON overlay ── */}
      {(phase === 'won' || phase === 'revealed') && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(10, 8, 30, 1)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 38 }}>
            <div style={{ fontSize: 70, lineHeight: 1, marginBottom: 10 }}>🎉</div>
            <h2 style={{
              fontSize: 54, fontWeight: 900, margin: 0,
              color: '#FFD700', letterSpacing: 6,
              textShadow: '0 0 40px rgba(255,215,0,0.75)',
            }}>
              YOU WON!
            </h2>
            <p style={{ color: '#9999bb', fontSize: 15, margin: '10px 0 0', letterSpacing: 2 }}>
              Congratulations, you're a winner!
            </p>
          </div>

          {/* Card flip container */}
          <div style={{ perspective: '1200px', width: 360, height: 175 }}>
            <div style={{
              position: 'relative',
              width: '100%', height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>

              {/* Front face */}
              <div
                onClick={handleReveal}
                style={{
                  ...cardBase,
                  background: 'linear-gradient(135deg, #1a1a3e, #0f0c29)',
                  border: '2px solid #FFD700',
                  cursor: 'pointer',
                  boxShadow: '0 0 40px rgba(255,215,0,0.18)',
                }}
              >
                <span style={{ fontSize: 36 }}>🎁</span>
                <p style={{ color: '#FFD700', fontSize: 19, fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
                  You should try it
                </p>
                <p style={{ color: '#9999bb', fontSize: 13, margin: 0, letterSpacing: 2 }}>
                  Click to reveal
                </p>
              </div>

              {/* Back face */}
              <div style={{
                ...cardBase,
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                boxShadow: '0 0 60px rgba(255,215,0,0.55)',
              }}>
                <span style={{ fontSize: 36 }}>🏆</span>
                <p style={{ color: '#1a1a1a', fontSize: 21, fontWeight: 900, margin: 0, textAlign: 'center', lineHeight: 1.35 }}>
                  You found your next<br />perfect candidate!
                </p>
                <p style={{ color: '#5a3800', fontSize: 12, margin: '8px 0 0', letterSpacing: 1 }}>
                  ✓ CV is downloading...
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LottoGame;
