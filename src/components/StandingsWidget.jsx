import React, { useEffect, useRef, useCallback } from 'react';

const StandingsWidget = () => {
    const containerRef = useRef(null);

    const loadWidget = useCallback(() => {
        if (!containerRef.current) return;

        // Clear any previous content
        containerRef.current.innerHTML = '';

        // Use a unique suffix to bust cache on reload
        const uniqueId = 'l2s6' + Date.now();

        // Create the widget div
        const widgetDiv = document.createElement('div');
        widgetDiv.id = 'widget-' + uniqueId;
        widgetDiv.className = 'scoreaxis-widget';
        widgetDiv.style.cssText = 'width: auto;height: auto;font-size: 14px;background-color: #1a1a2e;color: #e0e0e0;border: 1px solid;border-color: rgba(255,255,255,0.1);overflow: auto;border-radius: 12px;';

        // Create the script
        const script = document.createElement('script');
        script.src = 'https://widgets.scoreaxis.com/api/football/league-table/6232265abf1fa71a672159ec?widgetId=' + uniqueId + '&lang=en&teamLogo=1&tableLines=0&homeAway=1&header=1&position=1&goals=1&gamesCount=1&diff=1&winCount=1&drawCount=1&loseCount=1&lastGames=1&points=1&teamsLimit=all&links=1&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%231a1a2e&textColor=%23e0e0e0&linkColor=%23e0e0e0&borderColor=%23333355&tabColor=%23222244';
        script.async = true;

        // Create the credit link
        const creditDiv = document.createElement('div');
        creditDiv.className = 'widget-main-link';
        creditDiv.style.cssText = 'padding: 6px 12px;font-weight: 500;';
        creditDiv.innerHTML = 'Live data by <a href="https://www.scoreaxis.com/" style="color: inherit;">Scoreaxis</a>';

        widgetDiv.appendChild(script);
        widgetDiv.appendChild(creditDiv);
        containerRef.current.appendChild(widgetDiv);
    }, []);

    useEffect(() => {
        // Initial load
        loadWidget();

        // Refresh every hour (3600000ms)
        const interval = setInterval(loadWidget, 3600000);
        return () => clearInterval(interval);
    }, [loadWidget]);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%', minHeight: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Premier League <span className="text-gradient">Standings</span>
            </h2>
            <div ref={containerRef} />
        </div>
    );
};

export default StandingsWidget;
