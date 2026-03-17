import React, { useEffect, useRef, useState } from 'react';

// ── Dimensions ────────────────────────────────────────────────────────────
const COLS = 21, ROWS = 21, CS = 22; // cell size px

// ── Cell types ────────────────────────────────────────────────────────────
const W=1, D=0, P=2, E=3; // wall, dot, power, ghost-house/empty

// ── Maze layout ───────────────────────────────────────────────────────────
const BASE: number[][] = [
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,D,D,D,D,D,D,D,D,D,W,D,D,D,D,D,D,D,D,D,W],
  [W,D,W,W,W,D,D,D,D,D,W,D,D,D,D,D,W,W,W,D,W],
  [W,P,W,D,D,D,D,D,D,D,W,D,D,D,D,D,D,D,W,P,W],
  [W,D,W,D,W,W,D,W,D,D,D,D,D,W,D,W,W,D,W,D,W],
  [W,D,D,D,D,W,D,D,D,D,D,D,D,D,D,W,D,D,D,D,W],
  [W,D,W,D,D,D,D,W,D,D,D,D,D,W,D,D,D,D,W,D,W],
  [W,D,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,D,W],
  [W,D,D,D,D,D,D,W,E,E,E,E,E,W,D,D,D,D,D,D,W],
  [D,D,D,D,D,D,D,W,E,E,E,E,E,W,D,D,D,D,D,D,D],
  [W,D,D,D,D,D,D,W,W,W,W,W,W,W,D,D,D,D,D,D,W],
  [W,D,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,D,W],
  [W,D,D,D,D,W,D,D,D,D,D,D,D,D,D,W,D,D,D,D,W],
  [W,D,W,D,W,W,D,W,D,D,D,D,D,W,D,W,W,D,W,D,W],
  [W,P,W,D,D,D,D,D,D,D,W,D,D,D,D,D,D,D,W,P,W],
  [W,D,W,W,W,D,D,D,D,D,W,D,D,D,D,D,W,W,W,D,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,D,W,W,D,W,D,W,D,D,D,D,D,W,D,W,D,W,W,D,W],
  [W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W],
  [W,D,D,W,D,D,D,D,D,D,W,D,D,D,D,D,D,W,D,D,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
];

// ── Directions ────────────────────────────────────────────────────────────
const NONE=0, LEFT=1, RIGHT=2, UP=3, DOWN=4;
type Dir = 0|1|2|3|4;
const DX = [0,-1,1,0,0];
const DY = [0,0,0,-1,1];
const REV: Dir[] = [0,2,1,4,3];

// ── Types ─────────────────────────────────────────────────────────────────
type GhostMode = 'exit'|'chase'|'scatter'|'frightened';
interface Pac { col:number; row:number; dir:Dir; next:Dir; }
interface Ghost { col:number; row:number; dir:Dir; mode:GhostMode; color:string; sx:number; sy:number; }

