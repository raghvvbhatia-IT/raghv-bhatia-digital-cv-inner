import React from 'react';

const techSkills = [
  { category: 'Cloud Platforms', items: ['AWS', 'Azure AZ-900', 'Azure AZ-104', 'Microsoft Entra ID', 'Azure Active Directory'] },
  { category: 'Security & Compliance', items: ['Microsoft Defender', 'Microsoft Purview', 'Security Incident Response', 'ISC2 CC'] },
  { category: 'Endpoint & Device Management', items: ['Microsoft Intune', 'SCCM', 'Knox Management', 'Flexera Snow', 'Windows', 'iOS', 'Linux'] },
  { category: 'Microsoft 365 Administration', items: ['Teams Admin', 'Defender', 'Exchange', 'Purview', 'AppDynamics', 'Zscaler ELK', 'Thousand Eyes'] },
  { category: 'Business Applications', items: ['Microsoft FinOps', 'Dynamics 365', 'SAP C/4HANA', 'CRM Tools', 'EFTPOS / POS Systems', 'Payment Gateway Troubleshooting'] },
  { category: 'Scripting & Automation', items: ['PowerShell', 'Active Directory', 'ITIL Service Management', 'License Management', 'Network Configuration'] },
  { category: 'IT Service & Operations', items: ['Project Planning', 'IT Support', 'Vendor Account Management', 'User Onboarding & Offboarding', 'IT Asset Management'] },
];

const softSkills = [
  'Collaborative team player across cross-functional teams',
  'Strong communication and customer service',
  'Self-motivated and positive thinking',
  'Efficient time management and task prioritisation',
  'Attention to detail in system configuration and hardware setup',
  'Adaptable to new technologies and rapidly changing environments',
  'Excellent problem-solving and critical thinking',
];

const Skills: React.FC = () => (
  <div style={{ padding: '28px 40px', maxWidth: 740 }}>

    <h2 style={{
      fontSize: 48,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 6,
      lineHeight: 1,
    }}>Skills</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />

    {/* Technical Skills */}
    <h3 style={{
      fontSize: 26,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 18,
    }}>Technical Skills</h3>

    <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
      {techSkills.flatMap(group =>
        group.items.map(item => (
          <li key={item} style={{ fontSize: 17, lineHeight: 1.7, color: '#222' }}>{item}</li>
        ))
      )}
    </ul>

    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />

    {/* Soft Skills */}
    <h3 style={{
      fontSize: 26,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 18,
    }}>Soft Skills</h3>

    <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {softSkills.map((skill, i) => (
        <li key={i} style={{ fontSize: 17, lineHeight: 1.7, color: '#222' }}>{skill}</li>
      ))}
    </ul>

  </div>
);

export default Skills;
