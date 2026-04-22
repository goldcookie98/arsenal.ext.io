import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Users } from 'lucide-react';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // This is a simple embed for tlk.io which provides a zero-config live chat.
    // We wrap it in a premium glassmorphism container.
    useEffect(() => {
        if (isOpen && !isLoaded) {
            const script = document.createElement('script');
            script.src = 'https://tlk.io/embed.js';
            script.async = true;
            script.type = 'text/javascript';
            document.body.appendChild(script);
            setIsLoaded(true);
        }
    }, [isOpen, isLoaded]);

    return (
        <>
            {/* Floating Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-crimson)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px var(--glow-crimson)',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 9999,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1) rotate(0deg)'
                }}
                className="chat-toggle-btn"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                {!isOpen && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '12px',
                        height: '12px',
                        background: '#4ade80',
                        borderRadius: '50%',
                        border: '2px solid var(--bg-dark)',
                        boxShadow: '0 0 10px #4ade80'
                    }}></span>
                )}
            </button>

            {/* Chat Panel */}
            <div style={{
                position: 'fixed',
                bottom: '6rem',
                right: '2rem',
                width: 'min(400px, 90vw)',
                height: 'min(600px, 70vh)',
                background: 'rgba(15, 15, 20, 0.9)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid var(--border-glass)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 9998,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                pointerEvents: isOpen ? 'all' : 'none',
            }}>
                {/* Chat Header */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    background: 'linear-gradient(to right, rgba(239, 1, 7, 0.15), transparent)',
                    borderBottom: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(239, 1, 7, 0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-crimson)'
                        }}>
                            <Users size={20} color="var(--color-crimson)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1rem', color: 'white', margin: 0 }}>Match Day Chat</h3>
                            <span style={{ fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></span>
                                Live Now
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chat Area - tlk.io Embed */}
                <div style={{ flex: 1, padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <div 
                        id="tlkio" 
                        data-channel="arsenal-tracker" 
                        data-theme="night" 
                        style={{ width: '100%', height: '100%' }}
                    ></div>
                </div>

                {/* Footer / Join Info */}
                <div style={{
                    padding: '1rem',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid var(--border-glass)',
                    background: 'rgba(0,0,0,0.1)'
                }}>
                    Stay respectful. COYG! 🔴⚪️
                </div>
            </div>

            {/* Custom CSS to hide tlk.io branding and style it better */}
            <style>{`
                #tlkio {
                    border-radius: 12px;
                    overflow: hidden;
                }
                .chat-toggle-btn:hover {
                    box-shadow: 0 0 30px var(--color-crimson);
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
};

export default LiveChat;
