import React, { useState, useCallback } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Home from '../pages/Home';
import About from '../pages/About';
import Experience from '../pages/Experience';
import Skills from '../pages/Skills';
import Certifications from '../pages/Certifications';
import Contact from '../pages/Contact';

type PageKey = 'home' | 'about' | 'experience' | 'skills' | 'certifications' | 'contact';

interface WindowState {
  id: string;
  title: string;
  page: PageKey;
  minimized: boolean;
  zIndex: number;
}

let zCounter = 10;

const PAGE_TITLES: Record<PageKey, string> = {
  home: 'Raghv Bhatia — Home',
  about: 'About Me',
  experience: 'Work Experience',
  skills: 'Skills',
  certifications: 'Certifications',
  contact: 'Contact Details',
};

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'portfolio', title: 'Raghv Bhatia — Portfolio', page: 'home', minimized: false, zIndex: 10 }
  ]);
  const [activePage, setActivePage] = useState<Record<string, PageKey>>({ portfolio: 'home' });

  const openWindow = useCallback((page: PageKey) => {
    const existing = windows.find(w => w.page === page || (page === 'home' && w.id === 'portfolio'));
    if (existing) {
      setWindows(prev => prev.map(w =>
        w.id === existing.id ? { ...w, minimized: false, zIndex: ++zCounter } : w
      ));
      return;
    }
    const id = `${page}-${Date.now()}`;
    setWindows(prev => [...prev, {
      id, title: PAGE_TITLES[page], page, minimized: false, zIndex: ++zCounter
    }]);
    setActivePage(prev => ({ ...prev, [id]: page }));
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

  const navigate = useCallback((winId: string, page: PageKey) => {
    setActivePage(prev => ({ ...prev, [winId]: page }));
  }, []);

  const activeId = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? '';

  const renderPage = (winId: string, page: PageKey) => {
    const nav = (p: PageKey) => navigate(winId, p);
    switch (page) {
      case 'home': return <Home navigate={nav} />;
      case 'about': return <About />;
      case 'experience': return <Experience />;
      case 'skills': return <Skills />;
      case 'certifications': return <Certifications />;
      case 'contact': return <Contact />;
    }
  };

  const desktopIcons = [
    { label: 'My Portfolio', icon: '🖥️', page: 'home' as PageKey },
    { label: 'Contact Details', icon: '✉️', page: 'contact' as PageKey },
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
          title={PAGE_TITLES[activePage[w.id] ?? w.page]}
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
          {(activePage[w.id] ?? w.page) === 'home' || (activePage[w.id] ?? w.page) === 'contact' ? (
            renderPage(w.id, activePage[w.id] ?? w.page)
          ) : (
            <div style={{ display: 'flex', height: '100%' }}>
              {/* Sidebar — only on inner pages */}
              <div className="win-sidebar" style={{
                width: 285,
                background: '#fff',
                borderRight: '2px solid #c0c0c0',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px 0',
              }}>
                <div style={{ padding: '0 24px', marginBottom: 24, borderBottom: '1px solid #c0c0c0', paddingBottom: 24 }}>
                  <div style={{ fontSize: 51, lineHeight: 1.1, color: '#1a1a1a', fontFamily: '"Abril Fatface", Georgia, serif' }}>
                    Raghv{'\n'}Bhatia
                  </div>
                  <div style={{ fontSize: 23, color: '#444', marginTop: 12, fontFamily: 'Georgia, serif' }}>Portfolio '26</div>
                </div>
                {(['home','about','experience','skills','certifications'] as PageKey[]).map(p => {
                  const current = activePage[w.id] ?? w.page;
                  const isActive = current === p;
                  return (
                    <div
                      key={p}
                      onClick={() => navigate(w.id, p)}
                      style={{
                        padding: '12px 24px',
                        cursor: 'pointer',
                        fontSize: 27,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                        color: '#000080',
                        textDecoration: isActive ? 'none' : 'underline',
                        background: 'transparent',
                      }}
                    >
                      {isActive ? '• ' : ''}{PAGE_TITLES[p].split('—').pop()?.trim() ?? PAGE_TITLES[p]}
                    </div>
                  );
                })}
              </div>
              {/* Page content */}
              <div style={{ flex: 1, overflow: 'auto' }}>
                {renderPage(w.id, activePage[w.id] ?? w.page)}
              </div>
            </div>
          )}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows.map(w => ({ id: w.id, title: PAGE_TITLES[activePage[w.id] ?? w.page], minimized: w.minimized }))}
        onToggle={toggleMinimize}
        activeId={activeId}
      />
    </div>
  );
};

export default Desktop;
