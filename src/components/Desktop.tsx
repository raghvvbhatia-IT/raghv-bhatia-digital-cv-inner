import React, { useState, useCallback } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Home from '../pages/Home';
import ScrollableSections from '../pages/ScrollableSections';
import Certifications from '../pages/Certifications';
import Projects from '../pages/Projects';
import Hobbies from '../pages/Hobbies';
import Contact from '../pages/Contact';

type PageKey = 'home' | 'about' | 'experience' | 'skills' | 'certifications' | 'projects' | 'hobbies' | 'contact';

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
  projects: 'Projects',
  hobbies: 'Hobbies',
  contact: 'Contact Details',
};

// Pages that are part of the scrollable view
const SCROLL_PAGES: PageKey[] = ['about', 'experience', 'skills'];
// Pages that are click-to-navigate
const CLICK_PAGES: PageKey[] = ['certifications', 'projects', 'hobbies'];

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
    const isScrollPage = SCROLL_PAGES.includes(page);
    if (isScrollPage) {
      return <ScrollableSections scrollTo={page as 'about' | 'experience' | 'skills'} />;
    }
    switch (page) {
      case 'home': return <Home navigate={nav} />;
      case 'certifications': return <Certifications />;
      case 'projects': return <Projects />;
      case 'hobbies': return <Hobbies />;
      case 'contact': return <Contact />;
      default: return null;
    }
  };

  const desktopIcons = [
    { label: 'My Portfolio', icon: '🖥️', page: 'home' as PageKey },
    { label: 'Contact Details', icon: '✉️', page: 'contact' as PageKey },
  ];

  // Sidebar nav groups
  const scrollNavItems: PageKey[] = ['about', 'experience', 'skills'];
  const clickNavItems: PageKey[] = ['certifications', 'projects', 'hobbies'];

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
              {/* Sidebar */}
              <div className="win-sidebar" style={{
                width: 285,
                background: '#fff',
                borderRight: '2px solid #c0c0c0',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px 0',
                overflowY: 'auto',
              }}>
                {/* Name block */}
                <div style={{ padding: '0 24px', marginBottom: 24, borderBottom: '1px solid #c0c0c0', paddingBottom: 24 }}>
                  <div style={{ fontSize: 51, lineHeight: 1.1, color: '#1a1a1a', fontFamily: '"Abril Fatface", Georgia, serif' }}>
                    Raghv{'\n'}Bhatia
                  </div>
                  <div style={{ fontSize: 23, color: '#444', marginTop: 12, fontFamily: 'Georgia, serif' }}>Portfolio '26</div>
                </div>

                {/* Scroll section nav — About, Experience, Skills */}
                {scrollNavItems.map(p => {
                  const current = activePage[w.id] ?? w.page;
                  const isActive = current === p || (SCROLL_PAGES.includes(current) && p === 'about' && !SCROLL_PAGES.includes(current));
                  const isScrollActive = SCROLL_PAGES.includes(current) && current === p;
                  return (
                    <div
                      key={p}
                      onClick={() => navigate(w.id, p)}
                      style={{
                        padding: '10px 24px',
                        cursor: 'pointer',
                        fontSize: 25,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                        color: '#000080',
                        textDecoration: isScrollActive ? 'none' : 'underline',
                        background: 'transparent',
                      }}
                    >
                      {isScrollActive ? '• ' : ''}{PAGE_TITLES[p].split('—').pop()?.trim() ?? PAGE_TITLES[p]}
                    </div>
                  );
                })}

                {/* Divider */}
                <div style={{ height: 1, background: '#c0c0c0', margin: '10px 24px' }} />

                {/* Click section nav — Certifications, Projects, Hobbies */}
                {clickNavItems.map(p => {
                  const current = activePage[w.id] ?? w.page;
                  const isActive = current === p;
                  return (
                    <div
                      key={p}
                      onClick={() => navigate(w.id, p)}
                      style={{
                        padding: '10px 24px',
                        cursor: 'pointer',
                        fontSize: 25,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                        color: '#000080',
                        textDecoration: isActive ? 'none' : 'underline',
                        background: 'transparent',
                      }}
                    >
                      {isActive ? '• ' : ''}{PAGE_TITLES[p]}
                    </div>
                  );
                })}
              </div>

              {/* Page content */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
