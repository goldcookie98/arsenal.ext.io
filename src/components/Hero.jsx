// (The end of the file is clean)
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, MapPin, Tv, X, Lock } from 'lucide-react';

const Hero = () => {
    const [showStream, setShowStream] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isTime: false });

    // Set kickoff time (07/03/2026 at 12:15)
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();

            // Create a Date object for March 14, 2026 at 17:30
            const kickoff = new Date(2026, 2, 14, 17, 30, 0, 0); // Month is 0-indexed

            const diff = kickoff - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isTime: true });
            } else {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                    isTime: false
                });
            }
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-section" style={{
            position: 'relative',
            padding: '4rem 2rem 6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden'
        }}>

            {showStream && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1200px',
                        aspectRatio: '16/9',
                        backgroundColor: '#111',
                        border: '2px solid rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <button
                            onClick={() => setShowStream(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 1, 7, 0.8)'}
                            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            <X size={24} />
                        </button>

                        {timeLeft.isTime ? (
                            <iframe
                                title="Arsenal vs Everton Player"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                src="https://embedsports.top/embed/admin/ppv-arsenal-vs-everton/1"
                                scrolling="no"
                                allowFullScreen={true}
                                allow="encrypted-media; picture-in-picture;"
                                marginHeight="0"
                                marginWidth="0"
                                frameBorder="0"
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', fontFamily: 'Outfit' }}>
                                <Lock size={48} color="var(--color-crimson)" style={{ opacity: 0.8 }} />
                                <h2 style={{ fontSize: '2.5rem', color: 'white' }}>Stream Starts Soon</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
                                    The live broadcast will automatically unlock right here when the match begins at 17:30 on March 14th.
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginTop: '2rem',
                                    padding: '1.5rem 2.5rem',
                                    background: 'rgba(239, 1, 7, 0.1)',
                                    border: '1px solid var(--color-crimson)',
                                    borderRadius: '16px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                }}>
                                    {timeLeft.days > 0 && (
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                                                    {String(timeLeft.days).padStart(2, '0')}
                                                </span>
                                                <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Days</span>
                                            </div>
                                            <span style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>:</span>
                                        </>
                                    )}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                                            {String(timeLeft.hours).padStart(2, '0')}
                                        </span>
                                        <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Hours</span>
                                    </div>
                                    <span style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>:</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                                            {String(timeLeft.minutes).padStart(2, '0')}
                                        </span>
                                        <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Mins</span>
                                    </div>
                                    <span style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>:</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-crimson)', lineHeight: 1 }}>
                                            {String(timeLeft.seconds).padStart(2, '0')}
                                        </span>
                                        <span style={{ color: 'var(--color-gold)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Secs</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="animate-fade-in" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(239, 1, 7, 0.1)',
                border: '1px solid var(--color-crimson)',
                borderRadius: '999px',
                color: 'var(--color-crimson)',
                fontFamily: 'Outfit',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '2rem'
            }}>
                <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--color-crimson)',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px var(--color-crimson)'
                }}></span>
                Next Match — Sat 14 Mar
            </div>

            <h1 className="animate-fade-in delay-100" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textTransform: 'uppercase'
            }}>
                Arsenal <br />
                <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>vs Everton</span>
            </h1>

            <div className="animate-fade-in delay-200" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                marginBottom: '3rem',
                color: 'var(--text-secondary)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '1.125rem' }}>17:30 — Sat 14 Mar</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '1.125rem' }}>Emirates Stadium</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tv size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '1.125rem' }}>Peacock / Sky</span>
                </div>
            </div>

            <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    className="btn-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
                    onClick={() => setShowStream(true)}
                >
                    Match Preview
                </button>
                <a href="https://www.arsenal.com/tickets" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem', textDecoration: 'none' }}>
                    Buy Tickets <ChevronRight size={20} />
                </a>
            </div>
        </div>
    );
};

export default Hero;