interface GS {
  maze: number[][];
  pac: Pac;
  ghosts: Ghost[];
  score: number;
  lives: number;
  dots: number;
  fright: number;     // frames remaining of fright
  combo: number;      // ghost eating combo
  phase: string;      // 'ready'|'playing'|'dying'|'win'|'gameover'
  dyingFrame: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────
const cloneMaze = (m:number[][]) => m.map(r=>[...r]);
const wc = (c:number) => ((c%COLS)+COLS)%COLS;
const countDots = (m:number[][]) => m.flat().filter(c=>c===D||c===P).length;

function canMove(col:number, row:number, maze:number[][], forGhost:boolean, gMode?:GhostMode):boolean {
  if (row<0||row>=ROWS) return false;
  const c = wc(col);
  const cell = maze[row][c];
  if (cell===W) return false;
  if (cell===E) {
    if (!forGhost) return false;
    if (gMode==='exit') return true; // exiting ghosts pass through ghost house
    return false; // chasing ghosts can't enter ghost house
  }
  return true;
}

function makeGS(): GS {
  const maze = cloneMaze(BASE);
  return {
    maze,
    pac: { col:10, row:18, dir:NONE, next:NONE },
    ghosts: [
      { col:10, row:8, dir:UP,   mode:'exit', color:'#FF0000', sx:19, sy:1  },
      { col:9,  row:9, dir:LEFT, mode:'exit', color:'#FFB8DE', sx:1,  sy:1  },
      { col:10, row:9, dir:UP,   mode:'exit', color:'#00FFFF', sx:19, sy:19 },
      { col:11, row:9, dir:RIGHT,mode:'exit', color:'#FFB852', sx:1,  sy:19 },
    ],
    score: 0, lives: 3, dots: countDots(maze),
    fright: 0, combo: 0,
    phase: 'ready', dyingFrame: 0,
  };
}

// ── Ghost AI ──────────────────────────────────────────────────────────────
function ghostMove(g:Ghost, pac:Pac, maze:number[][]): void {
  // If just exited ghost house, switch to chase
  if (g.mode==='exit' && g.row <= 7 && g.col===10) g.mode='chase';

  let tx:number, ty:number;
  if (g.mode==='exit') { tx=10; ty=7; }
  else if (g.mode==='scatter') { tx=g.sx; ty=g.sy; }
  else if (g.mode==='frightened') { tx=-1; ty=-1; } // random
  else { tx=pac.col; ty=pac.row; } // chase

  const dirs: Dir[] = [LEFT,RIGHT,UP,DOWN];

  if (g.mode==='frightened') {
    // random valid direction, no reverse
    const valid = dirs.filter(d =>
      d !== REV[g.dir] &&
      canMove(g.col+DX[d], g.row+DY[d], maze, true, g.mode)
    );
    if (valid.length) g.dir = valid[Math.floor(Math.random()*valid.length)] as Dir;
    else { // forced reverse
      const rev = REV[g.dir] as Dir;
      if (canMove(g.col+DX[rev], g.row+DY[rev], maze, true, g.mode)) g.dir=rev;
    }
  } else {
    // Pick direction minimising manhattan distance to target (no reverse)
    let best: Dir = g.dir, bestD = Infinity;
    for (const d of dirs) {
      if (d===REV[g.dir] && g.mode!=='exit') continue;
      const nc = g.col+DX[d], nr = g.row+DY[d];
      if (!canMove(nc, nr, maze, true, g.mode)) continue;
      const dist = Math.abs(wc(nc)-tx)+Math.abs(nr-ty);
      if (dist<bestD) { bestD=dist; best=d; }
    }
    g.dir = best;
  }

  const nc = wc(g.col+DX[g.dir]);
  const nr = g.row+DY[g.dir];
  if (canMove(nc, nr, maze, true, g.mode)) {
    g.col=nc; g.row=nr;
  }
}

// ── Pac-Man movement ──────────────────────────────────────────────────────
function pacMove(gs:GS): void {
  const {pac, maze} = gs;
  // Try queued direction
  if (pac.next !== NONE) {
    const nc = wc(pac.col+DX[pac.next]);
    const nr = pac.row+DY[pac.next];
    if (canMove(nc, nr, maze, false)) {
      pac.dir=pac.next; pac.next=NONE;
    }
  }
  // Move in current direction
  if (pac.dir !== NONE) {
    const nc = wc(pac.col+DX[pac.dir]);
    const nr = pac.row+DY[pac.dir];
    if (canMove(nc, nr, maze, false)) { pac.col=nc; pac.row=nr; }
  }
  // Eat
  const c = pac.col, r = pac.row;
  const cell = maze[r][c];
  if (cell===D) { maze[r][c]=E; gs.score+=10; gs.dots--; }
  if (cell===P) {
    maze[r][c]=E; gs.score+=50; gs.dots--;
    gs.fright=360; gs.combo=0;
    gs.ghosts.forEach(g => { if (g.mode!=='exit') g.mode='frightened'; });
  }
  if (gs.dots===0) gs.phase='win';
}

// ── Collision ─────────────────────────────────────────────────────────────
function checkColl(gs:GS): void {
  for (const g of gs.ghosts) {
    if (g.col!==gs.pac.col || g.row!==gs.pac.row) continue;
    if (g.mode==='frightened') {
      gs.combo++;
      gs.score += 200*gs.combo;
      g.mode='exit'; g.col=10; g.row=9;
    } else if (g.mode==='chase'||g.mode==='scatter') {
      gs.phase='dying'; gs.dyingFrame=0;
    }
  }
}

// ── Rendering ─────────────────────────────────────────────────────────────
function draw(canvas:HTMLCanvasElement|null, gs:GS, frame:number): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  const W2=COLS*CS, H2=ROWS*CS;

