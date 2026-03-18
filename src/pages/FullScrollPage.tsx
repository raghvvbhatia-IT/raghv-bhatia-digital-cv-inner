import React from 'react';
import Certifications from './Certifications';

/* ── Design tokens ── */
const C = {
  bg:        '#ddd8d1',   // warm stone — soft, not harsh on eyes
  bgAlt:     '#d4cfc8',   // slightly darker stone for alternating sections
  text:      '#1e1e1e',   // deep charcoal for good contrast on warm bg
  textSub:   '#4a4744',   // muted secondary text
  accent:    '#1a3a6b',   // deep professional blue
  divider:   '#c4bfb8',   // warm divider
  cardBg:    '#e8e3dc',   // warm card background (not white)
  cardBorder:'#c8c3bc',   // card border
  tag:       '#1a3a6b',
};

const sectionStyle = (alt?: boolean): React.CSSProperties => ({
  background: alt ? C.bgAlt : C.bg,
  padding: '56px 64px',
  borderBottom: `1px solid ${C.divider}`,
});

const h2Style: React.CSSProperties = {
  fontSize: 44,
  fontFamily: '"Abril Fatface", Georgia, serif',
  fontWeight: 400,
  color: C.accent,
  marginBottom: 8,
  lineHeight: 1,
};

const dividerStyle: React.CSSProperties = {
  height: 3,
  background: `linear-gradient(to right, ${C.accent}, transparent)`,
  marginBottom: 36,
  borderRadius: 2,
};

/* ─────────────── About ─────────────── */
const AboutSection: React.FC = () => (
  <div id="about" style={sectionStyle()}>
    <h2 style={h2Style}>About Me</h2>
    <div style={dividerStyle} />

    <p style={{ fontSize: 19, lineHeight: 1.95, color: C.text, marginBottom: 20, fontStyle: 'italic', borderLeft: `4px solid ${C.accent}`, paddingLeft: 20 }}>
      My story didn't start in a classroom — it started with a one-way ticket and a big dream.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.95, color: C.text, marginBottom: 20 }}>
      In 2019, I left India with a suitcase, a student visa, and an unshakeable passion for technology.
      New Zealand had caught my attention, so I took the leap. Stepping off the plane in{' '}
      <strong style={{ color: C.accent }}>Wellington</strong>, I felt equal parts excited and terrified —
      the cold, high-speed winds, the rolling steep hills, and the unfamiliar accent were all reminders
      that I was now 12,000 kilometres from home.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.95, color: C.text, marginBottom: 20 }}>
      I enrolled in the <strong style={{ color: C.accent }}>Bachelor of Information Technology</strong> at
      Wellington Institute of Technology (WelTec), ready to turn my passion into a career. Those three years became the
      most transformative chapter of my life. I went from writing my first simple scripts to building
      full applications, working on security and network setups, collaborating on real-world projects,
      and learning how to solve problems the Kiwi way — with creativity, teamwork, and a healthy dose
      of resilience.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.95, color: C.text, marginBottom: 20 }}>
      The journey wasn't always smooth. Balancing late-night assignments with homesickness, adapting to
      a completely different style of education, and pushing myself outside my comfort zone taught me
      more than any textbook ever could. But every challenge came with a reward: lifelong friends from
      all over the world, mentors who believed in me, and the confident mindset that I can thrive anywhere.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.95, color: C.text, marginBottom: 20 }}>
      Today, I'm based in <strong style={{ color: C.accent }}>Christchurch</strong>, still carrying that
      same fire that brought me to New Zealand in 2019. Currently working as a{' '}
      <strong style={{ color: C.accent }}>Technology Digital Experience Partner</strong> at Farmlands
      Co-operative Ltd, where I lead IT support, hardware deployments, vendor management, and new retail
      site launches across New Zealand. Whether I'm solving IT challenges, exploring new technologies,
      or helping businesses make the most of their digital tools, I approach every project with the same
      mindset: curiosity, attention to detail, and a genuine desire to create something meaningful.
    </p>

    <p style={{ fontSize: 18, lineHeight: 1.95, color: C.accent, marginBottom: 40, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif' }}>
      From the bustling streets of India to the stunning shores of Aotearoa — this is my journey.
      And it's only just getting started.
    </p>

    <div style={{ height: 1, background: C.divider, marginBottom: 32 }} />

    <h3 style={{ fontSize: 26, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.text, marginBottom: 20 }}>Education</h3>
    <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderLeft: `4px solid ${C.accent}`, padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif', color: C.text }}>
          Bachelor of Information Technology
        </span>
        <span style={{ fontSize: 16, color: C.textSub, fontFamily: '"Playfair Display", Georgia, serif' }}>2019 – 2022</span>
      </div>
      <div style={{ fontSize: 17, color: C.textSub, marginTop: 6 }}>Wellington Institute of Technology (WelTec), New Zealand</div>
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
  <div style={{
    background: C.cardBg,
    border: `1px solid ${C.cardBorder}`,
    borderLeft: `4px solid ${C.accent}`,
    padding: '24px 28px',
    marginBottom: 20,
  }}>
    <h3 style={{ fontSize: 30, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.accent, marginBottom: 6, lineHeight: 1.1 }}>{company}</h3>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif', color: C.text }}>{role}</span>
        {tag && <span style={{ fontSize: 11, background: C.tag, color: '#fff', padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5 }}>{tag}</span>}
      </div>
      <div style={{ textAlign: 'right' }}>
        {url && <div><a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: C.accent, textDecoration: 'underline', opacity: 0.8 }}>{url.replace('https://', '')}</a></div>}
        <div style={{ fontSize: 15, fontWeight: 'bold', color: C.textSub, fontFamily: '"Playfair Display", Georgia, serif' }}>{dates}</div>
      </div>
    </div>

    {description && <p style={{ fontSize: 17, lineHeight: 1.8, color: C.textSub, marginBottom: 14, fontStyle: 'italic' }}>{description}</p>}

    <ul style={{ paddingLeft: 20, margin: 0 }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ fontSize: 17, lineHeight: 1.85, marginBottom: 6, color: C.text }}>{b}</li>
      ))}
    </ul>
  </div>
);

