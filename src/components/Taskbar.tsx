import React, { useState, useEffect } from 'react';

interface TaskbarWindow {
  id: string;
  title: string;
  minimized: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onToggle: (id: string) => void;
  activeId: string;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onToggle, activeId }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      let h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  const barStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 32,
    background: '#c0c0c0',
    borderTop: '2px solid #ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    zIndex: 999999,
    gap: 4,
  };

  const startBtnStyle: React.CSSProperties = {
    height: 24,
    padding: '0 8px',
    background: '#c0c0c0',
    borderTop: '2px solid #ffffff',
    borderLeft: '2px solid #ffffff',
    borderRight: '2px solid #404040',
    borderBottom: '2px solid #404040',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    height: 24,
    minWidth: 120,
    maxWidth: 200,
    padding: '0 8px',
    background: '#c0c0c0',
    borderTop: isActive ? '2px solid #808080' : '2px solid #ffffff',
    borderLeft: isActive ? '2px solid #808080' : '2px solid #ffffff',
    borderRight: isActive ? '2px solid #ffffff' : '2px solid #404040',
    borderBottom: isActive ? '2px solid #ffffff' : '2px solid #404040',
    cursor: 'pointer',
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  });

  const clockStyle: React.CSSProperties = {
    marginLeft: 'auto',
    height: 24,
    padding: '0 8px',
    borderTop: '2px solid #808080',
    borderLeft: '2px solid #808080',
    borderRight: '2px solid #ffffff',
    borderBottom: '2px solid #ffffff',
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: 6,
  };

  return (
    <div style={barStyle}>
      <div style={startBtnStyle}>
        <span>⊞</span>
        <span>Start</span>
      </div>
      <div style={{ width: 2, height: 20, borderLeft: '1px solid #808080', borderRight: '1px solid #fff', flexShrink: 0 }} />
      {windows.map(w => (
        <div key={w.id} style={tabStyle(w.id === activeId && !w.minimized)} onMouseDown={() => onToggle(w.id)}>
          🖥 {w.title}
        </div>
      ))}
      <div style={clockStyle}>
        <span>🔊</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
