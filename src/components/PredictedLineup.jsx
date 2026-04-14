import React from 'react';

const PredictedLineup = () => {
    // 4-3-3 Formation
    const players = {
        gk: 'Raya',
        defenders: ['White', 'Saliba', 'Gabriel', 'Timber'],
        midfielders: ['Odegaard', 'Partey', 'Rice'],
        forwards: ['Saka', 'Havertz', 'Martinelli']
    };

    const PitchPlayer = ({ name, position, top, left }) => (
        <div style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem'
        }}>
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-crimson)',
                border: '3px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                zIndex: 10
            }}>
                {name[0]}
            </div>
            <div style={{
                background: 'rgba(0,0,0,0.6)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 600,
                textShadow: '0 1px 2px black',
                backdropFilter: 'blur(4px)'
            }}>
                {name}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                Predicted Lineup
            </h2>

            <div className="glass-panel" style={{
                width: '100%',
                paddingTop: '120%', /* Aspect ratio for pitch */
                position: 'relative',
                background: 'linear-gradient(wrap, #166534, #14532d)',
                backgroundColor: '#166534',
                border: '4px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                overflow: 'hidden'
            }}>
                {/* Pitch Lines background pattern could go here, for now a simple gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 10%, rgba(255,255,255,0.03) 10%, rgba(255,255,255,0.03) 20%)',
                    pointerEvents: 'none'
                }} />

                {/* Center Circle */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '150px', height: '150px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute', top: '50%', left: '0', right: '0', borderTop: '2px solid rgba(255,255,255,0.3)'
                }} />

                {/* GK */}
                <PitchPlayer name={players.gk} top={90} left={50} />

                {/* Defenders */}
                <PitchPlayer name={players.defenders[0]} top={75} left={85} />
                <PitchPlayer name={players.defenders[1]} top={78} left={65} />
                <PitchPlayer name={players.defenders[2]} top={78} left={35} />
                <PitchPlayer name={players.defenders[3]} top={75} left={15} />

                {/* Midfielders */}
                <PitchPlayer name={players.midfielders[0]} top={55} left={75} />
                <PitchPlayer name={players.midfielders[1]} top={60} left={50} />
                <PitchPlayer name={players.midfielders[2]} top={55} left={25} />

                {/* Forwards */}
                <PitchPlayer name={players.forwards[0]} top={25} left={80} />
                <PitchPlayer name={players.forwards[1]} top={20} left={50} />
                <PitchPlayer name={players.forwards[2]} top={25} left={20} />

            </div>
        </div>
    );
};

export default PredictedLineup;
