import React, { useState, useRef, useCallback } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  onFocus: () => void;
  zIndex: number;
  startMaximized?: boolean;
}

const Window: React.FC<WindowProps> = ({
  title, children, onClose, onMinimize,
  initialX = 40, initialY = 20,
  initialWidth = 780, initialHeight = 520,
  onFocus, zIndex, startMaximized = false
}) => {
  const [pos, setPos] = useState(startMaximized ? { x: 0, y: 0 } : { x: initialX, y: initialY });
  const [size, setSize] = useState(startMaximized ? { w: window.innerWidth, h: window.innerHeight - 32 } : { w: initialWidth, h: initialHeight });
  const [maximized, setMaximized] = useState(startMaximized);
  const [preMax, setPreMax] = useState({ x: initialX, y: initialY, w: initialWidth, h: initialHeight });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (maximized) return;
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus();
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      setPos({ x: ev.clientX - dragOffset.current.x, y: ev.clientY - dragOffset.current.y });
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [pos, maximized, onFocus]);

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const newW = Math.max(400, resizeStart.current.w + (ev.clientX - resizeStart.current.x));
      const newH = Math.max(300, resizeStart.current.h + (ev.clientY - resizeStart.current.y));
      setSize({ w: newW, h: newH });
    };
    const onUp = () => {
      resizing.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [size]);

  const toggleMaximize = () => {
    if (!maximized) {
      setPreMax({ x: pos.x, y: pos.y, w: size.w, h: size.h });
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 32 });
    } else {
      setPos({ x: preMax.x, y: preMax.y });
      setSize({ w: preMax.w, h: preMax.h });
    }
    setMaximized(!maximized);
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: pos.x,
    top: pos.y,
    width: size.w,
    height: size.h,
    background: '#c0c0c0',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #404040',
    borderBottom: '2px solid #404040',
    display: 'flex',
    flexDirection: 'column',
    zIndex,
    boxShadow: '2px 2px 0 #000',
  };

  const titleBarStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #000080, #1084d0)',
    color: '#fff',
    padding: '3px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'default',
    flexShrink: 0,
    height: 22,
  };

  const btnStyle: React.CSSProperties = {
    width: 16,
    height: 14,
    background: '#c0c0c0',
    borderTop: '1px solid #ffffff',
    borderLeft: '1px solid #ffffff',
    borderRight: '1px solid #404040',
    borderBottom: '1px solid #404040',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 9,
    fontWeight: 'bold',
    marginLeft: 2,
    flexShrink: 0,
    color: '#000',
  };

  return (
    <div style={style} onMouseDown={onFocus}>
      {/* Title bar */}
      <div style={titleBarStyle} onMouseDown={onTitleMouseDown}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 'bold', overflow: 'hidden' }}>
          <span style={{ fontSize: 12 }}>🖥</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', flexShrink: 0 }}>
          <div style={btnStyle} onMouseDown={(e) => { e.stopPropagation(); onMinimize(); }}>_</div>
          <div style={btnStyle} onMouseDown={(e) => { e.stopPropagation(); toggleMaximize(); }}>□</div>
          <div style={{ ...btnStyle, marginLeft: 2 }} onMouseDown={(e) => { e.stopPropagation(); onClose(); }}>✕</div>
        </div>
      </div>

      {/* Menu bar area */}
      <div style={{ background: '#c0c0c0', borderBottom: '1px solid #808080', padding: '2px 4px', fontSize: 11, flexShrink: 0, height: 20, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 12, cursor: 'default' }}>File</span>
        <span style={{ marginRight: 12, cursor: 'default' }}>View</span>
        <span style={{ cursor: 'default' }}>Help</span>
      </div>

      {/* Content */}
      <div className="win-inner-content" style={{ flex: 1, overflow: 'auto', background: '#fafafa', margin: 2 }}>
        {children}
      </div>

      {/* Status bar */}
      <div style={{ background: '#c0c0c0', padding: '2px 8px', fontSize: 11, flexShrink: 0, borderTop: '1px solid #808080', display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2025 Raghv Bhatia</span>
        <div
          style={{ width: 16, height: 16, cursor: 'nwse-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseDown={onResizeMouseDown}
        >⊿</div>
      </div>
    </div>
  );
};

export default Window;
