import React, { useEffect, useRef } from 'react';

const EnetWidget = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = 'https://widget.enetscores.com/FW38432E98254F1EA3/ev/5186382';
        containerRef.current.appendChild(script);
    }, []);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div ref={containerRef} />
        </div>
    );
};

export default EnetWidget;
