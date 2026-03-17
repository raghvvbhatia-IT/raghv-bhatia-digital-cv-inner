import React from 'react';

const Projects: React.FC = () => (
  <div style={{ padding: '40px 40px', maxWidth: 740 }}>
    <h2 style={{
      fontSize: 48,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 6,
      lineHeight: 1,
    }}>Projects</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />

    <p style={{ fontSize: 21, lineHeight: 1.9, color: '#555' }}>
      Projects coming soon.
    </p>
  </div>
);

export default Projects;
