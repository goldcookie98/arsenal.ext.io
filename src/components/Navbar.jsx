import React from 'react';
import { Shield, CalendarDays, User } from 'lucide-react';

const Navbar = ({ isDank, toggleDank }) => {
    return (
        <nav className="glass-panel" style={{
            position: 'sticky',
            top: '1rem',
            margin: '0 1rem',
            zIndex: 100,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                <div style={{
                    background: isDank
                        ? 'linear-gradient(135deg, #39FF14, #00cc00)'
                        : 'linear-gradient(135deg, var(--color-crimson), var(--color-gold))',
                    padding: '0.4rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.3s'
                }}>
                    {isDank ? <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>🐸</span> : <Shield color="white" size={20} />}
                </div>
                <span style={{
                    fontFamily: isDank ? "'Comic Sans MS', cursive" : 'Outfit',
                    fontWeight: 800,
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    letterSpacing: isDank ? '2px' : '-1px',
                    whiteSpace: 'nowrap',
                }}>
                    {isDank
                        ? <span className="dank-rainbow">🔥 DANK TRACKER 🔥</span>
                        : <>Arsenal<span className="text-gradient">Tracker</span></>
                    }
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Dank Mode Toggle */}
                <button
                    onClick={toggleDank}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        border: isDank ? '2px solid #39FF14' : '2px solid rgba(57,255,20,0.4)',
                        background: isDank
                            ? 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(0,204,0,0.1))'
                            : 'rgba(57,255,20,0.05)',
                        color: '#39FF14',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        boxShadow: isDank ? '0 0 15px #39FF14, 0 0 30px rgba(57,255,20,0.4)' : 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: isDank ? "'Comic Sans MS', cursive" : 'inherit',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                    }}
                    title={isDank ? 'Exit Dank Mode' : 'Enter Dank Mode 🐸'}
                >
                    <span style={{ fontSize: '1rem' }}>🐸</span>
                    {isDank ? 'EXIT DANK' : 'DANK MODE'}
                </button>

                <button className="btn-outline" style={{ display: 'flex', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    <CalendarDays size={18} /> Matches
                </button>
                <button style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)'
                }} className="glass-panel">
                    <User size={18} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
