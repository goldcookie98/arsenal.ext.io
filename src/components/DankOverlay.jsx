import React, { useEffect, useRef, useState, useCallback } from 'react';

const MEMES = [
    { emoji: '🐸', top: '8%',  left: '5%',  rotate: '-12deg', size: '5rem', label: 'FEELS GOOD MAN' },
    { emoji: '🐕', top: '15%', left: '85%', rotate: '8deg',   size: '4.5rem', label: 'MUCH DANK WOW' },
    { emoji: '💯', top: '40%', left: '2%',  rotate: '-5deg',  size: '4rem',   label: 'SWAG' },
    { emoji: '🎯', top: '55%', left: '90%', rotate: '15deg',  size: '4rem',   label: 'HEADSHOT' },
    { emoji: '🔥', top: '72%', left: '8%',  rotate: '-8deg',  size: '5rem',   label: '420 BLAZE IT' },
    { emoji: '😎', top: '80%', left: '80%', rotate: '10deg',  size: '4.5rem', label: 'MLG PRO GAMER' },
    { emoji: '🌈', top: '25%', left: '92%', rotate: '0deg',   size: '4rem',   label: 'WOW COLORS' },
    { emoji: '💎', top: '60%', left: '0%',  rotate: '-15deg', size: '3.5rem', label: 'DIAMOND HANDS' },
    { emoji: '🚀', top: '88%', left: '45%', rotate: '20deg',  size: '4rem',   label: 'TO THE MOON' },
    { emoji: '🎺', top: '3%',  left: '50%', rotate: '-3deg',  size: '4rem',   label: 'DA DA DA DAAAA' },
];

const CLICK_PHRASES = ['WOW', 'DANK', 'MLG', 'YEET', 'GG', 'EZ', 'SWAG', 'NOICE', 'REKT', 'GGEZ', '420', 'GOTTEM', 'BASED'];

let audioCtx = null;
const getAudioCtx = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
};

const playHitmarker = () => {
    try {
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        // Classic MLG hitmarker: two sharp clicks
        [0, 0.06].forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(1200, ctx.currentTime + delay);
            osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + delay + 0.07);
            gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.1);
        });
    } catch (_) {}
};

export { playHitmarker };

