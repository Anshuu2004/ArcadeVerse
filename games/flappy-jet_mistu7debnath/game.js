/**
 * ==========================================================================
 * FLAPPY CYBER JET — Core Game Engine
 * NSOC Winter Edition 2026 | Contributor: mistu7debnath
 * Pure Vanilla JavaScript • High Performance Canvas 60+ FPS Engine
 * ==========================================================================
 */

(() => {
  'use strict';

  // --- Virtual Coordinate System Constants ---
  const V_WIDTH = 480;
  const V_HEIGHT = 640;
  const CEILING_H = 16;
  const FLOOR_H = 48;

  // --- Physics Tuning ---
  const GRAVITY = 920;            // px/s^2
  const BOOST_IMPULSE = -315;     // px/s upward burst
  const MAX_FALL_VELOCITY = 460;  // px/s max downward speed
  const MAX_RISE_VELOCITY = -370; // px/s max upward speed

  // --- Obstacle Tuning ---
  const INITIAL_GAP = 175;        // px initial clearance
  const MIN_GAP = 135;            // px minimum challenging clearance
  const OBSTACLE_WIDTH = 64;      // px width of cyber pylon
  const SPAWN_DISTANCE = 260;     // px travel between new obstacle pairs
  const INITIAL_SPEED = 145;      // px/s initial obstacle horizontal speed
  const MAX_SPEED = 210;          // px/s maximum obstacle speed

  // --- Game States ---
  const STATE = {
    START: 'START',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAMEOVER: 'GAMEOVER'
  };

  // --- Safe LocalStorage Manager ---
  const Storage = {
    get(key, fallback) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? JSON.parse(val) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        // Fallback for private browsing or disabled storage
      }
    }
  };

  // --- Web Audio API Synthesizer (Zero External Dependencies) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.isMuted = Storage.get('fcj_sound_muted', false);
    }

    init() {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      Storage.set('fcj_sound_muted', this.isMuted);
      return this.isMuted;
    }

    playThrust() {
      if (this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(200, t + 0.12);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.12);
      } catch (e) {}
    }

    playScore() {
      if (this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        // Two-tone bright cyber chime
        [587.33, 880].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const noteTime = t + i * 0.05;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.18, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.18);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.18);
        });
      } catch (e) {}
    }

    playCrash() {
      if (this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.35);
      } catch (e) {}
    }

    playNewRecord() {
      if (this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const noteTime = t + i * 0.08;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.25, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.22);
        });
      } catch (e) {}
    }

    playClick() {
      if (this.isMuted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, t);
        osc.frequency.exponentialRampToValueAtTime(450, t + 0.04);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.04);
      } catch (e) {}
    }
  }

  // --- Cyber Jet Player Entity ---
  class CyberJet {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = 110;
      this.y = 280;
      this.width = 44;
      this.height = 22;
      this.radiusX = 18;
      this.radiusY = 10;
      this.vy = 0;
      this.rotation = 0;
      this.targetRotation = 0;
      this.thrustPulse = 0;
      this.trailTimer = 0;
    }

    boost() {
      this.vy = BOOST_IMPULSE;
      this.thrustPulse = 1.0;
    }

    update(dt, particles) {
      // Gravity acceleration
      this.vy += GRAVITY * dt;

      // Clamp velocities
      if (this.vy > MAX_FALL_VELOCITY) this.vy = MAX_FALL_VELOCITY;
      if (this.vy < MAX_RISE_VELOCITY) this.vy = MAX_RISE_VELOCITY;

      // Apply vertical movement
      this.y += this.vy * dt;

      // Smooth dynamic rotation based on velocity
      // Negative rotation = pitch up (-26 deg), Positive rotation = pitch down (+45 deg)
      this.targetRotation = Math.max(-0.45, Math.min(0.75, this.vy * 0.0018));
      this.rotation += (this.targetRotation - this.rotation) * Math.min(1, dt * 14);

      // Decay thrust pulse
      if (this.thrustPulse > 0) {
        this.thrustPulse = Math.max(0, this.thrustPulse - dt * 4.5);
      }

      // Spawn afterburner trail particles
      this.trailTimer += dt;
      const trailInterval = this.thrustPulse > 0.2 ? 0.015 : 0.04;
      if (this.trailTimer >= trailInterval) {
        this.trailTimer = 0;
        const tailOffsetDist = 20;
        const tailX = this.x - Math.cos(this.rotation) * tailOffsetDist;
        const tailY = this.y - Math.sin(this.rotation) * tailOffsetDist;

        particles.addThrusterParticle(
          tailX,
          tailY,
          -120 - Math.random() * 80,
          (Math.random() - 0.5) * 40,
          this.thrustPulse > 0.3
        );
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // 1. Afterburner Flame Jet
      const flameLength = 16 + this.thrustPulse * 24 + Math.random() * 6;
      const flameWidth = 7 + this.thrustPulse * 5;

      // Outer plasma flame
      ctx.save();
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.fillStyle = this.thrustPulse > 0.3 ? '#f59e0b' : '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-18, -flameWidth * 0.5);
      ctx.lineTo(-18 - flameLength, 0);
      ctx.lineTo(-18, flameWidth * 0.5);
      ctx.closePath();
      ctx.fill();

      // Inner intense core flame
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-18, -flameWidth * 0.25);
      ctx.lineTo(-18 - flameLength * 0.6, 0);
      ctx.lineTo(-18, flameWidth * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Main Wings & Delta Fuselage (Stealth Jet Shape)
      ctx.save();
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;

      // Wings base
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(22, 0);       // Nose cone
      ctx.lineTo(-6, -18);     // Right wing tip
      ctx.lineTo(-14, -14);    // Right wing corner
      ctx.lineTo(-10, -6);     // Right intake
      ctx.lineTo(-18, -5);     // Right engine nozzle
      ctx.lineTo(-18, 5);      // Left engine nozzle
      ctx.lineTo(-10, 6);      // Left intake
      ctx.lineTo(-14, 14);     // Left wing corner
      ctx.lineTo(-6, 18);      // Left wing tip
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Top fuselage armor plate
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-4, -7);
      ctx.lineTo(-16, -4);
      ctx.lineTo(-16, 4);
      ctx.lineTo(-4, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit glowing glass canopy
      const canopyGrad = ctx.createLinearGradient(-2, 0, 16, 0);
      canopyGrad.addColorStop(0, '#0284c7');
      canopyGrad.addColorStop(0.5, '#00f0ff');
      canopyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = canopyGrad;
      ctx.beginPath();
      ctx.ellipse(4, 0, 9, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wingtip Neon Light Beacons (Magenta)
      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(-6, -17, 2, 0, Math.PI * 2);
      ctx.arc(-6, 17, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();
    }
  }

  // --- Obstacle Pair (Cyber Neon Energy Pylons) ---
  class ObstaclePair {
    constructor(x, gap, speed, theme) {
      this.x = x;
      this.width = OBSTACLE_WIDTH;
      this.gap = gap;
      this.speed = speed;
      this.theme = theme; // 'cyan' | 'magenta' | 'amber'
      this.passed = false;
      this.pulseTime = Math.random() * 10;

      // Calculate safe randomized vertical gap position
      const minTop = CEILING_H + 45;
      const maxTop = V_HEIGHT - FLOOR_H - this.gap - 45;
      this.topHeight = Math.floor(minTop + Math.random() * (maxTop - minTop));
      this.bottomY = this.topHeight + this.gap;
      this.bottomHeight = V_HEIGHT - FLOOR_H - this.bottomY;
    }

    update(dt) {
      this.x -= this.speed * dt;
      this.pulseTime += dt;
    }

    draw(ctx) {
      const pulse = 0.75 + Math.sin(this.pulseTime * 4) * 0.25;
      const primaryColor = this.theme === 'magenta' ? '#ec4899' : (this.theme === 'amber' ? '#f59e0b' : '#00f0ff');
      const dimColor = this.theme === 'magenta' ? 'rgba(236,72,153,0.3)' : (this.theme === 'amber' ? 'rgba(245,158,11,0.3)' : 'rgba(0,240,255,0.3)');

      // Draw Top Pylon
      this.drawPylon(ctx, this.x, 0, this.width, this.topHeight, true, primaryColor, dimColor, pulse);

      // Draw Bottom Pylon
      this.drawPylon(ctx, this.x, this.bottomY, this.width, this.bottomHeight, false, primaryColor, dimColor, pulse);

      // Draw Faint Energy Barrier Hazard Arcs across the gap edges
      ctx.save();
      ctx.strokeStyle = primaryColor;
      ctx.globalAlpha = 0.2 + pulse * 0.2;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(this.x + this.width * 0.5, this.topHeight);
      ctx.lineTo(this.x + this.width * 0.5, this.bottomY);
      ctx.stroke();
      ctx.restore();
    }

    drawPylon(ctx, x, y, w, h, isTop, primaryColor, dimColor, pulse) {
      if (h <= 0) return;

      ctx.save();
      // 1. Solid gunmetal pillar body
      ctx.fillStyle = '#090f1d';
      ctx.fillRect(x, y, w, h);

      // 2. Interior Circuit/Energy Conduit
      const conduitX = x + w * 0.5;
      ctx.strokeStyle = dimColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(conduitX, y);
      ctx.lineTo(conduitX, y + h);
      ctx.stroke();

      // Pulsing energy nodes on conduit
      const nodeStep = 32;
      ctx.fillStyle = primaryColor;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 8 * pulse;
      for (let ny = y + 16; ny < y + h - 16; ny += nodeStep) {
        ctx.beginPath();
        ctx.arc(conduitX, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Neon Border Edges
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10 * pulse;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + h);
      ctx.moveTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.stroke();

      // 4. Emitter Cap facing the gap
      const capH = 14;
      const capY = isTop ? y + h - capH : y;

      // Heavy emitter bracket
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x - 3, capY, w + 6, capH);

      // Emitter lip highlight
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (isTop) {
        ctx.moveTo(x - 3, capY + capH);
        ctx.lineTo(x + w + 3, capY + capH);
      } else {
        ctx.moveTo(x - 3, capY);
        ctx.lineTo(x + w + 3, capY);
      }
      ctx.stroke();

      // Emitter glowing diodes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      const diodeY = isTop ? capY + capH - 4 : capY + 4;
      ctx.arc(x + 12, diodeY, 2.5, 0, Math.PI * 2);
      ctx.arc(x + w * 0.5, diodeY, 3, 0, Math.PI * 2);
      ctx.arc(x + w - 12, diodeY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // --- Particle FX Engine ---
  class ParticleEngine {
    constructor() {
      this.particles = [];
      this.floatingTexts = [];
      this.rings = [];
    }

    reset() {
      this.particles = [];
      this.floatingTexts = [];
      this.rings = [];
    }

    addThrusterParticle(x, y, vx, vy, isBoost) {
      this.particles.push({
        type: 'exhaust',
        x,
        y,
        vx,
        vy,
        size: isBoost ? 4 + Math.random() * 3 : 2 + Math.random() * 2,
        alpha: 1,
        life: 0,
        maxLife: isBoost ? 0.45 : 0.28,
        color: isBoost ? (Math.random() > 0.5 ? '#f59e0b' : '#00f0ff') : '#38bdf8'
      });
    }

    addScoreRing(x, y) {
      this.rings.push({
        x,
        y,
        radius: 10,
        maxRadius: 45,
        alpha: 1,
        color: '#00f0ff'
      });
      this.floatingTexts.push({
        x,
        y: y - 10,
        vy: -55,
        text: '+1',
        alpha: 1,
        life: 0,
        maxLife: 0.8
      });
    }

    addExplosion(x, y) {
      // 50 colorful sparks & shrapnel
      const colors = ['#ffffff', '#00f0ff', '#38bdf8', '#ec4899', '#f59e0b'];
      for (let i = 0; i < 55; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 220;
        this.particles.push({
          type: 'spark',
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 3.5,
          alpha: 1,
          life: 0,
          maxLife: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Explosion Shockwave Ring
      this.rings.push({
        x,
        y,
        radius: 8,
        maxRadius: 75,
        alpha: 1,
        color: '#f43f5e'
      });
    }

    update(dt) {
      // Update particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          this.particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha = 1 - (p.life / p.maxLife);
        if (p.type === 'spark') {
          p.vy += 300 * dt; // gravity on sparks
        }
      }

      // Update rings
      for (let i = this.rings.length - 1; i >= 0; i--) {
        const r = this.rings[i];
        r.radius += (r.maxRadius - r.radius) * dt * 8;
        r.alpha -= dt * 2.2;
        if (r.alpha <= 0 || r.radius >= r.maxRadius - 1) {
          this.rings.splice(i, 1);
        }
      }

      // Update floating texts
      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.life += dt;
        if (ft.life >= ft.maxLife) {
          this.floatingTexts.splice(i, 1);
          continue;
        }
        ft.y += ft.vy * dt;
        ft.alpha = 1 - (ft.life / ft.maxLife);
      }
    }

    draw(ctx) {
      // Draw Expanding Rings
      this.rings.forEach(r => {
        ctx.save();
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = 3;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // Draw Particles
      this.particles.forEach(p => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Floating Scores
      this.floatingTexts.forEach(ft => {
        ctx.save();
        ctx.font = 'bold 20px ui-monospace, Consolas, monospace';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });
    }
  }

  // --- Environment & Background Renderer ---
  class CyberEnvironment {
    constructor() {
      this.gridOffset = 0;
      this.cityOffset = 0;
      this.stars = [];
      this.initStars();
    }

    initStars() {
      this.stars = [];
      for (let i = 0; i < 60; i++) {
        this.stars.push({
          x: Math.random() * V_WIDTH,
          y: Math.random() * (V_HEIGHT - FLOOR_H),
          size: 0.8 + Math.random() * 1.6,
          speed: 15 + Math.random() * 35,
          alpha: 0.3 + Math.random() * 0.7
        });
      }
    }

    update(dt, speed) {
      const activeSpeed = speed || INITIAL_SPEED;

      // Scroll stars
      this.stars.forEach(s => {
        s.x -= s.speed * dt;
        if (s.x < 0) {
          s.x = V_WIDTH;
          s.y = Math.random() * (V_HEIGHT - FLOOR_H);
        }
      });

      // Scroll city skyline
      this.cityOffset = (this.cityOffset + activeSpeed * 0.35 * dt) % 180;

      // Scroll grid floor
      this.gridOffset = (this.gridOffset + activeSpeed * dt) % 30;
    }

    draw(ctx) {
      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
      skyGrad.addColorStop(0, '#040711');
      skyGrad.addColorStop(0.6, '#090f23');
      skyGrad.addColorStop(1, '#11182e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

      // 2. Stars / Cyber Dust
      ctx.fillStyle = '#ffffff';
      this.stars.forEach(s => {
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      ctx.globalAlpha = 1.0;

      // 3. Distant City Skyline Silhouettes
      ctx.save();
      ctx.fillStyle = '#0c1222';
      const buildingWidth = 36;
      const startX = -this.cityOffset;
      for (let bx = startX; bx < V_WIDTH + buildingWidth * 2; bx += buildingWidth) {
        const heightFactor = Math.abs(Math.sin((bx + this.cityOffset) * 0.05));
        const bHeight = 50 + heightFactor * 90;
        const bY = V_HEIGHT - FLOOR_H - bHeight;
        ctx.fillRect(bx, bY, buildingWidth - 3, bHeight);

        // Cyber window grid
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        for (let wy = bY + 10; wy < V_HEIGHT - FLOOR_H - 10; wy += 14) {
          ctx.fillRect(bx + 6, wy, 4, 6);
          ctx.fillRect(bx + 16, wy, 4, 6);
          ctx.fillRect(bx + 26, wy, 4, 6);
        }
        ctx.fillStyle = '#0c1222';

        // Rooftop antenna strobe beacon
        if (heightFactor > 0.6) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(bx + buildingWidth * 0.5, bY);
          ctx.lineTo(bx + buildingWidth * 0.5, bY - 14);
          ctx.stroke();

          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(bx + buildingWidth * 0.5, bY - 14, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Floor Grid (Synthwave Perspective Grid)
      const floorY = V_HEIGHT - FLOOR_H;
      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, floorY, V_WIDTH, FLOOR_H);

      // Horizon glowing laser line
      ctx.save();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(V_WIDTH, floorY);
      ctx.stroke();
      ctx.restore();

      // Floor vertical scrolling grid lines
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1.2;
      for (let gx = -this.gridOffset; gx < V_WIDTH + 30; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, floorY);
        ctx.lineTo(gx - 20, V_HEIGHT);
        ctx.stroke();
      }
      // Floor horizontal depth lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      [floorY + 12, floorY + 26, floorY + 40].forEach(hy => {
        ctx.beginPath();
        ctx.moveTo(0, hy);
        ctx.lineTo(V_WIDTH, hy);
        ctx.stroke();
      });
      ctx.restore();

      // 5. Ceiling Boundary Warning Stripe
      ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
      ctx.fillRect(0, 0, V_WIDTH, CEILING_H);
      ctx.save();
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, CEILING_H);
      ctx.lineTo(V_WIDTH, CEILING_H);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ==========================================================================
  // Main Flappy Cyber Jet Game Controller
  // ==========================================================================
  class GameController {
    constructor() {
      // DOM Elements
      this.canvas = document.getElementById('fcj-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.app = document.getElementById('fcj-app');
      this.container = document.getElementById('fcj-game-container');

      // HUD & Overlays
      this.hudScore = document.getElementById('fcj-hud-score');
      this.hudBest = document.getElementById('fcj-hud-best');
      this.btnSound = document.getElementById('fcj-btn-sound');
      this.btnPause = document.getElementById('fcj-btn-pause');
      this.soundIcon = document.getElementById('fcj-sound-icon');
      this.pauseIcon = document.getElementById('fcj-pause-icon');

      this.startScreen = document.getElementById('fcj-start-screen');
      this.pauseScreen = document.getElementById('fcj-pause-screen');
      this.gameOverScreen = document.getElementById('fcj-gameover-screen');

      this.startBestVal = document.getElementById('fcj-start-best');
      this.pauseScoreVal = document.getElementById('fcj-pause-score');
      this.pauseBestVal = document.getElementById('fcj-pause-best');
      this.gameoverScoreVal = document.getElementById('fcj-gameover-score');
      this.gameoverBestVal = document.getElementById('fcj-gameover-best');
      this.newRecordBadge = document.getElementById('fcj-new-record-badge');
      this.liveAnnouncer = document.getElementById('fcj-live-announcer');

      // Buttons
      this.btnStart = document.getElementById('fcj-btn-start');
      this.btnResume = document.getElementById('fcj-btn-resume');
      this.btnPauseRestart = document.getElementById('fcj-btn-pause-restart');
      this.btnRestart = document.getElementById('fcj-btn-restart');
      this.btnMenu = document.getElementById('fcj-btn-menu');

      // Engine Subsystems
      this.sound = new SoundFX();
      this.jet = new CyberJet();
      this.particles = new ParticleEngine();
      this.env = new CyberEnvironment();

      // State Management
      this.state = STATE.START;
      this.score = 0;
      this.bestScore = Storage.get('fcj_best_score', 0);
      this.isNewRecord = false;

      // Obstacle management
      this.obstacles = [];
      this.obstacleTravelSinceLastSpawn = 0;

      // Animation Loop Control
      this.lastTime = 0;
      this.rafId = null;
      this.screenShake = 0;

      // Canvas DPI / Scale Matrix
      this.scale = 1;
      this.offsetX = 0;
      this.offsetY = 0;

      this.init();
    }

    init() {
      this.updateBestScoreDisplay();
      this.updateSoundButtonUI();
      this.handleResize();

      // Attach Event Listeners
      window.addEventListener('resize', () => this.handleResize());
      this.bindInputs();

      // Announce initial screen
      this.announce('Flappy Cyber Jet ready. Select Launch Jet to begin.');

      // Start the core render loop
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame((ts) => this.loop(ts));
    }

    // --- High-DPI Canvas Sizing ---
    handleResize() {
      const rect = this.container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      // Fit virtual 480x640 within container rect while preserving 3:4 aspect
      const containerAspect = rect.width / rect.height;
      const gameAspect = V_WIDTH / V_HEIGHT;

      let displayW, displayH;
      if (containerAspect > gameAspect) {
        displayH = rect.height;
        displayW = displayH * gameAspect;
      } else {
        displayW = rect.width;
        displayH = displayW / gameAspect;
      }

      this.scale = displayW / V_WIDTH;

      this.canvas.width = Math.round(displayW * dpr);
      this.canvas.height = Math.round(displayH * dpr);

      // Internal transform to virtual coordinate space
      this.ctx.setTransform(dpr * this.scale, 0, 0, dpr * this.scale, 0, 0);
    }

    // --- Inputs & Event Listeners ---
    bindInputs() {
      // Primary Action Trigger (Space, ArrowUp, KeyW)
      window.addEventListener('keydown', (e) => {
        // Unlock audio context on initial keypress
        this.sound.init();

        if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
          // Prevent page scrolling on Space / ArrowUp
          e.preventDefault();
          this.handleActionTrigger();
        } else if (e.code === 'KeyP' || e.code === 'Escape') {
          e.preventDefault();
          this.handlePauseToggle();
        } else if (e.code === 'KeyM') {
          this.handleSoundToggle();
        } else if (e.code === 'Enter') {
          if (this.state === STATE.GAMEOVER) {
            this.startRound();
          } else if (this.state === STATE.START) {
            this.startRound();
          }
        }
      });

      // Canvas Pointer/Touch Input
      this.canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.sound.init();
        this.handleActionTrigger();
      });

      // UI Button Clicks
      this.btnStart.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.init();
        this.sound.playClick();
        this.startRound();
      });

      this.btnResume.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        this.resumeGame();
      });

      this.btnPauseRestart.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        this.startRound();
      });

      this.btnRestart.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        this.startRound();
      });

      this.btnMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        this.showStartScreen();
      });

      this.btnPause.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.playClick();
        this.handlePauseToggle();
      });

      this.btnSound.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleSoundToggle();
      });
    }

    handleActionTrigger() {
      if (this.state === STATE.PLAYING) {
        this.jet.boost();
        this.sound.playThrust();
      } else if (this.state === STATE.START) {
        this.startRound();
      } else if (this.state === STATE.GAMEOVER) {
        this.startRound();
      }
    }

    handlePauseToggle() {
      if (this.state === STATE.PLAYING) {
        this.pauseGame();
      } else if (this.state === STATE.PAUSED) {
        this.resumeGame();
      }
    }

    handleSoundToggle() {
      this.sound.init();
      const muted = this.sound.toggleMute();
      this.updateSoundButtonUI();
      if (!muted) this.sound.playClick();
    }

    updateSoundButtonUI() {
      if (this.sound.isMuted) {
        this.soundIcon.innerHTML = '<i data-lucide="volume-x"></i>';
        this.btnSound.setAttribute('aria-label', 'Unmute sound');
      } else {
        this.soundIcon.innerHTML = '<i data-lucide="volume-2"></i>';
        this.btnSound.setAttribute('aria-label', 'Mute sound');
      }
      if (window.lucide) {
        lucide.createIcons();
      }
    }

    updateBestScoreDisplay() {
      this.hudBest.textContent = this.bestScore;
      this.startBestVal.textContent = this.bestScore;
    }

    announce(text) {
      if (this.liveAnnouncer) {
        this.liveAnnouncer.textContent = text;
      }
    }

    // --- State Transitions ---
    startRound() {
      this.state = STATE.PLAYING;
      this.score = 0;
      this.isNewRecord = false;
      this.hudScore.textContent = '0';
      this.obstacleTravelSinceLastSpawn = SPAWN_DISTANCE; // trigger immediate obstacle
      this.obstacles = [];
      this.particles.reset();
      this.jet.reset();
      this.screenShake = 0;

      // Hide all overlays
      this.startScreen.classList.add('fcj-hidden');
      this.pauseScreen.classList.add('fcj-hidden');
      this.gameOverScreen.classList.add('fcj-hidden');
      this.newRecordBadge.classList.add('fcj-hidden');

      this.announce('Mission launched! Flight controls engaged.');
      this.lastTime = performance.now();
    }

    pauseGame() {
      if (this.state !== STATE.PLAYING) return;
      this.state = STATE.PAUSED;

      this.pauseScoreVal.textContent = this.score;
      this.pauseBestVal.textContent = this.bestScore;
      this.pauseScreen.classList.remove('fcj-hidden');
      this.announce('Flight paused.');
    }

    resumeGame() {
      if (this.state !== STATE.PAUSED) return;
      this.state = STATE.PLAYING;
      this.pauseScreen.classList.add('fcj-hidden');
      this.lastTime = performance.now();
      this.announce('Flight resumed.');
    }

    showStartScreen() {
      this.state = STATE.START;
      this.updateBestScoreDisplay();
      this.startScreen.classList.remove('fcj-hidden');
      this.pauseScreen.classList.add('fcj-hidden');
      this.gameOverScreen.classList.add('fcj-hidden');
      this.jet.reset();
      this.obstacles = [];
      this.particles.reset();
      this.announce('Returned to main menu.');
    }

    triggerGameOver() {
      this.state = STATE.GAMEOVER;
      this.sound.playCrash();
      this.screenShake = 0.35; // 350ms shake

      // Explosion sparks
      this.particles.addExplosion(this.jet.x, this.jet.y);

      // Check high score
      let recordBroken = false;
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        this.isNewRecord = true;
        recordBroken = true;
        Storage.set('fcj_best_score', this.bestScore);
        this.updateBestScoreDisplay();
        setTimeout(() => this.sound.playNewRecord(), 400);
      }

      // Populate game over modal
      this.gameoverScoreVal.textContent = this.score;
      this.gameoverBestVal.textContent = this.bestScore;

      if (recordBroken) {
        this.newRecordBadge.classList.remove('fcj-hidden');
      } else {
        this.newRecordBadge.classList.add('fcj-hidden');
      }

      // Reveal game over overlay after brief impact pause
      setTimeout(() => {
        if (this.state === STATE.GAMEOVER) {
          this.gameOverScreen.classList.remove('fcj-hidden');
          this.announce(`Mission over. Final score: ${this.score}. High score: ${this.bestScore}.`);
        }
      }, 350);
    }

    // --- Difficulty Progression ---
    getCurrentSpeed() {
      return Math.min(MAX_SPEED, INITIAL_SPEED + this.score * 1.8);
    }

    getCurrentGap() {
      return Math.max(MIN_GAP, INITIAL_GAP - this.score * 1.1);
    }

    getCurrentTheme() {
      if (this.score >= 30) return 'amber';
      if (this.score >= 15) return 'magenta';
      return 'cyan';
    }

    // --- Collision Detection ---
    checkCollisions() {
      const jx = this.jet.x;
      const jy = this.jet.y;
      const rx = this.jet.radiusX;
      const ry = this.jet.radiusY;

      // 1. Boundary Collisions (Ceiling & Floor)
      if (jy - ry <= CEILING_H) {
        return true;
      }
      if (jy + ry >= V_HEIGHT - FLOOR_H) {
        return true;
      }

      // 2. Obstacle Collisions
      // Inset obstacle hitbox by 3px for player-friendly collision feel
      const inset = 3;
      for (let i = 0; i < this.obstacles.length; i++) {
        const obs = this.obstacles[i];
        const ox = obs.x + inset;
        const ow = obs.width - inset * 2;

        // Quick AABB horizontal check
        if (jx + rx > ox && jx - rx < ox + ow) {
          // Check collision with top pylon
          const topH = obs.topHeight;
          if (jy - ry < topH) {
            return true;
          }
          // Check collision with bottom pylon
          const botY = obs.bottomY;
          if (jy + ry > botY) {
            return true;
          }
        }
      }

      return false;
    }

    // --- Core Game Loop ---
    loop(timestamp) {
      this.rafId = requestAnimationFrame((ts) => this.loop(ts));

      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
      this.lastTime = timestamp;

      this.update(dt);
      this.render();
    }

    update(dt) {
      if (this.state === STATE.PLAYING) {
        const currentSpeed = this.getCurrentSpeed();

        // Update Environment background
        this.env.update(dt, currentSpeed);

        // Update Jet Physics
        this.jet.update(dt, this.particles);

        // Spawn & Update Obstacles
        this.obstacleTravelSinceLastSpawn += currentSpeed * dt;
        if (this.obstacleTravelSinceLastSpawn >= SPAWN_DISTANCE) {
          this.obstacleTravelSinceLastSpawn = 0;
          const newGap = this.getCurrentGap();
          const newTheme = this.getCurrentTheme();
          this.obstacles.push(new ObstaclePair(V_WIDTH + 10, newGap, currentSpeed, newTheme));
        }

        // Update Obstacles position & scoring
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          obs.update(dt);

          // Score detection: once jet passes center of obstacle
          if (!obs.passed && this.jet.x > obs.x + obs.width * 0.5) {
            obs.passed = true;
            this.score++;
            this.hudScore.textContent = this.score;
            this.sound.playScore();

            // Spawn score ring & floating +1 at gap center
            const gapCenterY = obs.topHeight + obs.gap * 0.5;
            this.particles.addScoreRing(this.jet.x, gapCenterY);

            // Announce milestone every 10 points
            if (this.score % 10 === 0) {
              this.announce(`Score ${this.score}`);
            }
          }

          // Cull off-screen obstacles
          if (obs.x + obs.width < -20) {
            this.obstacles.splice(i, 1);
          }
        }

        // Check for collisions
        if (this.checkCollisions()) {
          this.triggerGameOver();
        }
      } else if (this.state === STATE.START) {
        // Idle environment animation
        this.env.update(dt, 50);
        // Idle hover animation for jet
        this.jet.y = 280 + Math.sin(performance.now() * 0.003) * 12;
      }

      // Update screen shake
      if (this.screenShake > 0) {
        this.screenShake = Math.max(0, this.screenShake - dt);
      }

      // Update Particles & FX
      this.particles.update(dt);
    }

    render() {
      this.ctx.save();

      // Screen Shake Displacement
      if (this.screenShake > 0) {
        const intensity = this.screenShake * 16;
        const sx = (Math.random() - 0.5) * intensity;
        const sy = (Math.random() - 0.5) * intensity;
        this.ctx.translate(sx, sy);
      }

      // 1. Draw Background Environment (Stars, Skyline, Horizon, Floor)
      this.env.draw(this.ctx);

      // 2. Draw Obstacles
      this.obstacles.forEach(obs => obs.draw(this.ctx));

      // 3. Draw Particles & FX
      this.particles.draw(this.ctx);

      // 4. Draw Jet (if not completely crashed or destroyed)
      if (this.state !== STATE.GAMEOVER || this.screenShake > 0.15) {
        this.jet.draw(this.ctx);
      }

      this.ctx.restore();
    }
  }

  // --- Bootstrap Engine on DOM Load ---
  document.addEventListener('DOMContentLoaded', () => {
    new GameController();
  });

})();
