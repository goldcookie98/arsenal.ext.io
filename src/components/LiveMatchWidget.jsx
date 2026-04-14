import React, { useState, useEffect } from 'react';
import { Clock, Lock } from 'lucide-react';

const LiveMatchWidget = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isTime: false });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const kickoff = new Date(2026, 3, 19, 16, 30, 0, 0); // April 19, 16:30
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
        updateTimer();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                ⚽ <span className="text-gradient">Live Match</span>
            </h2>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
                {timeLeft.isTime ? (
                    <iframe
                        title="Manchester City vs. Arsenal Player"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://embedsports.top/embed/admin/ppv-manchester-city-vs-arsenal/1"
                        scrolling="no"
                        allowFullScreen={true}
                        allow="encrypted-media; picture-in-picture;"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 'none' }}
                    ></iframe>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <CountdownUnit value={timeLeft.days} label="Days" />
                            <CountdownUnit value={timeLeft.hours} label="Hours" />
                            <CountdownUnit value={timeLeft.minutes} label="Mins" />
                            <CountdownUnit value={timeLeft.seconds} label="Secs" color="var(--color-crimson)" />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Clock size={16} /> Stream unlocks at 16:30 — Apr 19
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CountdownUnit = ({ value, label, color = 'white' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 800, color, lineHeight: 1 }}>
            {String(value).padStart(2, '0')}
        </span>
        <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.5rem' }}>
            {label}
        </span>
    </div>
);

export default LiveMatchWidget;