const DankOverlay = ({ isDank }) => {
    const cursorRef = useRef(null);
    const [clicks, setClicks] = useState([]); // { id, x, y, phrase }
    const clickIdRef = useRef(0);

    // Mouse tracking for Pepe cursor
    useEffect(() => {
        if (!isDank) return;
        const move = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top = e.clientY + 'px';
            }
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => window.removeEventListener('mousemove', move);
    }, [isDank]);

    // Hitmarker + popup on every click
    useEffect(() => {
        if (!isDank) return;
        const handler = (e) => {
            playHitmarker();
            const id = ++clickIdRef.current;
            const phrase = CLICK_PHRASES[Math.floor(Math.random() * CLICK_PHRASES.length)];
            setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY, phrase }]);
            setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 900);
        };
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [isDank]);

    if (!isDank) return null;

    return (
        <>
            <style>{`
                /* ===== DANK MODE GLOBAL OVERRIDES ===== */
                *, *::before, *::after {
                    font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard SE', cursive !important;
                    cursor: none !important;
                }
                body {
                    background: #0a0a0a !important;
                }
                /* Rainbow spinning logo text */
                .dank-rainbow {
                    animation: dank-rainbow-anim 1.5s linear infinite, dank-shake 0.4s ease-in-out infinite;
                }
                @keyframes dank-rainbow-anim {
                    0%   { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000; }
                    16%  { color: #ff8800; text-shadow: 0 0 20px #ff8800, 0 0 40px #ff8800; }
                    33%  { color: #ffff00; text-shadow: 0 0 20px #ffff00, 0 0 40px #ffff00; }
                    50%  { color: #00ff00; text-shadow: 0 0 20px #00ff00, 0 0 40px #00ff00; }
                    66%  { color: #0088ff; text-shadow: 0 0 20px #0088ff, 0 0 40px #0088ff; }
                    83%  { color: #aa00ff; text-shadow: 0 0 20px #aa00ff, 0 0 40px #aa00ff; }
                    100% { color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000; }
                }
                @keyframes dank-shake {
                    0%, 100% { transform: rotate(0deg); }
                    25%       { transform: rotate(-1.5deg); }
                    75%       { transform: rotate(1.5deg); }
                }
                @keyframes dank-float {
                    0%, 100% { transform: translateY(0px) rotate(var(--r)); }
                    50%       { transform: translateY(-18px) rotate(calc(var(--r) + 5deg)); }
                }
                @keyframes dank-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes dank-pop {
                    0%   { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
                    40%  { opacity: 1; transform: translate(-50%, -140%) scale(1.3); }
                    100% { opacity: 0; transform: translate(-50%, -220%) scale(1); }
                }
                @keyframes dank-scanline {
                    0%   { background-position: 0 0; }
                    100% { background-position: 0 100px; }
                }
                @keyframes dank-pulse-border {
                    0%, 100% { border-color: #39FF14; box-shadow: 0 0 10px #39FF14, 0 0 30px #39FF14; }
                    50%       { border-color: #FF69B4; box-shadow: 0 0 10px #FF69B4, 0 0 30px #FF69B4; }
                }
                .glass-panel {
                    border: 2px solid #39FF14 !important;
                    box-shadow: 0 0 15px #39FF14, 0 0 40px rgba(57,255,20,0.3) !important;
                    animation: dank-pulse-border 1.5s ease-in-out infinite !important;
                    background: rgba(0, 20, 0, 0.85) !important;
                }
                .btn-primary {
                    background: linear-gradient(135deg, #39FF14, #00cc00) !important;
                    color: #000 !important;
                    border: 2px solid #39FF14 !important;
                    box-shadow: 0 0 15px #39FF14 !important;
                    font-weight: 900 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 2px !important;
                }
                .btn-outline {
                    border-color: #FF69B4 !important;
                    color: #FF69B4 !important;
                    box-shadow: 0 0 15px #FF69B4 !important;
                }
                .text-gradient {
                    background: linear-gradient(90deg, #39FF14, #FF69B4, #00ffff, #ffff00) !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                    background-size: 300% !important;
                    animation: dank-rainbow-anim 1.5s linear infinite !important;
                    -webkit-text-fill-color: unset !important;
                    color: transparent !important;
                }
                h1, h2, h3, h4, h5, h6 {
                    text-shadow: 3px 3px 0px #000, 0 0 20px #39FF14 !important;
                }
                /* MLG scanlines overlay */
                .dank-scanlines {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    pointer-events: none;
                    z-index: 8888;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.08) 2px,
                        rgba(0, 0, 0, 0.08) 4px
                    );
                }
                .dank-vignette {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    pointer-events: none;
                    z-index: 8887;
                    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,50,0,0.4) 100%);
                }
            `}</style>

            {/* Pepe cursor */}
            <div ref={cursorRef} style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 99999,
                fontSize: '2rem',
                transform: 'translate(-4px, -4px)',
                userSelect: 'none',
                filter: 'drop-shadow(0 0 6px #39FF14)',
                transition: 'none',
            }}>🐸</div>

            {/* Hitmarker click popups */}
            {clicks.map(c => (
                <div key={c.id} style={{
                    position: 'fixed',
                    left: c.x,
                    top: c.y,
                    pointerEvents: 'none',
                    zIndex: 99998,
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    color: '#39FF14',
                    textShadow: '2px 2px 0 #000, 0 0 10px #39FF14',
                    animation: 'dank-pop 0.9s ease-out forwards',
                    whiteSpace: 'nowrap',
                    letterSpacing: '2px',
                    userSelect: 'none',
                }}>
                    +{c.phrase}
                </div>
            ))}

            {/* MLG Scanlines */}
            <div className="dank-scanlines" />
            <div className="dank-vignette" />

            {/* Floating meme elements */}
            {MEMES.map((m, i) => (
                <div key={i} style={{
                    position: 'fixed',
                    top: m.top,
                    left: m.left,
                    zIndex: 8900,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    '--r': m.rotate,
                    animation: `dank-float ${2.5 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                }}>
                    <span style={{
                        fontSize: m.size,
                        filter: `drop-shadow(0 0 10px rgba(57,255,20,0.8))`,
                        display: 'block',
                    }}>{m.emoji}</span>
                    <span style={{
                        fontFamily: "'Impact', 'Arial Black', sans-serif",
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        color: '#39FF14',
                        textShadow: '1px 1px 0 #000',
                        whiteSpace: 'nowrap',
                        letterSpacing: '1px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '1px 4px',
                        borderRadius: '3px',
                    }}>{m.label}</span>
                </div>
            ))}

            {/* Corner MLG logo */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 8850,
                pointerEvents: 'none',
                opacity: 0.04,
                fontSize: '22vw',
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                color: '#39FF14',
                letterSpacing: '-2px',
                userSelect: 'none',
                animation: 'dank-spin 20s linear infinite',
            }}>MLG</div>

            {/* Spinning Pepe watermark */}
            <div style={{
                position: 'fixed',
                bottom: '8rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 8850,
                pointerEvents: 'none',
                opacity: 0.06,
                fontSize: '18vw',
                userSelect: 'none',
                animation: 'dank-spin 8s linear infinite reverse',
            }}>🐸</div>
        </>
    );
};

export default DankOverlay;
