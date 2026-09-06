// AetherClash: Sovereign - Particle & Visual FX Engine
// Gestisce scintille cosmiche, onde d'urto, fiamme di Overcharge e feedback visivo juicy a 60 FPS

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.floatingTexts = [];
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.container = null;
    this.animId = null;
  }

  init(canvasEl, containerEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.container = containerEl;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  // Trigger scuotimento schermo (Juiciness)
  shake(intensity = 8, duration = 250) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
    const startTime = performance.now();

    const applyShake = (now) => {
      const elapsed = now - startTime;
      if (elapsed < this.shakeDuration && this.container) {
        const factor = 1 - (elapsed / this.shakeDuration);
        const dx = (Math.random() - 0.5) * this.shakeIntensity * factor;
        const dy = (Math.random() - 0.5) * this.shakeIntensity * factor;
        this.container.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(applyShake);
      } else if (this.container) {
        this.container.style.transform = 'translate(0px, 0px)';
      }
    };
    requestAnimationFrame(applyShake);
  }

  // Esplosione particellare per impatto o level up
  spawnExplosion(x, y, color = '#00f0ff', count = 30, speed = 6) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (Math.random() * 0.7 + 0.3) * speed;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        radius: Math.random() * 4 + 2,
        color: color,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.08
      });
    }
  }

  // Fontane di fiamme dorate/blu per Overcharge
  spawnOverchargeFlames(x, y, count = 20) {
    const colors = ['#f59e0b', '#ef4444', '#00f0ff', '#38bdf8', '#fbbf24'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 60,
        y: y,
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 5 + 3),
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        gravity: -0.05
      });
    }
  }

  // Numeri moltiplicatori stile Balatro (+15, x2.5!, CRITICO)
  spawnFloatingText(x, y, text, color = '#facc15', fontSize = 24) {
    this.floatingTexts.push({
      x,
      y,
      vy: -2.5,
      text,
      color,
      fontSize,
      alpha: 1,
      scale: 1.5,
      decay: 0.018
    });
  }

  loop() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render Particelle
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Render Floating Numbers (Balatro Style)
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= ft.decay;
      if (ft.scale > 1.0) ft.scale -= 0.04;

      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ft.alpha);
      this.ctx.font = `900 ${Math.round(ft.fontSize * ft.scale)}px sans-serif`;
      this.ctx.fillStyle = ft.color;
      this.ctx.textAlign = 'center';
      this.ctx.shadowColor = '#000';
      this.ctx.shadowBlur = 8;
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }
}

export const fx = new ParticleEngine();
