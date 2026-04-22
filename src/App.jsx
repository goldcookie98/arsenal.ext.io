import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UpcomingFixtures from './components/UpcomingFixtures';
import StandingsWidget from './components/StandingsWidget';
import LiveMatchWidget from './components/LiveMatchWidget';
import LiveChat from './components/LiveChat';

function App() {
  return (
    <div style={{ paddingBottom: '4rem', position: 'relative' }}>
      <div className="background-wrapper" />
      <Navbar />

      <main>
        <Hero />

        {/* Live Match Widget - full width at top */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '0 1rem'
        }}>
          <LiveMatchWidget />
        </div>

        {/* Two column layout for desktop */}
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
          Arsenal<span className="text-gradient">Tracker</span> &copy; 2026. Data is illustrative.
        </p>
      </footer>

      <LiveChat />
    </div>
  );
}

export default App;
