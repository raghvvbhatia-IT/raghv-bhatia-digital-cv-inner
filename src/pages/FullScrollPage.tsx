import React, { useState } from 'react';
import Certifications from './Certifications';

/* ── Design tokens — light warm gray with wallpaper accent colours ── */
const C = {
  bg:        '#eae7e2',   // warm light gray
  bgAlt:     '#e2dedb',   // slightly deeper warm gray for alternating sections
  text:      '#1a1a1a',   // near-black for strong contrast on light bg
  textSub:   '#5a5550',   // muted warm brown-gray
  accent:    '#b8880a',   // amber/gold (darkened for legibility on light bg)
  divider:   '#ccc8c2',   // warm gray divider
  cardBg:    '#f0ece6',   // warm off-white card
  cardBorder:'#d0cbc4',   // warm card border
  tag:       '#3d8a5e',   // green — from the wallpaper top stripe (darkened for contrast)
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
      same fire that brought me to New Zealand in 2019. Whether I'm solving IT challenges, exploring new
      technologies, or helping businesses make the most of their digital tools, I approach every project
      with the same mindset: curiosity, attention to detail, and a genuine desire to create something
      meaningful.
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
      </div>
      <div style={{ fontSize: 17, color: C.textSub, marginTop: 6 }}>Wellington Institute of Technology (WelTec), New Zealand</div>
    </div>
  </div>
);

/* ─────────────── Experience ─────────────── */
interface JobData {
  company: string;
  url: string;
  role: string;
  dates: string;
  tag?: string;
  prose: string;
}

const jobs: JobData[] = [
  {
    company: 'Farmlands Co-operative Ltd',
    url: 'https://www.farmlands.co.nz',
    role: 'Technology Digital Experience Partner',
    dates: 'May 2025 – Present',
    tag: 'Level 1 & 2',
    prose: 'In my current role at Farmlands Co-operative Ltd, I serve as the primary IT point of contact for both retail stores and corporate teams across New Zealand. I provide comprehensive technical support to ensure seamless daily operations for hundreds of staff members. My responsibilities include creating, configuring, and managing user accounts and third-party vendor access, while enabling secure external collaboration through Microsoft Teams and integrated applications. I handle full-cycle onboarding and offboarding processes — from initial account setup and access provisioning to secure deactivation — and coordinate hardware upgrades, replacements, and staff requests. I troubleshoot and resolve complex issues across critical business systems such as EFTPOS, Farmlands Pro, Microsoft Dynamics 365, and POS terminals, as well as supporting printers, laptops, desktops, and handheld devices. I maintain an accurate IT asset inventory, monitor system performance against strict SLAs, and escalate issues only when necessary. Additionally, I lead the complete IT setup for new retail site launches (including PCs, networks, scanners, and POS infrastructure) and deliver hands-on training to staff on key applications. By collaborating cross-functionally and optimising third-party integrations, I continuously improve business processes and minimise downtime.',
  },
  {
    company: 'Christchurch City Council',
    url: 'https://www.ccc.govt.nz',
    role: 'Digital Support Analyst',
    dates: 'December 2024 – May 2025',
    tag: 'Level 1 & 2',
    prose: 'At Christchurch City Council, I supported a large user base of over 3,000 staff members, ensuring reliable IT operations across the organisation. I managed the end-to-end user onboarding and offboarding lifecycle, including Active Directory access extensions, role changes, and temporary leave-based restrictions. Using tools such as SCCM, Intune, and Flexera, I deployed new hardware and decommissioned outdated devices efficiently. I created and maintained a comprehensive IT Knowledge Base to empower self-service and reduce repeat tickets. I categorised, troubleshot, and escalated P1 and P2 incidents while personally following up with users on critical issues to confirm resolution and close tickets promptly. I also administered access to more than 100 software applications through various admin portals, tailored to individual roles. This role strengthened my ability to deliver fast, accurate support in a high-volume public-sector environment while maintaining excellent user satisfaction.',
  },
  {
    company: 'Selwyn District Council',
    url: 'https://www.selwyn.govt.nz',
    role: 'Digital Operations Support Specialist',
    dates: 'August 2023 – October 2024',
    prose: 'While working at Selwyn District Council, I delivered frontline IT support by resolving daily support tickets quickly and effectively. I managed user onboarding and offboarding, including account creation, licensing allocation, and equipment provisioning. I achieved a 99% first-contact resolution rate and consistently met or exceeded SLA targets, ensuring minimal disruption to council services. I created and updated internal documentation and user guides to streamline processes for both IT and non-technical staff. I coordinated with external vendors for system upgrades and maintenance, and I actively investigated and resolved security incidents flagged by Microsoft Defender and internal alerts channels. My contributions extended to cross-departmental projects, where I collaborated with stakeholders to deliver timely IT solutions and support organisational initiatives.',
  },
  {
    company: 'ACC New Zealand',
    url: 'https://www.acc.co.nz',
    role: 'Performance Monitoring Specialist',
    dates: 'November 2022 – February 2023',
    tag: 'Internship',
    prose: 'At ACC New Zealand, I specialised in proactive system monitoring and performance optimisation. I tracked server and application health using advanced tools including AppDynamics, Zscaler ELK Stack, and Thousand Eyes. I supported multiple internal IT projects in partnership with team leads and designed and maintained a custom customer-service dashboard that integrated APIs, server data, and other applications for real-time insights. I worked closely with security teams to strengthen system protections and implemented after-hours change schedules, server patching, and security updates to maintain high availability and compliance. This short but intensive role sharpened my monitoring, automation, and risk-management skills in a fast-paced national organisation.',
  },
  {
    company: 'New World Supermarket',
    url: 'https://www.newworld.co.nz',
    role: 'Checkout Operator',
    dates: '2019 – February 2023',
    prose: 'During my time at New World, I delivered fast and friendly service to customers at the checkout, processing cash, EFTPOS, and credit card transactions accurately and efficiently. I greeted customers warmly, assisted with queries, and ensured every interaction was a positive one. I maintained a clean and well-organised checkout area, adhered to store policies and procedures, and supported teammates during busy periods and peak trading hours. This role developed my communication skills, my ability to work effectively under pressure, and my commitment to delivering excellent customer service consistently.',
  },
];

