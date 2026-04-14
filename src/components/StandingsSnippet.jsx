import React from 'react';
import { BarChart3 } from 'lucide-react';

const StandingsSnippet = () => {
    const standings = [
        { pos: 1, team: 'Arsenal', pld: 28, w: 20, d: 5, l: 3, gd: 45, pts: 65 },
        { pos: 2, team: 'Liverpool', pld: 28, w: 19, d: 7, l: 2, gd: 42, pts: 64 },
        { pos: 3, team: 'Man City', pld: 28, w: 19, d: 6, l: 3, gd: 40, pts: 63 },
        { pos: 4, team: 'Aston Villa', pld: 28, w: 17, d: 5, l: 6, gd: 20, pts: 56 },
        { pos: 5, team: 'Spurs', pld: 28, w: 16, d: 5, l: 7, gd: 15, pts: 53 }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BarChart3 color="var(--color-gold)" /> Top 5 Standings
                </h2>
                <div style={{ color: 'var(--color-gold)', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600 }}>
                    Full Table →
                </div>
            </div>

            <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-glass)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Pos</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Club</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Played</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Won</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Drawn</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Lost</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>GD</th>
                            <th style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((row, idx) => (
                            <tr key={idx} style={{
                                borderBottom: idx === standings.length - 1 ? 'none' : '1px solid var(--border-glass)',
                                backgroundColor: row.team === 'Arsenal' ? 'rgba(239, 1, 7, 0.1)' : 'transparent',
                                transition: 'background-color 0.2s',
                            }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold', color: row.pos <= 4 ? 'var(--color-gold)' : 'var(--text-secondary)' }}>
                                    {row.pos}
                                </td>
                                <td style={{ padding: '1rem', fontWeight: 600, fontFamily: 'Outfit', color: row.team === 'Arsenal' ? 'var(--color-crimson)' : 'inherit' }}>
                                    {row.team}
                                </td>
                                <td style={{ padding: '1rem' }}>{row.pld}</td>
                                <td style={{ padding: '1rem' }}>{row.w}</td>
                                <td style={{ padding: '1rem' }}>{row.d}</td>
                                <td style={{ padding: '1rem' }}>{row.l}</td>
                                <td style={{ padding: '1rem' }}>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.125rem', color: 'white' }}>{row.pts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StandingsSnippet;
