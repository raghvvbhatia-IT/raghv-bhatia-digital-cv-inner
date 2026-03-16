import React, { useState } from 'react';

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onMouseDown={() => setSelected(true)}
      onMouseUp={() => setSelected(false)}
      onDoubleClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 110,
        padding: 8,
        cursor: 'pointer',
        background: selected ? 'rgba(0,0,128,0.4)' : 'transparent',
        marginBottom: 14,
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 8, lineHeight: 1 }}>{icon}</div>
      <div style={{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        textShadow: '1px 1px 2px #000, -1px -1px 2px #000',
        wordBreak: 'break-word',
        lineHeight: 1.3,
      }}>
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;
