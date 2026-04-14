import React from 'react';
import { Shield, Menu, User, CalendarDays } from 'lucide-react';

const Navbar = () => {
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
                    background: 'linear-gradient(135deg, var(--color-crimson), var(--color-gold))',
                    padding: '0.4rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <Shield color="white" size={20} />
                </div>
                <span style={{
                    fontFamily: 'Outfit',
                    fontWeight: 800,
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    letterSpacing: '-1px',
                    whiteSpace: 'nowrap'
                }}>
                    Arsenal<span className="text-gradient">Tracker</span>
                </span>
            </div>

            <div style={{ display: 'none', gap: '2rem' }} className="nav-links">
                <a href="#fixtures" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>Fixtures</a>
                <a href="#lineup" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>Lineup</a>
                <a href="#standings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>Standings</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