const ExperienceSection: React.FC = () => (
  <div id="experience" style={sectionStyle(true)}>
    <h2 style={h2Style}>Work Experience</h2>
    <div style={dividerStyle} />
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
  <div id="skills" style={sectionStyle()}>
    <h2 style={h2Style}>Skills</h2>
    <div style={dividerStyle} />

    <h3 style={{ fontSize: 22, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.text, marginBottom: 20 }}>Technical Skills</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
      {techSkills.map(group => (
        <div key={group.category} style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, padding: '16px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 'bold', color: C.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{group.category}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {group.items.map(item => (
              <span key={item} style={{ fontSize: 15, background: C.bgAlt, border: `1px solid ${C.divider}`, color: C.text, padding: '4px 12px', borderRadius: 2 }}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div style={{ height: 1, background: C.divider, marginBottom: 32 }} />

    <h3 style={{ fontSize: 22, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.text, marginBottom: 20 }}>Soft Skills</h3>
    <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderLeft: `4px solid ${C.accent}`, padding: '20px 24px' }}>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {softSkills.map((skill, i) => (
          <li key={i} style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 6, color: C.text }}>{skill}</li>
        ))}
      </ul>
    </div>
  </div>
);

/* ─────────────── Projects ─────────────── */
const ProjectsSection: React.FC = () => (
  <div id="projects" style={sectionStyle()}>
    <h2 style={h2Style}>Projects</h2>
    <div style={dividerStyle} />
    <p style={{ fontSize: 19, lineHeight: 1.9, color: C.textSub }}>Projects coming soon.</p>
  </div>
);

/* ─────────────── Hobbies ─────────────── */
const HobbiesSection: React.FC = () => (
  <div id="hobbies" style={{ ...sectionStyle(true), borderBottom: 'none' }}>
    <h2 style={h2Style}>Hobbies</h2>
    <div style={dividerStyle} />
    <p style={{ fontSize: 19, lineHeight: 1.9, color: C.textSub }}>Hobbies coming soon.</p>
  </div>
);

/* ─────────────── Full Scroll Page ─────────────── */
const FullScrollPage: React.FC = () => (
  <div style={{ height: '100%', overflowY: 'auto', background: C.bg }}>
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <div id="certifications" style={{ background: C.bgAlt, borderBottom: `1px solid ${C.divider}` }}>
      <div style={{ padding: '56px 64px' }}>
        <Certifications />
      </div>
    </div>
    <ProjectsSection />
    <HobbiesSection />
  </div>
);

export default FullScrollPage;