  ctx.fillStyle='#000';
  ctx.fillRect(0,0,W2,H2);

  // Maze
  for (let r=0;r<ROWS;r++) {
    for (let c=0;c<COLS;c++) {
      const cell = gs.maze[r][c];
      const x=c*CS, y=r*CS;
      if (cell===W) {
        // Blue wall with neon border effect
        ctx.fillStyle='#1a1aaa';
        ctx.fillRect(x,y,CS,CS);
        ctx.strokeStyle='#3333dd';
        ctx.lineWidth=1;
        ctx.strokeRect(x+1,y+1,CS-2,CS-2);
        // Inner dark fill
        ctx.fillStyle='#0d0d66';
        ctx.fillRect(x+3,y+3,CS-6,CS-6);
      } else if (cell===D) {
        ctx.fillStyle='#ffb8ae';
        ctx.beginPath(); ctx.arc(x+CS/2,y+CS/2,2.5,0,Math.PI*2); ctx.fill();
      } else if (cell===P) {
        const pr = 5+Math.sin(frame*0.15)*1.5;
        ctx.fillStyle='#ffffff';
        ctx.shadowColor='#ffffff'; ctx.shadowBlur=8;
        ctx.beginPath(); ctx.arc(x+CS/2,y+CS/2,pr,0,Math.PI*2); ctx.fill();
        ctx.shadowBlur=0;
      }
    }
  }

