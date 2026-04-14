import React, { useEffect, useRef, useCallback } from 'react';

const UpcomingFixtures = () => {
    const containerRef = useRef(null);

    const loadWidget = useCallback(() => {
        if (!containerRef.current) return;

        // Clear any previous content
        containerRef.current.innerHTML = '';

        // Create the 365Scores widget div
        const widgetDiv = document.createElement('div');
        widgetDiv.setAttribute('data-widget-type', 'entityScores');
        widgetDiv.setAttribute('data-entity-type', 'team');
        widgetDiv.setAttribute('data-entity-id', '104');
        widgetDiv.setAttribute('data-lang', 'en');
        widgetDiv.setAttribute('data-widget-id', '48402057-9a7a-401a-bcb5-8dc09179de9a');
        widgetDiv.setAttribute('data-theme', 'dark');
        containerRef.current.appendChild(widgetDiv);

        // Create powered by link
        const poweredBy = document.createElement('div');
        poweredBy.style.cssText = 'font-size: 0.75rem; color: var(--text-muted); padding: 0.5rem 0;';
        poweredBy.innerHTML = 'Powered by <a href="https://www.365scores.com" target="_blank" style="color: var(--text-secondary); text-decoration: none;">365Scores.com</a>';
        containerRef.current.appendChild(poweredBy);

        // Remove old script so it reloads fresh
        const oldScript = document.getElementById('scores365-script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = 'scores365-script';
        script.src = 'https://widgets.365scores.com/main.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        // Initial load
        loadWidget();

        // Refresh every hour (3600000ms)
        const interval = setInterval(loadWidget, 3600000);
        return () => clearInterval(interval);
    }, [loadWidget]);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                📅 Upcoming <span className="text-gradient">Fixtures</span>
            </h2>
            <div ref={containerRef} />
        </div>
    );
};

export default UpcomingFixtures;