const AccordionJob: React.FC<JobData> = ({ company, url, role, dates, tag, prose }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: C.cardBg,
      border: `1px solid ${C.cardBorder}`,
      borderLeft: `4px solid ${C.accent}`,
      marginBottom: 16,
    }}>
      {/* Header — always visible, click to toggle */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '20px 24px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 26, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.accent, margin: '0 0 4px', lineHeight: 1.1 }}>{company}</h3>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 'bold', fontFamily: '"Playfair Display", Georgia, serif', color: C.text }}>{role}</span>
            {tag && <span style={{ fontSize: 11, background: C.tag, color: '#fff', padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5 }}>{tag}</span>}
          </div>
          <div style={{ fontSize: 14, color: C.textSub, marginTop: 4, fontFamily: '"Playfair Display", Georgia, serif' }}>
            {dates} &nbsp;·&nbsp; <a href={url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: C.accent, textDecoration: 'underline', opacity: 0.8 }}>{url.replace('https://', '')}</a>
          </div>
        </div>
        <span style={{ fontSize: 20, color: C.accent, flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </div>

      {/* Expandable prose */}
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${C.divider}` }}>
          <p style={{ fontSize: 17, lineHeight: 1.9, color: C.text, margin: '16px 0 0' }}>{prose}</p>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => (
  <div id="experience" style={sectionStyle(true)}>
    <h2 style={h2Style}>Work Experience</h2>
    <div style={dividerStyle} />
    {jobs.map(job => <AccordionJob key={job.company} {...job} />)}
  </div>
);

/* ─────────────── Skills ─────────────── */
const techSkills = [
  {
    category: 'Microsoft Ecosystem & Administration',
    items: [
      'Microsoft 365 Administration (Teams, Defender, Exchange, Purview)',
      'SCCM deployment & Intune management',
      'Microsoft FinOps application administration',
      'Dynamics 365 Retail application & hardware setup',
      'Azure administration (AZ-104 level)',
    ],
  },
  {
    category: 'Scripting & Automation',
    items: ['PowerShell scripting and automation', 'Claude Code (cloud projects)', 'Other AI-based automation tools'],
  },
  {
    category: 'Security & Compliance',
    items: [
      'Security Incident Response',
      'Cybersecurity practices (ISC2 level)',
      'Managing and auditing third-party vendor accounts',
    ],
  },
  {
    category: 'Troubleshooting & Support',
    items: [
      'Windows, iOS & Linux troubleshooting',
      'Payment Gateway & EFTPOS troubleshooting',
      'Hardware/software support (desktops, laptops, printers, POS, handheld devices)',
    ],
  },
  {
    category: 'Infrastructure & Network',
    items: [
      'Network configuration and device management',
      'IT asset inventory & compliance',
      'License management',
    ],
  },
  {
    category: 'Project & Service Management',
    items: [
      'Project planning and execution',
      'ITIL-based service management',
      'CRM tools (SAP C/4HANA and FinOps)',
    ],
  },
];

const softSkills = [
  'Collaborative team player – proven in cross-functional environments',
  'Excellent communication and customer service',
  'Self-motivated with a consistently positive attitude',
  'Strong time management and prioritisation under pressure',
  'Exceptional attention to detail (system configs, user access, hardware setup)',
  'Highly adaptable to new technologies and fast-changing business needs',
  'Outstanding problem-solving and critical-thinking abilities',
];

const SkillsSection: React.FC = () => (
  <div id="skills" style={sectionStyle()}>
    <h2 style={h2Style}>Skills</h2>
    <div style={dividerStyle} />

    <h3 style={{ fontSize: 22, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.text, marginBottom: 24 }}>Technical Skills</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
      {techSkills.map(group => (
        <div key={group.category}>
          <div style={{ fontSize: 15, fontWeight: 'bold', color: C.accent, letterSpacing: 0.5, marginBottom: 8 }}>
            {group.category}
          </div>
          <ul style={{ paddingLeft: 24, margin: 0, listStyleType: 'disc' }}>
            {group.items.map(item => (
              <li key={item} style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 4, color: '#111111' }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div style={{ height: 1, background: C.divider, marginBottom: 32 }} />

    <h3 style={{ fontSize: 22, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.text, marginBottom: 24 }}>Soft Skills</h3>
    <ul style={{ paddingLeft: 24, margin: 0, listStyleType: 'disc' }}>
      {softSkills.map((skill, i) => (
        <li key={i} style={{ fontSize: 17, lineHeight: 1.9, marginBottom: 6, color: '#111111' }}>{skill}</li>
      ))}
    </ul>
  </div>
);

/* ─────────────── Projects ─────────────── */
const ProjectCard: React.FC<{ title: string; website: string; github: string; description: string; inProgress?: boolean }> = ({ title, website, github, description, inProgress }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderLeft: `4px solid ${C.accent}`, marginBottom: 16 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3 style={{ fontSize: 22, fontFamily: '"Abril Fatface", Georgia, serif', fontWeight: 400, color: C.accent, margin: 0 }}>{title}</h3>
          {inProgress && <span style={{ fontSize: 11, background: '#d4a030', color: '#fff', padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5, fontWeight: 'bold', whiteSpace: 'nowrap' }}>IN PROGRESS</span>}
        </div>
        <span style={{ fontSize: 20, color: C.accent, flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${C.divider}` }}>
          {(website || github) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0 16px' }}>
              {website && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: C.textSub, width: 70, flexShrink: 0 }}>🌐 Website</span>
                <a href={website} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: C.accent, textDecoration: 'underline', wordBreak: 'break-all' }}>{website.replace('https://', '')}</a>
              </div>}
              {github && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: C.textSub, width: 70, flexShrink: 0 }}>💻 GitHub</span>
                <a href={github} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: C.accent, textDecoration: 'underline', wordBreak: 'break-all' }}>{github.replace('https://', '')}</a>
              </div>}
            </div>
          )}
          <p style={{ fontSize: 17, lineHeight: 1.9, color: '#111111', margin: 0 }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => (
  <div id="projects" style={sectionStyle()}>
    <h2 style={h2Style}>Projects</h2>
    <div style={dividerStyle} />
    <ProjectCard
      title="GRC Lab — CyberShield Financial Corp (CSFC)"
      website="https://raghvvbhatia-it.github.io/GRC-Lab---CyberShield-Financial-Corp-CSFC-/"
      github="https://github.com/raghvvbhatia-IT/GRC-Lab---CyberShield-Financial-Corp-CSFC-"
      description="Governance, Risk, and Compliance Lab — a self-contained training environment designed for learning governance, risk, and compliance within a realistic financial services context. Built entirely with fictional data and developed with the help of Claude Code, using AI-driven prompting to produce the desired outputs, this project simulates real-world GRC workflows and documentation. The goal is to gain hands-on, practical experience that directly mirrors what professionals encounter in the industry — from risk registers and policy frameworks to compliance audits and incident response planning — making it an ideal environment for building genuine GRC job-ready skills."
    />
    <ProjectCard
      title="Private AI Document Assistant (NotebookLM-Style)"
      website=""
      github=""
      inProgress
      description="NotebookLM is an AI-powered research assistant — think of it as a smart reading companion that can read through large documents, answer your questions about them, summarise complex information, create study guides, and even generate podcast-style audio overviews. Originally built by Google, it is a powerful tool for anyone who needs to make sense of large amounts of text quickly. This project is a privately hosted version of that same concept, built to run entirely within a company's own servers and devices — meaning no data ever leaves the organisation. Instead of sending sensitive company documents to Google's cloud, this setup uses Ollama (a tool for running AI models locally) combined with Mistral (a high-performance open-source AI model) to power the same intelligent document analysis — all behind closed doors. From a security and compliance perspective, this is significant. Many industries — particularly finance, legal, and healthcare — cannot risk uploading internal documents to third-party cloud services due to privacy regulations and data sovereignty requirements. This private setup gives teams all the power of an AI research assistant with none of the risk: company data stays on company infrastructure, every query is processed internally, and there is no dependency on external APIs or internet connectivity."
    />
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
