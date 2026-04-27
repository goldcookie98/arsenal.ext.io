import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingFixtures from './components/UpcomingFixtures';
import StandingsWidget from './components/StandingsWidget';
import LiveMatchWidget from './components/LiveMatchWidget';
import LiveChat from './components/LiveChat';
import DankOverlay from './components/DankOverlay';

function App() {
  const [isDank, setIsDank] = useState(false);

  return (
    <div style={{ paddingBottom: '4rem', position: 'relative' }}>
      <div className="background-wrapper" />
      <DankOverlay isDank={isDank} />
      <Navbar isDank={isDank} toggleDank={() => setIsDank(d => !d)} />

      <main>
        <Hero isDank={isDank} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '0 1rem'
        }}>
          <LiveMatchWidget />
        </div>

        <div className="content-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 400px)',
          gap: '2rem',
          padding: '0 1rem'
        }}>
          <div>
            <UpcomingFixtures />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <StandingsWidget />
          </div>
        </div>
      </main>

      <footer style={{
        marginTop: '6rem',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-glass)',
        color: 'var(--text-muted)'
      }}>
        <p style={{ fontFamily: 'Outfit', fontWeight: 600 }}>
          {isDank
            ? <span style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>🐸 DANK MODE ACTIVATED — MUCH WOW © 420 🐸</span>
            : <>Arsenal<span className="text-gradient">Tracker</span> &copy; 2026. Data is illustrative.</>
          }
        </p>
      </footer>

      <LiveChat />
    </div>
  );
}

export default App;
