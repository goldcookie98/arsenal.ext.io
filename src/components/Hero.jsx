// (The end of the file is clean)
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, MapPin, Tv, X, Lock } from 'lucide-react';

const Hero = () => {
    const [showStream, setShowStream] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isTime: false });
    const [playerActivated, setPlayerActivated] = useState(false);

    // Set kickoff time (25/04/2026 at 17:30)
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();

            // Create a Date object for April 25, 2026 at 17:30
            const kickoff = new Date(2026, 3, 25, 17, 30, 0, 0); // Month 3 is April

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
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <iframe
                                    title="Arsenal vs. Fulham Player"
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    src="https://embedsports.top/embed/admin/ppv-arsenal-vs-fulham/1"
                                    scrolling="no"
                                    allowFullScreen={true}
                                    allow="encrypted-media; picture-in-picture;"
                                    marginHeight="0"
                                    marginWidth="0"
                                    frameBorder="0"
                                />
                                {!playerActivated && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: 'rgba(0,0,0,0.85)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10,
                                        gap: '1.5rem',
                                        padding: '2rem',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(239, 1, 7, 0.2)',
                                            border: '2px solid var(--color-crimson)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 0 20px var(--glow-crimson)'
                                        }}>
                                            <Tv size={40} color="var(--color-crimson)" />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Stream Shield Active</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px' }}>
                                                Clicking below will reveal the player. Ads may appear on the first interaction.
                                            </p>
                                        </div>
                                        <button 
                                            className="btn-primary" 
                                            onClick={() => setPlayerActivated(true)}
                                            style={{ padding: '0.75rem 2rem' }}
                                        >
                                            Unlock & Start Stream
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', fontFamily: 'Outfit' }}>
                                <Lock size={48} color="var(--color-crimson)" style={{ opacity: 0.8 }} />
                                <h2 style={{ fontSize: '2.5rem', color: 'white' }}>Stream Starts Soon</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
                                    The live broadcast will automatically unlock right here when the match begins at 17:30 on April 25th.
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
                Next Match — Sat 25 Apr
            </div>

            <div className="animate-fade-in delay-100" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(2rem, 10vw, 6rem)',
                marginBottom: '2rem',
                width: '100%',
                flexWrap: 'wrap',
                padding: '2rem 0'
            }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    filter: 'drop-shadow(0 0 30px rgba(239, 1, 7, 0.4))'
                }}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="Arsenal" style={{ width: 'clamp(120px, 15vw, 220px)', height: 'auto' }} />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2rem', color: 'white', letterSpacing: '0.1em' }}>ARSENAL</span>
                </div>
                
                <span style={{ 
                    fontSize: '3rem', 
                    fontWeight: 900, 
                    color: 'var(--color-gold)', 
                    opacity: 0.3,
                    fontStyle: 'italic'
                }}>VS</span>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))'
                }}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg" alt="Fulham" style={{ width: 'clamp(120px, 15vw, 220px)', height: 'auto' }} />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2rem', color: 'white', letterSpacing: '0.1em' }}>FULHAM</span>
                </div>
            </div>

            <h1 className="animate-fade-in delay-100" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textTransform: 'uppercase'
            }}>
                Arsenal <br />
                <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>vs Fulham</span>
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
                    <span style={{ fontSize: '1.125rem' }}>17:30 — Sat 25 Apr</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '1.125rem' }}>Emirates Stadium</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tv size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '1.125rem' }}>Sky Sports / USA</span>
                </div>
            </div>

            <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    className="btn-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
                    onClick={() => setShowStream(true)}
                >
                    Match Stream
                </button>
                <a href="https://www.arsenal.com/tickets" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem', textDecoration: 'none' }}>
                    Tickets <ChevronRight size={20} />
                </a>
            </div>
        </div>
    );
};

export default Hero;
