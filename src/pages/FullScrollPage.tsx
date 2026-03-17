import React from 'react';
import Certifications from './Certifications';

/* ─────────────── About ─────────────── */
const AboutSection: React.FC = () => (
  <div id="about" style={{ padding: '48px 60px', borderBottom: '2px solid #c0c0c0' }}>
    <h2 style={{ fontSize: 52, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1 }}>About Me</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <p style={{ fontSize: 21, lineHeight: 1.9, marginBottom: 20 }}>
      I'm <strong>Raghv Bhatia</strong> — an IT professional who thrives on solving technical challenges
      and improving IT workflows. Experienced in desktop support, cloud platforms, and end-user
      troubleshooting. Known for taking ownership, staying calm under pressure, and delivering
      results in fast-paced environments, with a strong focus on problem solving and continuous learning.
    </p>
    <p style={{ fontSize: 21, lineHeight: 1.9, marginBottom: 28 }}>
      Currently working as a <strong>Technology Digital Experience Partner</strong> at
      Farmlands Co-operative Ltd, where I lead IT support, hardware deployments, vendor management,
      and new retail site launches across New Zealand.
    </p>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <h3 style={{ fontSize: 30, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 16 }}>Education</h3>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 21, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>Bachelor of Information Technology</span>
        <span style={{ fontSize: 18, fontFamily: '"Playfair Display", Georgia, serif', color: '#444' }}>2019 – 2022</span>
      </div>
      <div style={{ fontSize: 19, color: '#555', marginTop: 4 }}>Ara Institute of Canterbury, New Zealand</div>
    </div>
  </div>
);

/* ─────────────── Experience ─────────────── */
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
  <div style={{ paddingBottom: 28, borderBottom: '1px solid #ccc' }}>
    <h3 style={{ fontSize: 36, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 4, lineHeight: 1.1 }}>{company}</h3>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>{role}</span>
        {tag && <span style={{ fontSize: 12, background: '#000080', color: '#fff', padding: '2px 8px', borderRadius: 2 }}>{tag}</span>}
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {url && <div><a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: '#000080', textDecoration: 'underline' }}>{url.replace('https://', '')}</a></div>}
        <div style={{ fontSize: 17, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>{dates}</div>
      </div>
    </div>
    {description && <p style={{ fontSize: 19, lineHeight: 1.8, marginBottom: 10 }}>{description}</p>}
    <ul style={{ paddingLeft: 20 }}>
      {bullets.map((b, i) => <li key={i} style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 6 }}>{b}</li>)}
    </ul>
  </div>
);

const ExperienceSection: React.FC = () => (
  <div id="experience" style={{ padding: '48px 60px', borderBottom: '2px solid #c0c0c0' }}>
    <h2 style={{ fontSize: 52, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1 }}>Work Experience</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Job company="Farmlands Co-operative" url="https://www.farmlands.co.nz" role="Technology Digital Experience Partner" dates="May 2025 – Present" tag="Level 1 & 2"
        description="Supporting 1000+ staff across New Zealand retail sites with IT operations, hardware deployments, and business-critical systems."
        bullets={['Manage and support staff with IT system access to ensure smooth daily operations.','Create, configure, and manage third-party vendor accounts.','Enable secure collaboration with external organisations via Microsoft Teams.','Provide frontline support for EFTPOS and key business systems including Farmlands Pro, FinOps, Dynamics SE, and POS.','Handle onboarding and offboarding including user account setup, access provisioning, and deactivation.','Lead IT setup for new retail sites including PCs, networks, POS, and scanners.','Monitor system performance, escalate issues, and ensure resolution within SLAs.','Train staff on IT tools, particularly Farmlands Pro, Dynamics SE, and POS systems.']} />
      <Job company="Christchurch City Council" url="https://www.ccc.govt.nz" role="Digital Support Analyst" dates="Dec 2024 – May 2025" tag="Level 1 & 2"
        description="Supported 3000+ council staff ensuring smooth daily operations across IT infrastructure and services."
        bullets={['Handled user onboarding/offboarding and managed Active Directory access.','Deployed new hardware and decommissioned old devices using SCCM, Intune, and Flexera Snow.','Created and maintained IT Knowledge Base documentation.','Troubleshot and escalated hardware issues; categorised incidents (P1/P2).','Managed access to 100+ software applications based on user roles.']} />
      <Job company="Selwyn District Council" url="https://www.selwyn.govt.nz" role="Digital Operations Support Specialist" dates="Aug 2023 – Oct 2024"
        description="Delivered day-to-day IT support and contributed to cross-departmental infrastructure projects."
        bullets={['Handled and resolved daily IT support tickets promptly.','Coordinated with third-party vendors for IT operations and upgrades.','Resolved 99% of IT issues with minimal disruption and within SLAs.','Onboarded/offboarded staff with account setup, access, licensing, and equipment.','Investigated and resolved security incidents flagged by Defender and Teams alerts.']} />
      <Job company="ACC New Zealand" url="https://www.acc.co.nz" role="Infrastructure Monitoring Specialist" dates="Nov 2022 – Feb 2023" tag="Internship"
        description="Monitored critical infrastructure and supported internal IT projects during a summer internship."
        bullets={['Monitored server and app performance using AppDynamics, Zscaler ELK, and Thousand Eyes.','Designed and managed a customer service dashboard integrating APIs and application data.','Worked with security teams to strengthen system and server security.','Managed change schedules, server patching and security updates after hours.']} />
    </div>
  </div>
);

/* ─────────────── Skills ─────────────── */
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

const SkillsSection: React.FC = () => (
  <div id="skills" style={{ padding: '48px 60px', borderBottom: '2px solid #c0c0c0' }}>
    <h2 style={{ fontSize: 52, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1 }}>Skills</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <h3 style={{ fontSize: 26, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 18 }}>Technical Skills</h3>
    <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
      {techSkills.flatMap(group => group.items.map(item => (
        <li key={item} style={{ fontSize: 18, lineHeight: 1.7, color: '#222' }}>{item}</li>
      )))}
    </ul>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <h3 style={{ fontSize: 26, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 18 }}>Soft Skills</h3>
    <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {softSkills.map((skill, i) => <li key={i} style={{ fontSize: 18, lineHeight: 1.7, color: '#222' }}>{skill}</li>)}
    </ul>
  </div>
);

/* ─────────────── Projects ─────────────── */
const ProjectsSection: React.FC = () => (
  <div id="projects" style={{ padding: '48px 60px', borderBottom: '2px solid #c0c0c0' }}>
    <h2 style={{ fontSize: 52, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1 }}>Projects</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <p style={{ fontSize: 21, lineHeight: 1.9, color: '#555' }}>Projects coming soon.</p>
  </div>
);

/* ─────────────── Hobbies ─────────────── */
const HobbiesSection: React.FC = () => (
  <div id="hobbies" style={{ padding: '48px 60px' }}>
    <h2 style={{ fontSize: 52, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1 }}>Hobbies</h2>
    <div style={{ height: 1, background: '#ccc', marginBottom: 28 }} />
    <p style={{ fontSize: 21, lineHeight: 1.9, color: '#555' }}>Hobbies coming soon.</p>
  </div>
);

/* ─────────────── Full Scroll Page ─────────────── */
const FullScrollPage: React.FC = () => (
  <div style={{ height: '100%', overflowY: 'auto' }}>
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <div id="certifications" style={{ borderBottom: '2px solid #c0c0c0' }}>
      <Certifications />
    </div>
    <ProjectsSection />
    <HobbiesSection />
  </div>
);

export default FullScrollPage;
