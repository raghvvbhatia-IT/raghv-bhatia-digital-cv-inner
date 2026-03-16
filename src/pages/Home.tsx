import React from 'react';

interface HomeProps {
  navigate: (page: string) => void;
}

const navLinkStyle: React.CSSProperties = {
  color: '#000080',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: 2,
  background: 'none',
  border: 'none',
  padding: '4px 10px',
  fontFamily: 'inherit',
};

const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: 40, textAlign: 'center',
      background: `
        radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,180,0.18) 0%, transparent 60%),
        radial-gradient(circle at 15% 25%, rgba(180,220,220,0.13) 0%, transparent 35%),
        radial-gradient(circle at 80% 20%, rgba(200,180,220,0.10) 0%, transparent 30%),
        radial-gradient(circle at 70% 75%, rgba(180,220,200,0.10) 0%, transparent 30%),
        radial-gradient(circle at 25% 75%, rgba(220,200,180,0.10) 0%, transparent 30%),
        #f0eeeb
      `,
    }}>
      <h1 style={{ fontSize: 88, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, marginBottom: 14, lineHeight: 1, color: '#1a1a1a' }}>Raghv Bhatia</h1>
      <h2 style={{ fontSize: 26, fontWeight: 'normal', fontFamily: '"Playfair Display", Georgia, serif', color: '#333', marginBottom: 64, letterSpacing: 1 }}>Digital Experience Partner</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={navLinkStyle} onClick={() => navigate('about')}>ABOUT</button>
        <button style={navLinkStyle} onClick={() => navigate('experience')}>EXPERIENCE</button>
        <button style={navLinkStyle} onClick={() => navigate('skills')}>SKILLS</button>
        <button style={navLinkStyle} onClick={() => navigate('certifications')}>CERTIFICATIONS</button>
      </div>
    </div>
  );
};

export default Home;
