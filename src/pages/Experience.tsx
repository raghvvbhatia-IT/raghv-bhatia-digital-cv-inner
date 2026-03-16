import React from 'react';

interface JobProps {
  company: string;
  url?: string;
  role: string;
  dates: string;
  tag?: string;
  description?: string;
  bullets: string[];
}

const Job: React.FC<JobProps> = ({ company, url, role, dates, tag, description, bullets }) => (
  <div style={{ marginBottom: 0, paddingBottom: 28, borderBottom: '1px solid #ccc' }}>
    {/* Company name */}
    <h3 style={{
      fontSize: 36,
      fontFamily: '"Abril Fatface", Georgia, serif',
      fontWeight: 400,
      color: '#1a1a1a',
      marginBottom: 4,
      lineHeight: 1.1,
    }}>{company}</h3>

    {/* Role row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>{role}</span>
        {tag && (
          <span style={{ fontSize: 12, background: '#000080', color: '#fff', padding: '2px 8px', borderRadius: 2 }}>{tag}</span>
        )}
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {url && (
          <div>
            <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: '#000080', textDecoration: 'underline' }}>{url.replace('https://', '')}</a>
          </div>
        )}
        <div style={{ fontSize: 16, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>{dates}</div>
      </div>
    </div>

    {/* Description */}
    {description && (
      <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 10 }}>{description}</p>
    )}

    {/* Bullets */}
    <ul style={{ paddingLeft: 20 }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 6 }}>{b}</li>
      ))}
    </ul>
  </div>
);

const Experience: React.FC = () => (
  <div style={{ padding: '28px 32px', maxWidth: 740 }}>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Job
        company="Farmlands Co-operative"
        url="https://www.farmlands.co.nz"
        role="Technology Digital Experience Partner"
        dates="May 2025 – Present"
        tag="Level 1 & 2"
        description="Supporting 1000+ staff across New Zealand retail sites with IT operations, hardware deployments, and business-critical systems."
        bullets={[
          'Manage and support staff with IT system access to ensure smooth daily operations.',
          'Create, configure, and manage third-party vendor accounts.',
          'Enable secure collaboration with external organisations via Microsoft Teams.',
          'Provide frontline support for EFTPOS and key business systems including Farmlands Pro, FinOps, Dynamics SE, and POS.',
          'Handle onboarding and offboarding including user account setup, access provisioning, and deactivation.',
          'Lead IT setup for new retail sites including PCs, networks, POS, and scanners.',
          'Monitor system performance, escalate issues, and ensure resolution within SLAs.',
          'Train staff on IT tools, particularly Farmlands Pro, Dynamics SE, and POS systems.',
        ]}
      />

      <Job
        company="Christchurch City Council"
        url="https://www.ccc.govt.nz"
        role="Digital Support Analyst"
        dates="Dec 2024 – May 2025"
        tag="Level 1 & 2"
        description="Supported 3000+ council staff ensuring smooth daily operations across IT infrastructure and services."
        bullets={[
          'Handled user onboarding/offboarding and managed Active Directory access.',
          'Deployed new hardware and decommissioned old devices using SCCM, Intune, and Flexera Snow.',
          'Created and maintained IT Knowledge Base documentation.',
          'Troubleshot and escalated hardware issues; categorised incidents (P1/P2).',
          'Managed access to 100+ software applications based on user roles.',
        ]}
      />

      <Job
        company="Selwyn District Council"
        url="https://www.selwyn.govt.nz"
        role="Digital Operations Support Specialist"
        dates="Aug 2023 – Oct 2024"
        description="Delivered day-to-day IT support and contributed to cross-departmental infrastructure projects."
        bullets={[
          'Handled and resolved daily IT support tickets promptly.',
          'Coordinated with third-party vendors for IT operations and upgrades.',
          'Resolved 99% of IT issues with minimal disruption and within SLAs.',
          'Onboarded/offboarded staff with account setup, access, licensing, and equipment.',
          'Investigated and resolved security incidents flagged by Defender and Teams alerts.',
        ]}
      />

      <Job
        company="ACC New Zealand"
        url="https://www.acc.co.nz"
        role="Infrastructure Monitoring Specialist"
        dates="Nov 2022 – Feb 2023"
        tag="Internship"
        description="Monitored critical infrastructure and supported internal IT projects during a summer internship."
        bullets={[
          'Monitored server and app performance using AppDynamics, Zscaler ELK, and Thousand Eyes.',
          'Designed and managed a customer service dashboard integrating APIs and application data.',
          'Worked with security teams to strengthen system and server security.',
          'Managed change schedules, server patching and security updates after hours.',
        ]}
      />
    </div>
  </div>
);

export default Experience;
