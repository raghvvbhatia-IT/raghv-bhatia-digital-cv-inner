import React from 'react';

const About: React.FC = () => (
  <div style={{ padding: '28px 40px', maxWidth: 740 }}>

    <h2 style={{
      fontSize: 48,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 6,
      lineHeight: 1,
    }}>About Me</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />

    <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 20 }}>
      I'm <strong>Raghv Bhatia</strong> — an IT professional who thrives on solving technical challenges
      and improving IT workflows. Experienced in desktop support, cloud platforms, and end-user
      troubleshooting. Known for taking ownership, staying calm under pressure, and delivering
      results in fast-paced environments, with a strong focus on problem solving and continuous learning.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.9, marginBottom: 28 }}>
      Currently working as a <strong>Technology Digital Experience Partner</strong> at
      Farmlands Co-operative Ltd, where I lead IT support, hardware deployments, vendor management,
      and new retail site launches across New Zealand.
    </p>

    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />

    <h3 style={{
      fontSize: 30,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 16,
    }}>Education</h3>

    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>
          Bachelor of Information Technology
        </span>
        <span style={{ fontSize: 16, fontFamily: '"Playfair Display", Georgia, serif', color: '#444' }}>2019 – 2022</span>
      </div>
      <div style={{ fontSize: 17, color: '#555', marginTop: 4 }}>Ara Institute of Canterbury, New Zealand</div>
    </div>

  </div>
);

export default About;
