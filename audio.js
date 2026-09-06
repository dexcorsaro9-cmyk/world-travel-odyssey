// World Travel Odyssey - Procedural Sound Synthesizer con Effetti Sbustamento 3D

class TravelSoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Strappo Sigillo Bustina 3D (Fruscio di carta metallizzata e alluminio)
  playPackTear() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;

    // Rumore bianco filtrato per simulare lo strappo della lamina metallica
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.6));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Flip della Carta 3D (Whoosh d'aria e rotazione)
  playCardFlip() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Fanfara Carta Leggendaria trovata nel pacchetto
  playLegendaryReveal() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major arpeggio con luccichio

    chords.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  }

  // Annuncio Aeroportuale Chime
  playChime() {
    if (this.isMuted) return;
    this.init();
    [554.37, 739.99].forEach((f, i) => {
      const now = this.ctx.currentTime + i * 0.2, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
      osc.frequency.setValueAtTime(f, now); g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.35);
    });
  }

  // Timbro Doganale sul Passaporto
  playStamp() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(140, now); osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
    g.gain.setValueAtTime(0.6, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.22);
  }

  // Espresso
  playEspresso() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
    osc.frequency.setValueAtTime(1800, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    g.gain.setValueAtTime(0.25, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.15);
  }

  // Wall Street
  playCash() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
    osc.type = 'square'; osc.frequency.setValueAtTime(987.77, now); osc.frequency.setValueAtTime(1318.51, now + 0.08);
    g.gain.setValueAtTime(0.18, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.25);
  }

  // Tokyo
  playTokyo() {
    if (this.isMuted) return;
    this.init();
    [659.25, 783.99, 880.00, 1046.50].forEach((f, i) => {
      const now = this.ctx.currentTime + i * 0.08, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
      osc.frequency.setValueAtTime(f, now); g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.25);
    });
  }

  // Decollo Overcharge
  playTakeoff() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), g = this.ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(90, now); osc.frequency.exponentialRampToValueAtTime(480, now + 0.45);
    g.gain.setValueAtTime(0.35, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(g); g.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.5);
  }
}

export const sound = new TravelSoundManager();
