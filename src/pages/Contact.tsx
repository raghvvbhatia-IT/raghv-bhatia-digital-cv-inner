import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #ccc8c2',
    fontSize: 16,
    fontFamily: '"Playfair Display", Georgia, serif',
    marginTop: 6,
    marginBottom: 18,
    outline: 'none',
    background: '#f0ece6',
    color: '#1a1a1a',
    boxSizing: 'border-box',
  };

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    window.open(`mailto:Raghvv.bhatia@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`);
    setSent(true);
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <div style={{ background: '#eae7e2', minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 20px' }}>
    <div style={{ width: '100%', maxWidth: 600 }}>

      <h2 style={{
        fontSize: 48,
        fontFamily: '"Abril Fatface", Georgia, serif',
        fontWeight: 400,
        color: '#b8880a',
        marginBottom: 6,
        lineHeight: 1,
      }}>Contact</h2>
      <div style={{ height: 2, background: 'linear-gradient(to right, #b8880a, transparent)', marginBottom: 28 }} />

      {/* Direct contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
        <ContactRow label="Email" value="Raghvv.bhatia@gmail.com" href="mailto:Raghvv.bhatia@gmail.com" />
        <ContactRow label="Phone" value="+64 21 0903 7606" href="tel:+64210903760" />
        <ContactRow label="LinkedIn" value="linkedin.com/in/raghv-bhatia" href="https://www.linkedin.com/in/raghv-bhatia/" />
      </div>

      <div style={{ height: 1, background: '#ccc8c2', marginBottom: 28 }} />

      <h3 style={{
        fontSize: 28,
        fontFamily: '"Abril Fatface", Georgia, serif',
        fontWeight: 400,
        color: '#b8880a',
        marginBottom: 20,
      }}>Send a Message</h3>

      {sent && (
        <p style={{ fontSize: 16, color: '#3d8a5e', marginBottom: 16 }}>✔ Message sent! I'll be in touch.</p>
      )}

      <label style={{ fontSize: 15, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: '#1a1a1a' }}>Your Name *</label>
      <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Name" />

      <label style={{ fontSize: 15, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: '#1a1a1a' }}>Email *</label>
      <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />

      <label style={{ fontSize: 15, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: '#1a1a1a' }}>Message *</label>
      <textarea style={{ ...inputStyle, height: 120, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message..." />

      <button
        onClick={handleSubmit}
        disabled={!name || !email || !message}
        style={{
          padding: '10px 32px',
          fontSize: 15,
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 'bold',
          letterSpacing: 1,
          background: !name || !email || !message ? '#ccc8c2' : '#b8880a',
          color: !name || !email || !message ? '#8a8580' : '#fff',
          border: 'none',
          cursor: !name || !email || !message ? 'default' : 'pointer',
        }}
      >
        Send Message
      </button>

    </div>
    </div>
  );
};

const ContactRow: React.FC<{ label: string; value: string; href: string }> = ({ label, value, href }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
    <span style={{
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: '#111111',
      width: 80,
      flexShrink: 0,
    }}>{label}</span>
    <a href={href} target="_blank" rel="noreferrer" style={{
      fontSize: 17,
      color: '#b8880a',
      textDecoration: 'underline',
      fontFamily: '"Playfair Display", Georgia, serif',
    }}>{value}</a>
  </div>
);

export default Contact;
