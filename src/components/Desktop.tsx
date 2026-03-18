import React, { useState, useCallback } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import FullScrollPage from '../pages/FullScrollPage';
import Contact from '../pages/Contact';
import PacManGame from '../pages/PacManGame';

type PageKey = 'portfolio' | 'contact' | 'pacman';

interface WindowState {
  id: string;
  title: string;
  page: PageKey;
  minimized: boolean;
  zIndex: number;
}

let zCounter = 10;

const PAGE_TITLES: Record<PageKey, string> = {
  portfolio: 'Raghv Bhatia — Portfolio',
  contact: 'Contact Details',
  pacman: 'Pac-Man',
};

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((page: PageKey) => {
    const existing = windows.find(w => w.page === page);
    if (existing) {
      setWindows(prev => prev.map(w =>
        w.id === existing.id ? { ...w, minimized: false, zIndex: ++zCounter } : w
      ));
      return;
    }
    const id = `${page}-${Date.now()}`;
    setWindows(prev => [...prev, { id, title: PAGE_TITLES[page], page, minimized: false, zIndex: ++zCounter }]);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: ++zCounter, minimized: false } : w
    ));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  }, []);

  const activeId = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? '';

  const renderPage = (page: PageKey) => {
    switch (page) {
      case 'portfolio': return <FullScrollPage />;
      case 'contact':   return <Contact />;
      case 'pacman':    return <PacManGame />;
    }
  };

  const desktopIcons = [
    { label: 'My Portfolio',    icon: '🖥️', page: 'portfolio' as PageKey },
    { label: 'Contact Details', icon: '✉️', page: 'contact'   as PageKey },
    { label: 'Pac-Man',         icon: '🕹️', page: 'pacman'    as PageKey },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#008080', position: 'relative', overflow: 'hidden' }}>

      {/* Desktop Icons */}
      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.page}
            label={icon.label}
            icon={icon.icon}
            onClick={() => openWindow(icon.page)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(w => !w.minimized && (
        <Window
          key={w.id}
          title={PAGE_TITLES[w.page]}
          onClose={() => closeWindow(w.id)}
          onMinimize={() => toggleMinimize(w.id)}
          onFocus={() => focusWindow(w.id)}
          zIndex={w.zIndex}
          initialX={80}
          initialY={20}
          initialWidth={800}
          initialHeight={520}
          startMaximized={true}
        >
          {renderPage(w.page)}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows.map(w => ({ id: w.id, title: PAGE_TITLES[w.page], minimized: w.minimized }))}
        onToggle={toggleMinimize}
        activeId={activeId}
      />
    </div>
  );
};

export default Desktop;
