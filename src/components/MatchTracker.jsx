import React from 'react';
import { Calendar, TrendingUp, Trophy, Tv } from 'lucide-react';

const MatchTracker = () => {
    const fixtures = [
        { opponent: 'Brighton', date: 'Wed, Mar 4', time: '19:30', comp: 'Premier League', home: false, result: 'Win 2-1', tv: 'TNT Sports' },
        { opponent: 'Mansfield Town', date: 'Sat, Mar 7', time: '12:15', comp: 'FA Cup', home: false, result: 'Win 4-0', tv: 'BBC One' },
        { opponent: 'B. Leverkusen', date: 'Wed, Mar 11', time: '17:45', comp: 'Champions League', home: false, result: 'Draw 1-1', tv: 'TNT Sports 1' },
        { opponent: 'Everton', date: 'Sat, Mar 14', time: '17:30', comp: 'Premier League', home: true, result: null, tv: 'Peacock / Sky' }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Calendar color="var(--color-crimson)" /> Upcoming Fixtures
                </h2>
                <div style={{ color: 'var(--color-gold)', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600 }}>
                    View All →
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {fixtures.map((match, idx) => (
                    <div key={idx} className="glass-panel" style={{
                        padding: '1.5rem',
                        position: 'relative',
                        borderTop: idx === 0 ? '4px solid var(--color-crimson)' : '1px solid var(--border-glass)'
                    }}>
                        {idx === 0 && (
                            <div style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: 'var(--color-crimson)',
                                color: 'white',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                fontFamily: 'Outfit'
                            }}>NEXT</div>
                        )}

                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {match.comp.includes('Champions') ? <Trophy size={14} color="var(--color-gold)" /> : <TrendingUp size={14} />}
                            {match.comp}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit', color: match.home ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                    {match.home ? 'Arsenal' : match.opponent}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>vs</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit', color: !match.home ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                    {!match.home ? 'Arsenal' : match.opponent}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                {match.result ? (
                                    <span style={{ color: match.result.includes('Win') ? '#22c55e' : 'var(--color-crimson)', fontWeight: 'bold' }}>
                                        {match.result}
                                    </span>
                                ) : (
                                    <>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{match.date}</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{match.time}</span>
                                    </>
                                )}
                            </div>

                            {match.tv && !match.result && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.8rem',
                                    color: 'var(--color-gold)',
                                    marginTop: '0.25rem',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Tv size={14} />
                                    <span style={{ fontWeight: 600 }}>{match.tv}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchTracker;
