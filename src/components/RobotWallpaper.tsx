import React from 'react';

/* Retro Windows wallpaper — dark charcoal bg, four horizontal colour stripes, Windows logo */
const RobotWallpaper: React.FC = () => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    background: '#2b2b2b',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }}>
    <svg
      width="100%" height="100%"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Four horizontal stripes ── */}
      {/* Each stripe starts at left edge and ends at ~70% width */}
      <rect x="0" y="368" width="1010" height="52" fill="#5a9e7a" />
      <rect x="0" y="420" width="1010" height="42" fill="#4a8a8e" />
      <rect x="0" y="462" width="1010" height="50" fill="#d4a030" />
      <rect x="0" y="512" width="1010" height="44" fill="#cc3333" />

      {/* ── Windows logo (perspective trapezoid style) ── */}
      {/* Top-left pane */}
      <polygon points="1040,248 1180,260 1180,388 1040,376" fill="#e8e0c8" />
      {/* Top-right pane */}
      <polygon points="1195,262 1375,248 1375,388 1195,390" fill="#e8e0c8" />
      {/* Bottom-left pane */}
      <polygon points="1040,402 1180,414 1180,556 1040,544" fill="#e8e0c8" />
      {/* Bottom-right pane */}
      <polygon points="1195,416 1375,402 1375,556 1195,558" fill="#e8e0c8" />

      {/* Gap lines between panes (dark background colour) */}
      {/* Vertical centre gap */}
      <polygon points="1180,260 1195,262 1195,558 1180,556" fill="#2b2b2b" />
      {/* Horizontal centre gap */}
      <polygon points="1040,376 1375,388 1375,402 1040,402" fill="#2b2b2b" />
    </svg>
  </div>
);

export default RobotWallpaper;
