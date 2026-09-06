// AetherClash: Sovereign - App Orchestrator & Touch UI Controller
// Gestisce drag-and-drop, touch controls ergonomici per mobile, audio e animazioni 2D

import { GameEngine } from './engine.js';
import { sound } from './audio.js';
import { fx } from './particles.js';
import { CARD_TYPES, EDITIONS } from './cards.js';

class AetherClashApp {
  constructor() {
    this.container = document.getElementById('app-container');
    this.canvas = document.getElementById('fx-canvas');
    this.selectedCardId = null;
    this.inspectCard = null;
    this.engine = null;

    this.init();
  }

  init() {
    fx.init(this.canvas, this.container);

    this.engine = new GameEngine(
      (engine) => this.render(engine),
      (champ, who) => this.triggerChampionCutIn(champ, who),
      (choices, onPick) => this.showDiscoverModal(choices, onPick)
    );

    this.setupGlobalControls();
    this.render(this.engine);
  }

  setupGlobalControls() {
    // Bottone Overcharge (Snap)
    const btnOvercharge = document.getElementById('btn-overcharge');
    if (btnOvercharge) {
      btnOvercharge.addEventListener('click', () => {
        if (!this.engine.playerOvercharged && this.engine.phase === 'PLANNING') {
          const rect = btnOvercharge.getBoundingClientRect();
          fx.spawnOverchargeFlames(rect.left + rect.width / 2, rect.top);
          fx.shake(10, 300);
          this.engine.togglePlayerOvercharge();
        }
      });
    }

    // Bottone Termina Turno
    const btnEndTurn = document.getElementById('btn-end-turn');
    if (btnEndTurn) {
      btnEndTurn.addEventListener('click', () => {
        if (this.engine.phase === 'PLANNING') {
          sound.playCardSlam();
          this.engine.endTurn();
        }
      });
    }

    // Audio Mute Toggle
    const btnAudio = document.getElementById('btn-audio-toggle');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        btnAudio.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Restart Match
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        document.getElementById('modal-gameover').style.display = 'none';
        this.engine.reset();
      });
    }
  }

  // Render principale sincronizzato con lo stato
  render(engine) {
    // Aggiorna Header
    document.getElementById('turn-display').textContent = `Turno ${engine.turn}/${engine.maxTurns}`;
    document.getElementById('stakes-display').textContent = `${engine.stakes}x POSTA`;
    document.getElementById('ai-intent-text').textContent = engine.aiIntent;

    // Aggiorna Risorse Giocatore
    document.getElementById('energy-value').textContent = `${engine.playerEnergy}/${engine.playerMaxEnergy}`;
    document.getElementById('souls-value').textContent = `${engine.playerSouls} Anime`;

    // Stato Bottone Overcharge
    const btnOvercharge = document.getElementById('btn-overcharge');
    if (btnOvercharge) {
      if (engine.playerOvercharged) {
        btnOvercharge.classList.add('is-active');
        btnOvercharge.innerHTML = `🔥 ATTIVO (${engine.stakes}x)`;
      } else {
        btnOvercharge.classList.remove('is-active');
        btnOvercharge.innerHTML = `⚡ OVERCHARGE`;
      }
    }

    // Render Santuari
    this.renderSanctuaries(engine);

    // Render Mano del Giocatore
    this.renderHand(engine);

    // Render Log di combattimento a scorrimento
    const logContainer = document.getElementById('combat-log-stream');
    if (logContainer) {
      logContainer.innerHTML = engine.combatLog.slice(-3).map(msg => 
        `<div class="log-entry">${msg}</div>`
      ).join('');
    }

    // Schermata Fine Partita
    if (engine.phase === 'GAME_OVER') {
      const modal = document.getElementById('modal-gameover');
      const title = document.getElementById('gameover-title');
      const desc = document.getElementById('gameover-desc');

      if (engine.winner === 'player') {
        title.textContent = '🏆 VITTORIA SOVRANA!';
        title.style.color = '#facc15';
        desc.textContent = `Hai dominato i Santuari e conquistato ${engine.stakes * 100} Punti Gloria!`;
        fx.spawnExplosion(this.canvas.width / 2, this.canvas.height / 2, '#00f0ff', 60, 10);
      } else if (engine.winner === 'ai') {
        title.textContent = '💀 SCONFITTA';
        title.style.color = '#f87171';
        desc.textContent = `L'avversario ha preso il controllo del Nexus Etereo. Riprova la scalata!`;
      } else {
        title.textContent = '⚖️ PARITÀ ASTRALE';
        title.style.color = '#94a3b8';
        desc.textContent = `Entrambi i sovrani si ritirano con onore.`;
      }
      modal.style.display = 'flex';
    }
  }

  // Render dei 3 Santuari Aerei
  renderSanctuaries(engine) {
    const container = document.getElementById('sanctuaries-container');
    container.innerHTML = '';

    engine.sanctuaries.forEach((sanc, index) => {
      const col = document.createElement('div');
      col.className = 'sanctuary-column';
      col.style.background = sanc.effect.bgGradient;
      col.style.borderColor = sanc.effect.borderColor || 'rgba(255,255,255,0.1)';

      // Indicatore di corsia vincente
      let laneBadgeClass = 'lane-status-badge';
      let laneText = 'Parità';
      if (sanc.winner === 'player') {
        laneBadgeClass += ' lane-win-player';
        laneText = 'Tuo';
      } else if (sanc.winner === 'ai') {
        laneBadgeClass += ' lane-win-ai';
        laneText = 'Nemico';
      }

      col.innerHTML = `
        <div class="sanctuary-header">
          <div class="sanctuary-title">${sanc.effect.icon} ${sanc.effect.name}</div>
          <div class="sanctuary-desc">${sanc.effect.desc}</div>
        </div>

        <!-- Carte IA -->
        <div class="card-slots-zone ai-zone" id="sanc-ai-${index}">
          ${sanc.aiCards.map(c => `
            <div class="mini-card ${c.isFacedown ? 'mini-facedown' : ''}">
              <span>${c.isFacedown ? '❓ Glifo Segreto' : c.name.slice(0, 14)}</span>
              <span class="mini-card-power">${c.isFacedown ? '?' : c.currentPower}</span>
            </div>
          `).join('')}
        </div>

        <!-- Clash Score -->
        <div class="sanctuary-clash-bar">
          <span class="score-ai">${sanc.aiScore}</span>
          <span class="${laneBadgeClass}">${laneText}</span>
          <span class="score-player">${sanc.playerScore}</span>
        </div>

        <!-- Carte Giocatore -->
        <div class="card-slots-zone player-zone" id="sanc-player-${index}">
          ${sanc.playerCards.map(c => `
            <div class="mini-card ${c.type === CARD_TYPES.CHAMPION ? 'mini-champ' : ''} ${c.isFacedown ? 'mini-facedown' : ''}" data-card-id="${c.instanceId}">
              <span>${c.isFacedown ? '🛡️ Glifo Nascosto' : c.name.slice(0, 14)}</span>
              <span class="mini-card-power">${c.isFacedown ? '?' : c.currentPower}</span>
            </div>
          `).join('')}
        </div>
      `;

      // Tap sul Santuario per schierare la carta selezionata
      col.addEventListener('click', (e) => {
        if (this.selectedCardId) {
          // Se la carta richiede sacrificio, verifica se è stato cliccato un mini-card alleato
          const miniTarget = e.target.closest('.mini-card');
          const sacrificeId = miniTarget ? miniTarget.getAttribute('data-card-id') : null;

          const result = this.engine.playPlayerCard(this.selectedCardId, index, sacrificeId);
          if (result.success) {
            const rect = col.getBoundingClientRect();
            fx.spawnExplosion(rect.left + rect.width / 2, rect.top + rect.height * 0.7, '#00f0ff', 20, 5);
            fx.shake(4, 150);
            this.selectedCardId = null;
          } else {
            alert(result.reason);
          }
        }
      });

      container.appendChild(col);
    });
  }

  // Render Mano (Touch Carousel Mobile)
  renderHand(engine) {
    const handContainer = document.getElementById('hand-container');
    handContainer.innerHTML = '';

    engine.playerHand.forEach((card, i) => {
      const cardEl = document.createElement('div');
      const isSelected = this.selectedCardId === card.instanceId;
      cardEl.className = `card-item ${card.edition} ${isSelected ? 'selected' : ''}`;

      // Calcola curvatura a ventaglio ergonomica per pollici
      const total = engine.playerHand.length;
      const angle = (i - (total - 1) / 2) * 5;
      const translateY = Math.abs(i - (total - 1) / 2) * 3;
      cardEl.style.transform = `rotate(${angle}deg) translateY(${translateY}px)`;

      // Art & Layout Carta
      cardEl.innerHTML = `
        <div class="card-header-row">
          <div class="card-cost-circle">${card.cost}</div>
          <div class="card-power-circle">${card.power}</div>
        </div>
        <div class="card-art-box">
          ${card.artSvg}
        </div>
        <div class="card-name-title">${card.name}</div>
      `;

      // Interattività Touch & Click
      cardEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.selectedCardId === card.instanceId) {
          // Secondo tap apre l'ispezione dettagliata
          this.openInspectModal(card);
        } else {
          this.selectedCardId = card.instanceId;
          sound.playCardDraw();
          this.render(this.engine);
        }
      });

      handContainer.appendChild(cardEl);
    });
  }

  // Modale Hearthstone Discover (3 Carte Cosmiche a scelta)
  showDiscoverModal(choices, onPick) {
    const modal = document.getElementById('modal-discover');
    const cardsRow = document.getElementById('discover-cards-row');
    cardsRow.innerHTML = '';

    choices.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = `card-item ${card.edition}`;
      cardEl.style.width = '100px';
      cardEl.style.height = '150px';
      cardEl.innerHTML = `
        <div class="card-header-row">
          <div class="card-cost-circle">${card.cost}</div>
          <div class="card-power-circle">${card.power}</div>
        </div>
        <div class="card-art-box">${card.artSvg}</div>
        <div class="card-name-title">${card.name}</div>
        <div style="font-size:8px; color:#cbd5e1; text-align:center; padding:2px;">${card.text}</div>
      `;

      cardEl.addEventListener('click', () => {
        modal.style.display = 'none';
        onPick(card);
      });

      cardsRow.appendChild(cardEl);
    });

    modal.style.display = 'flex';
  }

  // Cut-In Cinematico 2D del Campione (Legends of Runeterra)
  triggerChampionCutIn(champ, who) {
    const cutin = document.getElementById('champion-cutin');
    const nameEl = document.getElementById('cutin-champ-name');
    const quoteEl = document.getElementById('cutin-champ-quote');
    const artEl = document.getElementById('cutin-champ-art');

    nameEl.textContent = champ.name;
    quoteEl.textContent = `"${champ.voiceLine || 'Potere Inarrestabile!'}"`;
    artEl.innerHTML = champ.artSvg;

    cutin.style.display = 'flex';
    fx.spawnExplosion(this.canvas.width / 2, this.canvas.height / 2, '#facc15', 70, 12);
    fx.shake(14, 600);

    setTimeout(() => {
      cutin.style.display = 'none';
      this.render(this.engine);
    }, 2200);
  }

  // Ispezione dettagliata carta (Long press / doppio tap)
  openInspectModal(card) {
    const modal = document.getElementById('modal-inspect');
    document.getElementById('inspect-title').textContent = card.name;
    document.getElementById('inspect-type').textContent = `${card.type} • Edizione ${card.edition.toUpperCase()}`;
    document.getElementById('inspect-art').innerHTML = card.artSvg;
    document.getElementById('inspect-desc').textContent = card.text;
    document.getElementById('inspect-stats').textContent = `Costo Energia: ${card.cost} ⚡ | Potere Base: ${card.power} ⚔️ | Moltiplicatore: x${card.mult}`;
    modal.style.display = 'flex';

    document.getElementById('inspect-close').onclick = () => {
      modal.style.display = 'none';
    };
  }
}

// Avvio al caricamento del DOM
window.addEventListener('DOMContentLoaded', () => {
  new AetherClashApp();
});
