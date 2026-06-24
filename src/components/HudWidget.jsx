import { useEffect, useRef, useState } from 'react';
import './HudWidget.css';

const HudWidget = () => {
  const coordXRef = useRef(null);
  const coordYRef = useRef(null);
  const [systemLogs, setSystemLogs] = useState([
    'SYS.INIT: OK',
    'NET.STATUS: nominal',
    'GPU.RASTER: 0.04ms',
    'PORTFOLIO_HUD: v3.02'
  ]);
  const [timeStr, setTimeStr] = useState('');

  // Track cursor telemetry directly in DOM for 60fps performance
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (coordXRef.current) {
        coordXRef.current.innerText = String(Math.round(e.clientX)).padStart(4, '0');
      }
      if (coordYRef.current) {
        coordYRef.current.innerText = String(Math.round(e.clientY)).padStart(4, '0');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update clock & fake logs
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      setTimeStr(`${h}:${m}:${s}.${ms}`);
    }, 50);

    const logPool = [
      'SYS.KERN: thread_active [0x00FF8E]',
      'GC.ALLOC: 12.4MB freed',
      'REFRESH: viewport cached',
      'RASTER.PASS: clear_color',
      'BUFFER.BIND: index_array',
      'SHADER.COMPILE: cache_hit',
      'EVENT: cursor_focus_trigger',
      'SYS.TELEMETRY: streaming',
      'MEM.STATE: stable [0x4E1A]'
    ];

    const logInterval = setInterval(() => {
      setSystemLogs((prev) => {
        const next = [...prev];
        next.shift();
        const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
        next.push(randomLog);
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="hud-telemetry-widget">
      {/* Corner Brackets */}
      <div className="hud-corner tl"></div>
      <div className="hud-corner tr"></div>
      <div className="hud-corner bl"></div>
      <div className="hud-corner br"></div>

      {/* Grid overlay background */}
      <div className="cyber-grid-overlay" style={{ opacity: 0.15 }}></div>

      {/* HUD Header */}
      <div className="hud-widget-header">
        <div className="hud-status-indicator">
          <span className="pulse-dot"></span>
          <span className="status-label">SYS.STATUS: ONLINE</span>
        </div>
        <div className="hud-time">{timeStr}</div>
      </div>

      <div className="hud-divider"></div>

      {/* Mouse Telemetry Grid */}
      <div className="hud-telemetry-grid">
        <div className="telemetry-item">
          <span className="tel-label">CURSOR.X:</span>
          <span className="tel-val" ref={coordXRef}>0000</span>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">CURSOR.Y:</span>
          <span className="tel-val" ref={coordYRef}>0000</span>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">SYSTEM:</span>
          <span className="tel-val accent-pink">NOMINAL</span>
        </div>
        <div className="telemetry-item">
          <span className="tel-label">FPS:</span>
          <span className="tel-val accent-yellow">60.00</span>
        </div>
      </div>

      <div className="hud-divider"></div>

      {/* Scrolling Log Monitor */}
      <div className="hud-log-monitor">
        <div className="log-monitor-title">DIAGNOSTIC MONITOR</div>
        <div className="log-entries">
          {systemLogs.map((log, index) => (
            <div key={index} className="log-entry-line">
              <span className="log-chevron">&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HudWidget;
