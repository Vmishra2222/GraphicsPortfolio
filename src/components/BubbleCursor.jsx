import { useEffect, useRef } from 'react';

const BubbleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Track mouse position and speed
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 };
    let isMoving = false;
    let idleTimer;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Bubble class definition
    class Bubble {
      constructor(x, y, radius = null) {
        this.x = x;
        this.y = y;
        
        // Random size if not provided
        this.radius = radius || Math.random() * 8 + 3;
        
        // Slow float up
        this.vy = -Math.random() * 1.5 - 0.5;
        
        // Slight drift left/right
        this.vx = (Math.random() - 0.5) * 1.2;
        
        // Random lifespan
        this.alpha = 1;
        this.decay = Math.random() * 0.012 + 0.008;
        
        // Wobble frequency for swaying motion
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
        this.wobbleValue = Math.random() * 100;
        
        // Color choice: indigo, pink, teal, or soft white
        const colors = [
          'rgba(165, 180, 252, 0.45)', // soft indigo
          'rgba(244, 114, 182, 0.35)', // soft pink
          'rgba(45, 212, 191, 0.35)',  // soft teal
          'rgba(255, 255, 255, 0.5)'   // clean white
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.wobbleValue) * 0.3;
        this.wobbleValue += this.wobbleSpeed;
        this.alpha -= this.decay;
        this.radius *= 0.985; // shrink slowly
      }

      draw(context) {
        context.save();
        context.globalAlpha = this.alpha;
        
        // Draw the outer bubble body
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.stroke();
        
        // Draw a light translucent radial fill
        context.fillStyle = this.color.replace('0.45', '0.05').replace('0.35', '0.05').replace('0.5', '0.02');
        context.fill();

        // Draw the glossy light reflection spot (highlight)
        const highlightRadius = this.radius * 0.25;
        const highlightX = this.x - this.radius * 0.35;
        const highlightY = this.y - this.radius * 0.35;
        
        if (highlightRadius > 0.5) {
          context.beginPath();
          context.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(255, 255, 255, 0.65)';
          context.fill();
        }
        
        context.restore();
      }
    }

    // Track mouse movement position, but do NOT spawn trails on mouse move
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Calculate speed for mouse metrics
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      
      isMoving = true;
      clearTimeout(idleTimer);

      // Set idle timer
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 150);
    };

    // Burst bubbles on click (explosion effect)
    const handleMouseDown = (e) => {
      const burstSize = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < burstSize; i++) {
        const bubble = new Bubble(e.clientX, e.clientY);
        // Expand speed for click explosion
        bubble.vx = (Math.random() - 0.5) * 4;
        bubble.vy = -Math.random() * 3 - 1;
        bubble.radius = Math.random() * 10 + 4;
        particles.push(bubble);
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // If idle (mouse not moving), occasionally spawn a tiny floating bubble
      if (!isMoving && Math.random() < 0.05) {
        particles.push(new Bubble(mouse.x, mouse.y, Math.random() * 4 + 2));
      }

      // Update and draw active click/idle bubbles
      particles = particles.filter(p => {
        p.update();
        if (p.alpha > 0 && p.radius > 0.5) {
          p.draw(ctx);
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default BubbleCursor;
