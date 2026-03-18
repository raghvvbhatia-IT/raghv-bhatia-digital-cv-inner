import React, { useEffect, useRef } from 'react';

/*
  NEXBOT — interactive robot wallpaper.
  Head and eyes smoothly track the mouse cursor.
  Uses direct DOM manipulation + RAF for 60fps without React re-renders.
*/

const RobotWallpaper: React.FC = () => {
  const headGroupRef   = useRef<SVGGElement>(null);
  const lPupilRef      = useRef<SVGCircleElement>(null);
  const rPupilRef      = useRef<SVGCircleElement>(null);
  const lShineRef      = useRef<SVGCircleElement>(null);
  const rShineRef      = useRef<SVGCircleElement>(null);
  const rafRef         = useRef(0);

  useEffect(() => {
    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let curRot = 0;   // smoothed head rotation
    let curPX  = 0;   // smoothed pupil X
    let curPY  = 0;   // smoothed pupil Y

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      // ── Head rotation (horizontal lean) ──────────────────────────────
      const screenCX = window.innerWidth  / 2;
      const screenCY = window.innerHeight * 0.40;
      const dx = mx - screenCX;
      const dy = my - screenCY;
      const targetRot = Math.max(-22, Math.min(22, (dx / window.innerWidth) * 44));
      curRot += (targetRot - curRot) * 0.07; // lerp for smoothness

      if (headGroupRef.current) {
        headGroupRef.current.setAttribute(
          'transform',
          `rotate(${curRot.toFixed(2)}, 110, 162)`
        );
      }

      // ── Pupil tracking ────────────────────────────────────────────────
      const dist    = Math.sqrt(dx * dx + dy * dy);
      const maxP    = 5.5;
      const targetPX = dist > 0 ? (dx / dist) * Math.min(maxP, dist / 55) : 0;
      const targetPY = dist > 0 ? (dy / dist) * Math.min(maxP, dist / 55) : 0;
      curPX += (targetPX - curPX) * 0.10;
      curPY += (targetPY - curPY) * 0.10;

      const setPupil = (
        pupil: SVGCircleElement | null,
        shine: SVGCircleElement | null,
        bx: number, by: number
      ) => {
        if (pupil) {
          pupil.setAttribute('cx', String((bx + curPX).toFixed(2)));
          pupil.setAttribute('cy', String((by + curPY).toFixed(2)));
        }
        if (shine) {
          shine.setAttribute('cx', String((bx + curPX - 3.2).toFixed(2)));
          shine.setAttribute('cy', String((by + curPY - 3.2).toFixed(2)));
        }
      };

      setPupil(lPupilRef.current, lShineRef.current,  78, 95);
      setPupil(rPupilRef.current, rShineRef.current, 142, 95);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(160deg, #060a18 0%, #0b1530 55%, #060a18 100%)',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      <style>{`
        @keyframes nexFloat {
          0%,100% { transform: translate(-50%,-52%) translateY(0); }
          50%      { transform: translate(-50%,-52%) translateY(-14px); }
        }
        @keyframes antPulse {
          0%,100% { opacity:.55; transform: scale(1); }
          50%      { opacity:1;   transform: scale(1.35); }
        }
        @keyframes chestPulse {
          0%,100% { opacity:.85; }
          50%      { opacity:1; }
        }
        @keyframes scanLine {
          0%   { transform: translateY(0); opacity:.6; }
          100% { transform: translateY(46px); opacity:0; }
        }
      `}</style>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'linear-gradient(rgba(0,190,255,0.035) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,190,255,0.035) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '72px 72px',
      }} />

      {/* Ambient glow behind robot */}
      <div style={{
        position: 'absolute', left: '50%', top: '44%',
        transform: 'translate(-50%,-50%)',
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,140,255,0.10) 0%, transparent 68%)',
        filter: 'blur(18px)',
        pointerEvents: 'none',
      }} />

      {/* ── NEXBOT ── */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        animation: 'nexFloat 3.8s ease-in-out infinite',
      }}>
        <svg
          width="230" height="390"
          viewBox="0 0 220 370"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#dce6f5"/>
              <stop offset="100%" stopColor="#b4c4dc"/>
            </linearGradient>
            <linearGradient id="headG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#eaf0fc"/>
              <stop offset="100%" stopColor="#c0cfea"/>
            </linearGradient>
            <linearGradient id="legG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#b0bcd4"/>
              <stop offset="100%" stopColor="#7888a8"/>
            </linearGradient>
            <linearGradient id="footG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#5870a0"/>
              <stop offset="100%" stopColor="#4060908"/>
            </linearGradient>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ── Shadow under feet ── */}
          <ellipse cx="110" cy="368" rx="70" ry="8" fill="rgba(0,0,0,0.35)" />

          {/* ── LEGS ── */}
          <rect x="58"  y="278" width="44" height="72" rx="12" fill="url(#legG)"/>
          <rect x="118" y="278" width="44" height="72" rx="12" fill="url(#legG)"/>
          {/* knee caps */}
          <rect x="62"  y="278" width="36" height="12" rx="6" fill="#c8d4e8"/>
          <rect x="122" y="278" width="36" height="12" rx="6" fill="#c8d4e8"/>
          {/* feet */}
          <rect x="50"  y="334" width="58" height="20" rx="9"  fill="#5870a0"/>
          <rect x="112" y="334" width="58" height="20" rx="9"  fill="#5870a0"/>
          {/* foot highlights */}
          <rect x="54"  y="336" width="28" height="5" rx="3" fill="rgba(255,255,255,0.18)"/>
          <rect x="116" y="336" width="28" height="5" rx="3" fill="rgba(255,255,255,0.18)"/>

          {/* ── BODY ── */}
          <rect x="42" y="162" width="136" height="124" rx="20" fill="url(#bodyG)"/>
          {/* body highlight */}
          <rect x="48" y="168" width="124" height="20" rx="10" fill="rgba(255,255,255,0.35)"/>
          {/* chest panel */}
          <rect x="57" y="188" width="106" height="62" rx="10" fill="#c4d0e8" stroke="#a4b4cc" strokeWidth="1.5"/>
          {/* chest heart / core */}
          <circle cx="110" cy="219" r="16" fill="#001428" filter="url(#softglow)"/>
          <circle cx="110" cy="219" r="11" fill="#0099ee" opacity="0.35" style={{ animation:'chestPulse 2.2s ease-in-out infinite' }}/>
          <circle cx="110" cy="219" r="6"  fill="#00ccff" filter="url(#glow)"    style={{ animation:'chestPulse 2.2s ease-in-out infinite' }}/>
          <circle cx="110" cy="219" r="3"  fill="#80eeff"/>
          {/* vent slots left */}
          <rect x="60" y="256" width="14" height="5" rx="2" fill="#8898b8"/>
          <rect x="60" y="264" width="14" height="5" rx="2" fill="#8898b8"/>
          <rect x="60" y="272" width="14" height="5" rx="2" fill="#8898b8"/>
          {/* vent slots right */}
          <rect x="146" y="256" width="14" height="5" rx="2" fill="#8898b8"/>
          <rect x="146" y="264" width="14" height="5" rx="2" fill="#8898b8"/>
          <rect x="146" y="272" width="14" height="5" rx="2" fill="#8898b8"/>

          {/* ── ARMS ── */}
          {/* Left */}
          <rect x="10" y="170" width="34" height="96" rx="15" fill="url(#bodyG)"/>
          <rect x="10" y="250" width="34" height="30" rx="13" fill="url(#legG)"/>
          {/* Left knuckle lights */}
          <circle cx="18" cy="265" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          <circle cx="27" cy="268" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          <circle cx="36" cy="265" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          {/* Right */}
          <rect x="176" y="170" width="34" height="96" rx="15" fill="url(#bodyG)"/>
          <rect x="176" y="250" width="34" height="30" rx="13" fill="url(#legG)"/>
          <circle cx="184" cy="265" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          <circle cx="193" cy="268" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          <circle cx="202" cy="265" r="3" fill="#00aaff" opacity="0.8" filter="url(#softglow)"/>
          {/* Shoulder joints */}
          <circle cx="44"  cy="178" r="12" fill="#c4d0e4" stroke="#a4b4cc" strokeWidth="1.5"/>
          <circle cx="176" cy="178" r="12" fill="#c4d0e4" stroke="#a4b4cc" strokeWidth="1.5"/>

          {/* ── HEAD GROUP (rotates via ref) ── */}
          <g ref={headGroupRef}>
            {/* Neck */}
            <rect x="88" y="148" width="44" height="20" rx="8" fill="#b4c4dc"/>
            <rect x="92" y="150" width="36" height="8"  rx="4" fill="rgba(255,255,255,0.25)"/>

            {/* Head shell */}
            <rect x="28"  y="36"  width="164" height="118" rx="24" fill="url(#headG)"/>
            {/* Top highlight */}
            <rect x="40"  y="44"  width="80"  height="22"  rx="11" fill="rgba(255,255,255,0.42)"/>

            {/* Visor recess */}
            <rect x="34"  y="68"  width="152" height="58"  rx="12" fill="#010e20"/>
            <rect x="36"  y="70"  width="148" height="54"  rx="11" fill="#001428"/>
            {/* Scan-line shimmer */}
            <rect x="36" y="70" width="148" height="6" rx="3"
              fill="rgba(0,200,255,0.12)"
              style={{ animation:'scanLine 3s linear infinite' }}
            />

            {/* ── LEFT EYE ── */}
            <ellipse cx="78" cy="95" rx="26" ry="20" fill="url(#eyeGlow)"/>
            <ellipse cx="78" cy="95" rx="22" ry="17" fill="#001c38"/>
            <ellipse cx="78" cy="95" rx="18" ry="13" fill="#0088cc" opacity="0.22"/>
            {/* iris */}
            <circle ref={lPupilRef} cx="78" cy="95" r="11" fill="#00ccff" filter="url(#softglow)"/>
            {/* pupil */}
            <circle cx="78" cy="95" r="5.5" fill="#001020"/>
            {/* shine */}
            <circle ref={lShineRef} cx="74.8" cy="91.8" r="3" fill="rgba(255,255,255,0.82)"/>

            {/* ── RIGHT EYE ── */}
            <ellipse cx="142" cy="95" rx="26" ry="20" fill="url(#eyeGlow)"/>
            <ellipse cx="142" cy="95" rx="22" ry="17" fill="#001c38"/>
            <ellipse cx="142" cy="95" rx="18" ry="13" fill="#0088cc" opacity="0.22"/>
            <circle ref={rPupilRef} cx="142" cy="95" r="11" fill="#00ccff" filter="url(#softglow)"/>
            <circle cx="142" cy="95" r="5.5" fill="#001020"/>
            <circle ref={rShineRef} cx="138.8" cy="91.8" r="3" fill="rgba(255,255,255,0.82)"/>

            {/* Mouth speaker grille */}
            <rect x="66" y="128" width="88" height="18" rx="7" fill="#010e20"/>
            {[72,82,92,102,112,122,132,142].map(x => (
              <rect key={x} x={x} y={131} width="4" height="12" rx="2"
                fill="#00aaff" opacity="0.55"/>
            ))}

            {/* Ear panels */}
            <rect x="18" y="62" width="14" height="46" rx="7"  fill="#b0bcd8"/>
            <rect x="20" y="75" width="10" height="18" rx="4"  fill="#00aaff" opacity="0.75" filter="url(#softglow)"/>
            <rect x="188" y="62" width="14" height="46" rx="7" fill="#b0bcd8"/>
            <rect x="190" y="75" width="10" height="18" rx="4" fill="#00aaff" opacity="0.75" filter="url(#softglow)"/>

            {/* Antenna stem + tip */}
            <rect x="107" y="10" width="6" height="28" rx="3" fill="#b0bcd8"/>
            <circle cx="110" cy="8" r="8" fill="#00ddff" filter="url(#glow)"
              style={{ animation:'antPulse 2s ease-in-out infinite', transformOrigin:'110px 8px' }}/>
            <circle cx="110" cy="8" r="4" fill="#ffffff" opacity="0.9"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RobotWallpaper;
