import { useEffect, useRef, useState } from 'react';
import { Compass, Gauge, Radar, HelpCircle, Navigation } from 'lucide-react';
import './DronePilot.css';

const DronePilot = ({ isActive, onToggleActive }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthRef = useRef(null);
  const gainRef = useRef(null);

  // Simulation states
  const [approachingNode, setApproachingNode] = useState(null);
  const [autoPilotActive, setAutoPilotActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const approachingNodeRef = useRef(null);

  // Targets in absolute world coordinates
  const nodes = [
    { id: 'home', label: 'SYS.HOME [0x00]', x: 0, y: 0, sectionId: 'root' },
    { id: 'about', label: 'SYS.ABOUT [0x01]', x: -900, y: -550, sectionId: 'about' },
    { id: 'showcase', label: 'SYS.SHOWCASE [0x02]', x: 900, y: -550, sectionId: 'showcase' },
    { id: 'resume', label: 'SYS.RESUME [0x03]', x: -900, y: 550, sectionId: 'resume' },
    { id: 'contact', label: 'SYS.CONTACT [0x04]', x: 900, y: 550, sectionId: 'contact' }
  ];

  // Physics state references to prevent react rendering lags in update ticks
  const pilotState = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 2, // facing up
    trail: [],
    autoPilot: false,
    targetX: 0,
    targetY: 0,
    isFirstMount: true
  });

  const keys = useRef({});

  // Initialize Web Audio synth hum
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();

        // Create triangle oscillator for clean engine hum
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, audioCtxRef.current.currentTime);

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);

        // Low-pass filter to make it sound muffled and futuristic
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, audioCtxRef.current.currentTime);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        osc.start();

        synthRef.current = osc;
        gainRef.current = gainNode;
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn('Web Audio API blocked/suspended:', e);
    }
  };

  const playBeep = (freq, duration) => {
    if (!audioCtxRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch (err) {}
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (isActive) {
      initAudio();
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [isActive]);

  // Sync hash / routing changes to trigger auto-pilot to coordinate sectors
  useEffect(() => {
    const syncRouteToCoordinates = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      let targetNode = null;
      if (path === '/resume' || hash === '#resume') {
        targetNode = nodes.find(n => n.id === 'resume');
      } else if (path === '/projects' || hash === '#showcase' || hash === '#projects') {
        targetNode = nodes.find(n => n.id === 'showcase');
      } else if (path === '/contact' || hash === '#contact') {
        targetNode = nodes.find(n => n.id === 'contact');
      } else if (hash === '#about') {
        targetNode = nodes.find(n => n.id === 'about');
      } else if (path === '/' || hash === '#home' || hash === '#root') {
        targetNode = nodes.find(n => n.id === 'home');
      }

      if (targetNode) {
        const state = pilotState.current;
        // On boot: Teleport the drone instantly so there is no layout jump
        if (state.isFirstMount) {
          state.x = targetNode.x;
          state.y = targetNode.y;
          state.isFirstMount = false;
        } else {
          // On clicks: Glide the drone beautifully via auto-pilot vector thrust
          state.targetX = targetNode.x;
          state.targetY = targetNode.y;
          state.autoPilot = true;
          setAutoPilotActive(true);
          if (isActive) {
            playBeep(440, 0.25);
          }
        }
      }
    };

    syncRouteToCoordinates();

    // Listen to hash events in browser
    window.addEventListener('hashchange', syncRouteToCoordinates);
    return () => window.removeEventListener('hashchange', syncRouteToCoordinates);
  }, [isActive]);

  // Mobile viewport detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard capture event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      // If user inputs manual keys, override autopilot immediately
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        pilotState.current.autoPilot = false;
        setAutoPilotActive(false);
      }

      keys.current[e.code] = true;

      // Click to scroll / trigger target node enter behavior
      if (e.code === 'Enter' && approachingNodeRef.current) {
        playBeep(880, 0.45);
        onToggleActive(false);
        const el = document.getElementById(approachingNodeRef.current.sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive, onToggleActive]);

  // Mobile D-pad control trigger methods
  const startMobileMove = (code) => {
    pilotState.current.autoPilot = false;
    setAutoPilotActive(false);
    keys.current[code] = true;
  };

  const stopMobileMove = (code) => {
    keys.current[code] = false;
  };

  // Canvas update frame loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Physics tuning parameter variables
    const accel = 0.14;
    const friction = 0.955;
    const rotSpeed = 0.065;
    const maxSpeed = 7.5;

    const tick = () => {
      const state = pilotState.current;

      // 1. Process Autopilot calculations if active
      if (state.autoPilot) {
        const dx = state.targetX - state.x;
        const dy = state.targetY - state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
          state.x = state.targetX;
          state.y = state.targetY;
          state.vx = 0;
          state.vy = 0;
          state.autoPilot = false;
          setAutoPilotActive(false);
          playBeep(660, 0.25);
        } else {
          const targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - state.angle;

          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

          // Align rotation towards target coordinates
          state.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), rotSpeed * 1.5);

          // Vector thrust acceleration
          state.vx += Math.cos(state.angle) * (accel * 1.25);
          state.vy += Math.sin(state.angle) * (accel * 1.25);
        }
      } else {
        // 2. Process manual keyboard/D-pad coordinates navigation
        if (keys.current['ArrowLeft'] || keys.current['KeyA']) {
          state.angle -= rotSpeed;
        }
        if (keys.current['ArrowRight'] || keys.current['KeyD']) {
          state.angle += rotSpeed;
        }
        if (keys.current['ArrowUp'] || keys.current['KeyW']) {
          state.vx += Math.cos(state.angle) * accel;
          state.vy += Math.sin(state.angle) * accel;
        }
        if (keys.current['ArrowDown'] || keys.current['KeyS']) {
          state.vx -= Math.cos(state.angle) * (accel * 0.65);
          state.vy -= Math.sin(state.angle) * (accel * 0.65);
        }
      }

      // Apply physics damping and speed caps
      state.vx *= friction;
      state.vy *= friction;

      let currentSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
      if (currentSpeed > maxSpeed) {
        state.vx = (state.vx / currentSpeed) * maxSpeed;
        state.vy = (state.vy / currentSpeed) * maxSpeed;
        currentSpeed = maxSpeed;
      }

      state.x += state.vx;
      state.y += state.vy;

      const roundedX = Math.round(state.x);
      const roundedY = Math.round(state.y);
      const roundedSpeed = Math.round(currentSpeed * 50);
      const deg = Math.round(((state.angle * 180) / Math.PI + 90) % 360);
      const finalHeading = deg < 0 ? deg + 360 : deg;

      // Direct DOM update of HUD parameters for performance
      const compassDialEl = document.getElementById('hud-compass-dial');
      const compassReadoutEl = document.getElementById('hud-compass-readout');
      const speedValEl = document.getElementById('hud-speed-val');
      const speedBarFillEl = document.getElementById('hud-speed-bar-fill');
      const coordXEl = document.getElementById('hud-coord-x');
      const coordYEl = document.getElementById('hud-coord-y');

      if (compassDialEl) {
        compassDialEl.style.transform = `rotate(${-finalHeading}deg)`;
      }
      if (compassReadoutEl) {
        compassReadoutEl.textContent = `${String(finalHeading).padStart(3, '0')}°`;
      }
      if (speedValEl) {
        speedValEl.textContent = roundedSpeed;
      }
      if (speedBarFillEl) {
        speedBarFillEl.style.width = `${Math.min((roundedSpeed / 375) * 100, 100)}%`;
      }
      if (coordXEl) {
        coordXEl.textContent = `${roundedX >= 0 ? '+' : ''}${roundedX}`;
      }
      if (coordYEl) {
        coordYEl.textContent = `${roundedY >= 0 ? '+' : ''}${roundedY}`;
      }

      // Pitch Web Audio synthesizer according to speed ratio
      if (gainRef.current && synthRef.current && audioCtxRef.current && isActive) {
        const ratio = currentSpeed / maxSpeed;
        gainRef.current.gain.setValueAtTime(0.01 + ratio * 0.04, audioCtxRef.current.currentTime);
        synthRef.current.frequency.setValueAtTime(80 + ratio * 110, audioCtxRef.current.currentTime);
      }

      // Proximity detection to target coordinates nodes
      let closeNode = null;
      nodes.forEach((node) => {
        const dist = Math.sqrt((state.x - node.x) ** 2 + (state.y - node.y) ** 2);
        if (dist < 80) {
          closeNode = node;
        }
      });

      // Update approachingNode state ONLY if it has actually changed
      if (closeNode?.id !== approachingNodeRef.current?.id) {
        if (closeNode) {
          playBeep(660, 0.15);
        }
        approachingNodeRef.current = closeNode;
        setApproachingNode(closeNode);
      }

      // Update radar blips directly in the DOM
      nodes.forEach((node) => {
        const blipEl = document.getElementById(`radar-blip-${node.id}`);
        if (blipEl) {
          const rx = (node.x - state.x) * 0.045 + 45;
          const ry = (node.y - state.y) * 0.045 + 45;
          const isNear = closeNode && closeNode.id === node.id;

          if (rx >= 0 && rx <= 90 && ry >= 0 && ry <= 90) {
            blipEl.style.display = 'block';
            blipEl.style.left = `${rx}px`;
            blipEl.style.top = `${ry}px`;
            if (isNear) {
              blipEl.classList.add('active');
            } else {
              blipEl.classList.remove('active');
            }
          } else {
            blipEl.style.display = 'none';
          }
        }
      });

      // Append trail paths
      state.trail.push({ x: state.x, y: state.y });
      if (state.trail.length > 20) {
        state.trail.shift();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const camX = state.x;
      const camY = state.y;

      // 3. Translate HTML World Content Panels (Direct 60fps DOM modifications)
      const moveWorldPanel = (id, wx, wy) => {
        const el = document.getElementById(id);
        if (el) {
          const sx = wx - camX + cx;
          const sy = wy - camY + cy;
          el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;

          // Proximity calculation: panels fade out when far away, and fade in when close
          const dist = Math.sqrt((wx - camX) ** 2 + (wy - camY) ** 2);
          const activeRadius = 600;
          if (dist < activeRadius) {
            const opacity = Math.max(0.15, 1 - dist / activeRadius);
            el.style.opacity = opacity;
            el.style.pointerEvents = dist < 350 ? 'auto' : 'none'; // Only allow clicks when reasonably close
            el.style.filter = dist < 350 ? 'none' : 'blur(2px)';
            if (dist < 350) el.classList.add('world-panel-active');
            else el.classList.remove('world-panel-active');
          } else {
            el.style.opacity = 0;
            el.style.pointerEvents = 'none';
          }
        }
      };

      // Translate all our coordinate nodes
      moveWorldPanel('panel-home', 0, 0);
      moveWorldPanel('panel-about', -900, -550);
      moveWorldPanel('panel-showcase', 900, -550);
      moveWorldPanel('panel-resume', -900, 550);
      moveWorldPanel('panel-contact', 900, 550);
      moveWorldPanel('panel-footer', 0, 650);

      // 4. Render canvas guidelines grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Infinite grids
      const gridSpacing = 80;
      const startX = (cx - camX) % gridSpacing;
      const startY = (cy - camY) % gridSpacing;

      ctx.strokeStyle = 'rgba(0, 243, 255, 0.035)';
      ctx.lineWidth = 1;

      for (let x = startX; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        // Coordinates mark labels
        const gridX = Math.round((x - cx + camX) / gridSpacing);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.font = '7px monospace';
        ctx.fillText(`C_${gridX}`, x + 4, 12);
      }

      for (let y = startY; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw node scopes in space
      nodes.forEach((node) => {
        const sx = node.x - camX + cx;
        const sy = node.y - camY + cy;

        // Cull if way off screen
        if (sx < -100 || sx > canvas.width + 100 || sy < -100 || sy > canvas.height + 100) return;

        const isNear = closeNode && closeNode.id === node.id;

        // Outer scope dials
        ctx.strokeStyle = isNear ? 'var(--accent-secondary)' : 'rgba(0, 243, 255, 0.15)';
        ctx.lineWidth = isNear ? 2 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 32, 0, Math.PI * 2);
        ctx.stroke();

        // Inner target details
        ctx.fillStyle = isNear ? 'var(--accent-secondary)' : 'var(--accent-color)';
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isNear ? '#ffffff' : 'var(--text-secondary)';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, sx, sy - 42);
      });

      // 5. Draw exhaust jet fire
      if (state.trail.length > 1) {
        ctx.beginPath();
        state.trail.forEach((pos, idx) => {
          const tx = pos.x - camX + cx;
          const ty = pos.y - camY + cy;
          if (idx === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        });
        ctx.strokeStyle = 'rgba(255, 0, 127, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 6. Draw central player drone
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(state.angle);

      // Jet flame when moving
      const isThrusting = keys.current['ArrowUp'] || keys.current['KeyW'] || state.autoPilot;
      if (isThrusting) {
        ctx.fillStyle = 'var(--accent-secondary)';
        ctx.beginPath();
        ctx.moveTo(-16, -5);
        ctx.lineTo(-28 - Math.random() * 8, 0);
        ctx.lineTo(-16, 5);
        ctx.closePath();
        ctx.fill();
      }

      // Triangular vector drone body
      ctx.fillStyle = '#050814';
      ctx.strokeStyle = 'var(--accent-color)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-12, -12);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Exhaust wing dots
      ctx.fillStyle = 'var(--accent-secondary)';
      ctx.beginPath();
      ctx.arc(-10, -10, 2, 0, Math.PI * 2);
      ctx.arc(-10, 10, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  return (
    <div className={`drone-pilot-container ${isActive ? 'pilot-active' : ''}`} ref={containerRef}>
      {/* Simulation layer */}
      <canvas ref={canvasRef} className="pilot-canvas" />

      {/* Cockpit HUD gauges */}
      {isActive && (
        <div className="pilot-dashboard-hud">
          {/* Autopilot active flashing warning */}
          {autoPilotActive && (
            <div className="hud-autopilot-alert">
              <span className="blink-txt">AUTOPILOT GUIDANCE CONNECTED</span>
            </div>
          )}

          {/* Compass Widget */}
          <div className="hud-widget compass-widget">
            <div className="hud-widget-label">
              <Compass size={12} className="hud-icon" /> HEADING
            </div>
            <div className="compass-face">
              <div id="hud-compass-dial" className="compass-dial">
                <span className="dial-card n">N</span>
                <span className="dial-card e">E</span>
                <span className="dial-card s">S</span>
                <span className="dial-card w">W</span>
                <div className="dial-pointer"></div>
              </div>
              <div id="hud-compass-readout" className="compass-readout">000°</div>
            </div>
          </div>

          {/* Speedometer Widget */}
          <div className="hud-widget speed-widget">
            <div className="hud-widget-label">
              <Gauge size={12} className="hud-icon" /> PROPULSION
            </div>
            <div className="speedometer-data">
              <div className="speed-readout">
                <span id="hud-speed-val" className="speed-val">0</span>
                <span className="speed-unit">kn/s</span>
              </div>
              <div className="speed-bar-container">
                <div id="hud-speed-bar-fill" className="speed-bar-fill" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          {/* Coordinates Monitor */}
          <div className="hud-widget coord-widget">
            <div className="hud-widget-label">
              <Navigation size={12} className="hud-icon" /> LOCATION
            </div>
            <div className="coordinates-readout">
              <div>LAT.X: <span id="hud-coord-x" className="coord-val">+0</span></div>
              <div>LNG.Y: <span id="hud-coord-y" className="coord-val">+0</span></div>
            </div>
          </div>

          {/* Radar scope mini-map */}
          <div className="hud-widget radar-widget">
            <div className="hud-widget-label">
              <Radar size={12} className="hud-icon" /> RADAR SCOPE
            </div>
            <div className="radar-grid">
              <div className="radar-sweep"></div>
              <div className="radar-blip player-blip"></div>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  id={`radar-blip-${node.id}`}
                  className="radar-blip node-blip"
                  style={{ display: 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Controls Instruction Panel */}
          <div className="hud-widget info-hud-widget">
            <div className="hud-widget-label">
              <HelpCircle size={12} /> SYSTEM PILOT
            </div>
            <div className="controls-help">
              <p>STEER: <span>A/D</span> or <span>←/→</span></p>
              <p>THRUST: <span>W/S</span> or <span>↑/↓</span></p>
              <p className="hint-txt">Click Nav links to Autopilot</p>
            </div>
          </div>

          {/* Touchscreen D-Pad overlay for mobile */}
          {isMobile && (
            <div className="virtual-dpad">
              <button 
                onMouseDown={() => startMobileMove('ArrowUp')} 
                onMouseUp={() => stopMobileMove('ArrowUp')}
                onTouchStart={() => startMobileMove('ArrowUp')}
                onTouchEnd={() => stopMobileMove('ArrowUp')}
                className="dpad-btn up"
              >▲</button>
              <div className="dpad-middle">
                <button 
                  onMouseDown={() => startMobileMove('ArrowLeft')} 
                  onMouseUp={() => stopMobileMove('ArrowLeft')}
                  onTouchStart={() => startMobileMove('ArrowLeft')}
                  onTouchEnd={() => stopMobileMove('ArrowLeft')}
                  className="dpad-btn left"
                >◀</button>
                <button 
                  onMouseDown={() => startMobileMove('ArrowRight')} 
                  onMouseUp={() => stopMobileMove('ArrowRight')}
                  onTouchStart={() => startMobileMove('ArrowRight')}
                  onTouchEnd={() => stopMobileMove('ArrowRight')}
                  className="dpad-btn right"
                >▶</button>
              </div>
              <button 
                onMouseDown={() => startMobileMove('ArrowDown')} 
                onMouseUp={() => stopMobileMove('ArrowDown')}
                onTouchStart={() => startMobileMove('ArrowDown')}
                onTouchEnd={() => stopMobileMove('ArrowDown')}
                className="dpad-btn down"
              >▼</button>
            </div>
          )}

          {/* Dynamic Target Alert Overlay */}
          {approachingNode && (
            <div className="hud-target-alert">
              <div className="alert-heading">COORDINATE SYSTEM ACQUIRED</div>
              <div className="alert-body">{approachingNode.label}</div>
              <div className="alert-cta">PILOT TO CENTER POINT FOR INTERACTION</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DronePilot;