  // Ghosts
  for (const g of gs.ghosts) {
    if (gs.phase==='dying') break;
    const gx=g.col*CS+CS/2, gy=g.row*CS+CS/2, r=CS*0.44;
    const fright=g.mode==='frightened';
    const flash = fright && gs.fright<90 && frame%20<10;
    const col = flash?'#ffffff':fright?'#2222cc':g.color;

    // body
    ctx.fillStyle=col;
    ctx.beginPath();
    ctx.arc(gx, gy-r*0.1, r*0.95, Math.PI, 0, false);
    const waveY=gy+r*0.85;
    ctx.lineTo(gx+r*0.95, waveY);
    for (let i=0;i<3;i++) {
      const wx=gx+r*0.95-(r*1.9/3)*i;
      ctx.quadraticCurveTo(wx-r*0.32, waveY+(i%2===0?r*0.32:0), wx-r*0.63, waveY);
    }
    ctx.lineTo(gx-r*0.95, waveY);
    ctx.closePath();
    ctx.fill();

    if (!fright) {
      // White eyes
      ctx.fillStyle='white';
      ctx.beginPath(); ctx.ellipse(gx-r*0.32,gy-r*0.2,r*0.24,r*0.3,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(gx+r*0.32,gy-r*0.2,r*0.24,r*0.3,0,0,Math.PI*2); ctx.fill();
      // Pupils (look in direction of movement)
      const pdx=DX[g.dir]*r*0.1, pdy=DY[g.dir]*r*0.12;
      ctx.fillStyle='#0055ff';
      ctx.beginPath(); ctx.arc(gx-r*0.32+pdx,gy-r*0.2+pdy,r*0.13,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+r*0.32+pdx,gy-r*0.2+pdy,r*0.13,0,Math.PI*2); ctx.fill();
    } else {
      // Scared face
      ctx.strokeStyle=flash?'#ff4444':'#ffffff'; ctx.lineWidth=1.8;
      ctx.beginPath();
      ctx.moveTo(gx-r*0.4,gy+r*0.15);
      for (let i=0;i<4;i++) {
        ctx.lineTo(gx-r*0.4+i*r*0.27, gy+r*0.15+(i%2===0?r*0.22:0));
      }
      ctx.lineTo(gx+r*0.4,gy+r*0.15);
      ctx.stroke();
      ctx.fillStyle=flash?'#ff8888':'#aaaaff'; ctx.strokeStyle='none';
      ctx.beginPath(); ctx.arc(gx-r*0.28,gy-r*0.1,r*0.1,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(gx+r*0.28,gy-r*0.1,r*0.1,0,Math.PI*2); ctx.fill();
    }
  }

  // Pac-Man
  const {pac, phase, dyingFrame} = gs;
  const px=pac.col*CS+CS/2, py=pac.row*CS+CS/2;

  if (phase==='dying') {
    // Death spin animation: shrink and rotate
    const pct = Math.min(dyingFrame/45, 1);
    const scale = 1-pct*0.95;
    const rot = pct*Math.PI*2;
    ctx.save();
    ctx.translate(px,py);
    ctx.rotate(rot);
    ctx.scale(scale,scale);
    ctx.fillStyle='#FFD700';
    ctx.beginPath(); ctx.arc(0,0,CS*0.44,0.15,Math.PI*2-0.15); ctx.lineTo(0,0); ctx.closePath(); ctx.fill();
    ctx.restore();
  } else if (phase==='playing'||phase==='ready') {
    const mouth = Math.abs(Math.sin(frame*0.22))*0.35+0.03;
    const rotMap:Record<Dir,number> = {[NONE]:0,[LEFT]:Math.PI,[RIGHT]:0,[UP]:-Math.PI/2,[DOWN]:Math.PI/2};
    ctx.save();
    ctx.translate(px,py);
    ctx.rotate(rotMap[pac.dir]);
    ctx.fillStyle='#FFD700';
    ctx.shadowColor='#FFD700'; ctx.shadowBlur=6;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,CS*0.44,mouth,Math.PI*2-mouth); ctx.closePath(); ctx.fill();
    ctx.shadowBlur=0;
    // Eye
    ctx.fillStyle='#000';
    ctx.beginPath(); ctx.arc(CS*0.12,-CS*0.22,CS*0.07,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  // Overlay messages
  const cx2=W2/2, cy2=H2/2;
  const msg = (txt:string, col:string, y:number, size=20) => {
    ctx.font=`bold ${size}px 'Courier New', monospace`;
    ctx.textAlign='center';
    ctx.fillStyle=col;
    ctx.shadowColor=col; ctx.shadowBlur=12;
    ctx.fillText(txt,cx2,y);
    ctx.shadowBlur=0;
  };

  if (phase==='ready') {
    ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.fillRect(0,H2/2-44,W2,90);
    msg('PAC-MAN','#FFD700',cy2-14,26);
    if (frame%60<30) msg('PRESS  SPACE  TO  START','#ffffff',cy2+20,13);
    msg('↑↓←→  or  W A S D','#aaaaff',cy2+42,11);
  }
  if (phase==='win') {
    ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,W2,H2);
    msg('YOU WIN!','#00ff88',cy2-20,30);
    msg(`SCORE: ${gs.score}`,'#FFD700',cy2+15,18);
    if (frame%60<30) msg('PRESS SPACE TO PLAY AGAIN','#ffffff',cy2+45,12);
  }
  if (phase==='gameover') {
    ctx.fillStyle='rgba(0,0,0,0.75)'; ctx.fillRect(0,0,W2,H2);
    msg('GAME OVER','#ff3333',cy2-20,30);
    msg(`FINAL SCORE: ${gs.score}`,'#FFD700',cy2+15,16);
    if (frame%60<30) msg('PRESS SPACE TO RESTART','#ffffff',cy2+45,12);
  }
}

// ── Component ─────────────────────────────────────────────────────────────
const PacManGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gs = useRef<GS>(makeGS());
  const raf = useRef(0);
  const [hud, setHud] = useState({ score:0, lives:3, hi:0 });
  const hiRef = useRef(0);

  // Keys
  useEffect(() => {
    const onKey = (e:KeyboardEvent) => {
      const g = gs.current;
      const map:Record<string,Dir> = {
        ArrowLeft:LEFT as Dir, a:LEFT as Dir, ArrowRight:RIGHT as Dir, d:RIGHT as Dir,
        ArrowUp:UP as Dir, w:UP as Dir, ArrowDown:DOWN as Dir, s:DOWN as Dir,
      };
      if (map[e.key] !== undefined) { g.pac.next=map[e.key]; e.preventDefault(); }
      if (e.key===' '||e.key==='Enter') {
        if (g.phase!=='playing') {
          const fresh=makeGS(); fresh.phase='playing';
          gs.current=fresh;
          setHud(h=>({...h,score:0,lives:3}));
        }
        e.preventDefault();
      }
    };
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[]);

  // Loop
  useEffect(()=>{
    let frame=0;
    const loop=()=>{
      frame++;
      const g=gs.current;

      if (g.phase==='playing') {
        if (frame%8===0) { pacMove(g); checkColl(g); }
        g.ghosts.forEach((gh,i)=>{
          const spd=gh.mode==='frightened'?14:gh.mode==='exit'?5:10+i%2;
          if (frame%spd===0) { ghostMove(gh,g.pac,g.maze); checkColl(g); }
        });
        if (g.fright>0) { g.fright--; if(g.fright===0){g.ghosts.forEach(gh=>{if(gh.mode==='frightened')gh.mode='chase';});g.combo=0;} }
        if (frame%20===0) {
          if (g.score>hiRef.current) hiRef.current=g.score;
          setHud({score:g.score,lives:g.lives,hi:hiRef.current});
        }
      }

      if (g.phase==='dying') {
        g.dyingFrame++;
        if (g.dyingFrame>50) {
          g.lives--;
          if (g.lives<=0) { g.phase='gameover'; }
          else {
            // Reset positions
            g.pac={ col:10, row:18, dir:NONE, next:NONE };
            g.ghosts=[
              { col:10, row:8, dir:UP,    mode:'exit', color:'#FF0000', sx:19, sy:1  },
              { col:9,  row:9, dir:LEFT,  mode:'exit', color:'#FFB8DE', sx:1,  sy:1  },
              { col:10, row:9, dir:UP,    mode:'exit', color:'#00FFFF', sx:19, sy:19 },
              { col:11, row:9, dir:RIGHT, mode:'exit', color:'#FFB852', sx:1,  sy:19 },
            ];
            g.fright=0; g.combo=0; g.phase='playing';
          }
          setHud(h=>({...h,lives:g.lives,score:g.score}));
        }
      }

      draw(canvasRef.current, g, frame);
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf.current);
  },[]);

  return (
    <div style={{
      width:'100%',height:'100%',background:'#000',
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      userSelect:'none',
    }}>
      {/* HUD */}
      <div style={{
        width:COLS*CS,display:'flex',justifyContent:'space-between',alignItems:'center',
        padding:'6px 12px',background:'#0a0a2a',boxSizing:'border-box',
        borderBottom:'2px solid #3333dd',
      }}>
        <span style={{color:'#FFD700',fontFamily:'Courier New,monospace',fontSize:14,fontWeight:'bold',
          textShadow:'0 0 8px #FFD700'}}>
          SCORE {String(hud.score).padStart(6,'0')}
        </span>
        <span style={{color:'#00ffff',fontFamily:'Courier New,monospace',fontSize:18,fontWeight:'bold',
          letterSpacing:2,textShadow:'0 0 12px #00ffff'}}>
          PAC-MAN
        </span>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {Array.from({length:Math.max(0,hud.lives)}).map((_,i)=>(
            <svg key={i} width={14} height={14} viewBox="-1 -1 2 2">
              <path d={`M0,0 L1,0.4 A1,1,0,1,0,1,-0.4 Z`} fill="#FFD700"/>
            </svg>
          ))}
          <span style={{color:'#888',fontFamily:'Courier New,monospace',fontSize:11,marginLeft:4}}>
            HI {String(hud.hi).padStart(6,'0')}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={COLS*CS}
        height={ROWS*CS}
        style={{display:'block',cursor:'none'}}
      />

      {/* Controls hint */}
      <div style={{
        width:COLS*CS,padding:'4px 12px',background:'#0a0a2a',
        borderTop:'1px solid #222255',display:'flex',justifyContent:'center',gap:24,
        boxSizing:'border-box',
      }}>
        {['↑↓←→ or WASD — Move','Space — Start / Restart'].map(t=>(
          <span key={t} style={{color:'#444488',fontFamily:'Courier New,monospace',fontSize:10}}>{t}</span>
        ))}
      </div>
    </div>
  );
};

export default PacManGame;
