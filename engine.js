// AetherClash: Sovereign - Game Engine
// Cuore deterministico con la fusione delle 10 meccaniche

import { ALL_CARDS, SANCTUARY_EFFECTS, CARD_TYPES, EDITIONS, STARTER_DECK_PLAYER, STARTER_DECK_AI } from './cards.js';
import { sound } from './audio.js';
import { fx } from './particles.js';

export class GameEngine {
  constructor(onStateChange, onCutIn, onDiscover) {
    this.onStateChange = onStateChange;
    this.onCutIn = onCutIn;
    this.onDiscover = onDiscover;
    this.reset();
  }

  reset() {
    this.turn = 1;
    this.maxTurns = 6; // Partite rapide da 3 minuti stile Marvel Snap
    this.phase = 'PLANNING'; // PLANNING, RESOLVING, GAME_OVER

    this.playerEnergy = 1;
    this.playerMaxEnergy = 1;
    this.playerSouls = 0; // Inscryption sacrifice pool

    this.aiEnergy = 1;
    this.aiMaxEnergy = 1;
    this.aiSouls = 0;

    this.stakes = 1; // 1x, 2x, 4x moltiplicatore posta (Snap)
    this.playerOvercharged = false;
    this.aiOvercharged = false;

    // Inizializza i 3 Santuari casuali
    this.sanctuaries = [
      {
        id: 0,
        effect: SANCTUARY_EFFECTS[0],
        playerCards: [],
        aiCards: [],
        playerScore: 0,
        aiScore: 0,
        winner: null
      },
      {
        id: 1,
        effect: SANCTUARY_EFFECTS[1],
        playerCards: [],
        aiCards: [],
        playerScore: 0,
        aiScore: 0,
        winner: null
      },
      {
        id: 2,
        effect: SANCTUARY_EFFECTS[2],
        playerCards: [],
        aiCards: [],
        playerScore: 0,
        aiScore: 0,
        winner: null
      }
    ];

    // Clona le carte per evitare mutazioni
    this.playerDeck = this.buildDeck(STARTER_DECK_PLAYER);
    this.aiDeck = this.buildDeck(STARTER_DECK_AI);

    this.playerHand = [];
    this.aiHand = [];

    // Campioni e tracciamento Level-Up (Runeterra)
    this.playerChampion = { ...ALL_CARDS.find(c => c.id === 'champ_kaelen') };
    this.aiChampion = { ...ALL_CARDS.find(c => c.id === 'champ_nyx') };

    this.playerChampionProgress = 0;
    this.aiChampionProgress = 0;

    // Pesca iniziale: 3 carte a testa
    for (let i = 0; i < 3; i++) {
      this.drawCard('player');
      this.drawCard('ai');
    }

    // Preveggenza Tattica (Slay the Spire Intent)
    this.aiIntent = this.calculateAiIntent();

    this.combatLog = ['Battaglia iniziata nei Tre Santuari. Schiera le tue carte!'];
    this.notify();
  }

  buildDeck(ids) {
    return ids.map((id, index) => {
      const base = ALL_CARDS.find(c => c.id === id);
      return {
        ...base,
        instanceId: `${id}_${index}_${Math.random().toString(36).substr(2, 4)}`,
        currentPower: base.power,
        currentCost: base.cost
      };
    }).sort(() => Math.random() - 0.5);
  }

  drawCard(who) {
    const deck = who === 'player' ? this.playerDeck : this.aiDeck;
    const hand = who === 'player' ? this.playerHand : this.aiHand;

    if (deck.length > 0 && hand.length < 7) {
      const card = deck.pop();
      hand.push(card);
      if (who === 'player') sound.playCardDraw();
    }
  }

  // Preveggenza Intenzione IA (Slay the Spire)
  calculateAiIntent() {
    const actions = [
      'Concentrazione offensiva sul Santuario Sinistro',
      'Pianificazione Glifo Segreto al Centro',
      'Carica Astrale sul Santuario Destro',
      'Consolidamento tattico delle corsie'
    ];
    return actions[Math.floor(Math.random() * actions.length)];
  }

  // Attivazione Overcharge / First Class Snap
  togglePlayerOvercharge() {
    if (this.playerOvercharged || this.phase !== 'PLANNING') return;
    this.playerOvercharged = true;
    this.stakes *= 2;
    sound.playOvercharge();
    this.combatLog.push(`⚡ OVERCHARGE ATTIVATO! La posta e i moltiplicatori salgono a ${this.stakes}x!`);
    this.notify();
  }

  // Gioca una carta dalla mano del giocatore in un Santuario
  playPlayerCard(cardInstanceId, sanctuaryIndex, sacrificeInstanceId = null) {
    if (this.phase !== 'PLANNING') return { success: false, reason: 'Non è la fase di pianificazione' };

    const handIndex = this.playerHand.findIndex(c => c.instanceId === cardInstanceId);
    if (handIndex === -1) return { success: false, reason: 'Carta non in mano' };

    const card = this.playerHand[handIndex];
    const sanctuary = this.sanctuaries[sanctuaryIndex];

    // Modificatori del Santuario (es. Forgia Astrale sconta 1 di costo)
    const effectiveCost = Math.max(0, card.cost - (sanctuary.effect.energyDiscount || 0));

    if (this.playerEnergy < effectiveCost) {
      return { success: false, reason: 'Energia insufficiente!' };
    }

    // Controllo slot massimo per santuario (4 carte)
    if (!sacrificeInstanceId && sanctuary.playerCards.length >= 4) {
      return { success: false, reason: 'Santuario al completo (max 4 carte)!' };
    }

    // Gestione Sacrificio stile Inscryption
    if (card.requiresSacrifice && !sacrificeInstanceId) {
      if (sanctuary.playerCards.length === 0) {
        return { success: false, reason: 'Questa carta richiede di sacrificare un alleato presente nel Santuario!' };
      }
    }

    if (sacrificeInstanceId) {
      const sacIdx = sanctuary.playerCards.findIndex(c => c.instanceId === sacrificeInstanceId);
      if (sacIdx !== -1) {
        const sacrificed = sanctuary.playerCards.splice(sacIdx, 1)[0];
        this.playerSouls += (sacrificed.sacrificeValue || 1);
        sound.playSacrifice();
        this.combatLog.push(`💀 Sacrificato ${sacrificed.name} per evocare ${card.name}! (+${sacrificed.sacrificeValue || 1} Anime)`);
        
        // Controllo Level Up Campione Kaelen (se richiede sacrifici)
        this.checkChampionLevelUp('player', 'sacrifice');
      }
    }

    // Scala energia
    this.playerEnergy -= effectiveCost;

    // Rimuovi dalla mano
    this.playerHand.splice(handIndex, 1);

    // Se è un Discover (Hearthstone)
    if (card.isDiscover) {
      sound.playCardSlam();
      this.triggerDiscoverModal();
      this.calculateLiveScores();
      this.notify();
      return { success: true };
    }

    // Gioca nel Santuario
    sanctuary.playerCards.push(card);
    sound.playCardSlam();

    // Aggiorna Level Up di Kaelen (Gioca 2 carte nello stesso santuario)
    if (sanctuary.playerCards.length >= 2) {
      this.checkChampionLevelUp('player', 'play_cluster');
    }

    this.combatLog.push(`Schierato [${card.name}] nel Santuario ${sanctuary.effect.name}`);
    this.calculateLiveScores();
    this.notify();
    return { success: true };
  }

  // Hearthstone Discover: Genera 3 carte uniche a scelta
  triggerDiscoverModal() {
    const choices = [
      { ...ALL_CARDS.find(c => c.id === 'creat_phoenix'), cost: 1, name: 'Fenice Rivelata', edition: EDITIONS.ASTRAL },
      { ...ALL_CARDS.find(c => c.id === 'spell_fury'), cost: 0, name: 'Iper-Prestigio', edition: EDITIONS.POLYCHROME },
      { ...ALL_CARDS.find(c => c.id === 'glyph_mirror'), cost: 0, name: 'Glifo d\'Ombra Assoluto', edition: EDITIONS.FOIL }
    ].map((c, i) => ({ ...c, instanceId: `discover_${i}_${Date.now()}` }));

    if (this.onDiscover) {
      this.onDiscover(choices, (selectedCard) => {
        this.playerHand.push(selectedCard);
        sound.playCardDraw();
        this.combatLog.push(`✨ Rivelazione Astrale: ${selectedCard.name} aggiunta alla mano a costo ridotto!`);
        this.notify();
      });
    }
  }

  // Level Up Campione (Legends of Runeterra)
  checkChampionLevelUp(who, conditionType) {
    const champ = who === 'player' ? this.playerChampion : this.aiChampion;
    if (champ.isLeveledUp) return;

    champ.isLeveledUp = true;
    champ.currentPower = champ.leveledPower;
    champ.mult = champ.leveledMult;
    champ.text = champ.levelUpText;

    sound.playLevelUp();
    this.combatLog.push(`🌟 LEVEL UP! ${champ.name} ha risvegliato il suo Potere Supremo!`);

    if (this.onCutIn) {
      this.onCutIn(champ, who);
    }
  }

  // Calcolo punteggio dinamico in tempo reale con Moltiplicatori Hype Engine
  calculateLiveScores() {
    this.sanctuaries.forEach(sanc => {
      // Calcolo Giocatore
      let basePlayer = sanc.playerCards.reduce((sum, c) => sum + (c.isFacedown ? 0 : c.currentPower), 0);
      let multPlayer = sanc.effect.multBonus || 1.0;
      sanc.playerCards.forEach(c => {
        if (!c.isFacedown && c.mult) multPlayer *= c.mult;
        if (c.edition === EDITIONS.POLYCHROME) multPlayer *= 1.5;
      });
      if (this.playerOvercharged) multPlayer *= 1.25;
      sanc.playerScore = Math.round(basePlayer * multPlayer);

      // Calcolo IA
      let baseAi = sanc.aiCards.reduce((sum, c) => sum + (c.isFacedown ? 0 : c.currentPower), 0);
      let multAi = sanc.effect.multBonus || 1.0;
      sanc.aiCards.forEach(c => {
        if (!c.isFacedown && c.mult) multAi *= c.mult;
        if (c.edition === EDITIONS.POLYCHROME) multAi *= 1.5;
      });
      if (this.aiOvercharged) multAi *= 1.25;
      sanc.aiScore = Math.round(baseAi * multAi);

      // Determinazione chi guida
      if (sanc.playerScore > sanc.aiScore) sanc.winner = 'player';
      else if (sanc.aiScore > sanc.playerScore) sanc.winner = 'ai';
      else sanc.winner = null;
    });
  }

  // Fine turno: Risoluzione IA, Trappole e Combattimento
  endTurn() {
    if (this.phase !== 'PLANNING') return;
    this.phase = 'RESOLVING';
    this.notify();

    // L'IA pianifica e gioca le sue carte
    this.executeAiTurn();

    // Risoluzione Trappole Doganali & Moltiplicatori Hype
    setTimeout(() => {
      this.resolveTrapsAndCombat();
    }, 800);
  }

  // IA Tattica
  executeAiTurn() {
    // Opportunismo Overcharge IA (30% se in vantaggio al turno 4+)
    if (this.turn >= 4 && !this.aiOvercharged && Math.random() < 0.4) {
      this.aiOvercharged = true;
      this.stakes *= 2;
      sound.playOvercharge();
      this.combatLog.push(`⚠️ L'avversario ha chiamato l'OVERCHARGE! Posta raddoppiata a ${this.stakes}x!`);
    }

    // Ordina le carte dell'IA giocabili per valore
    const playable = this.aiHand.filter(c => c.cost <= this.aiEnergy);
    
    playable.forEach(card => {
      if (this.aiEnergy < card.cost) return;

      // Trova il santuario più strategico (dove è in svantaggio o vuoto)
      let targetSanc = this.sanctuaries.slice().sort((a, b) => a.aiCards.length - b.aiCards.length)[0];
      if (targetSanc && targetSanc.aiCards.length < 4) {
        // Sacrificio IA se necessario
        if (card.requiresSacrifice && targetSanc.aiCards.length > 0) {
          targetSanc.aiCards.shift();
          this.aiSouls += 2;
        }

        this.aiEnergy -= card.cost;
        const idx = this.aiHand.indexOf(card);
        if (idx !== -1) this.aiHand.splice(idx, 1);
        targetSanc.aiCards.push(card);
        this.combatLog.push(`L'Avversario ha schierato una carta nel ${targetSanc.effect.name}`);
      }
    });

    this.calculateLiveScores();
  }

  // Risoluzione e reveal trappole
  resolveTrapsAndCombat() {
    this.sanctuaries.forEach(sanc => {
      // Controlla Glifi del giocatore
      sanc.playerCards.forEach(card => {
        if (card.type === CARD_TYPES.GLYPH && card.isFacedown) {
          card.isFacedown = false;
          sound.playTrapReveal();
          this.combatLog.push(`⚡ GLIFO ATTIVATO! [${card.name}] ribalta le sorti del ${sanc.effect.name}!`);
          card.currentPower += 5;
        }
      });

      // Controlla Glifi dell'IA
      sanc.aiCards.forEach(card => {
        if (card.type === CARD_TYPES.GLYPH && card.isFacedown) {
          card.isFacedown = false;
          sound.playTrapReveal();
          this.combatLog.push(`⚠️ TRAPPOLA NEMICA! [${card.name}] attivata nel ${sanc.effect.name}!`);
          card.currentPower += 5;
        }
      });
    });

    this.calculateLiveScores();

    // Fine turno o Fine Partita?
    if (this.turn >= this.maxTurns) {
      this.concludeGame();
    } else {
      this.turn++;
      this.playerMaxEnergy = Math.min(6, this.turn);
      this.playerEnergy = this.playerMaxEnergy;

      this.aiMaxEnergy = Math.min(6, this.turn);
      this.aiEnergy = this.aiMaxEnergy;

      this.drawCard('player');
      this.drawCard('ai');

      this.aiIntent = this.calculateAiIntent();
      this.phase = 'PLANNING';
      this.combatLog.push(`--- Turno ${this.turn}/${this.maxTurns} --- Energia: ${this.playerEnergy}`);
      this.notify();
    }
  }

  // Risoluzione Finale Partita (Gwent / Monster Train: vinci 2 Santuari su 3)
  concludeGame() {
    this.phase = 'GAME_OVER';
    let playerWonCount = 0;
    let aiWonCount = 0;

    this.sanctuaries.forEach(sanc => {
      if (sanc.playerScore > sanc.aiScore) playerWonCount++;
      else if (sanc.aiScore > sanc.playerScore) aiWonCount++;
    });

    let resultText = '';
    if (playerWonCount >= 2) {
      this.winner = 'player';
      resultText = `VITTORIA SOVRANA! Hai conquistato ${playerWonCount} su 3 Santuari! Guadagni +${this.stakes * 100} Punti Gloria!`;
      sound.playVictory();
    } else if (aiWonCount >= 2) {
      this.winner = 'ai';
      resultText = `SCONFITTA! L'avversario ha preso ${aiWonCount} su 3 Santuari.`;
    } else {
      this.winner = 'draw';
      resultText = `PARITÀ ASSOLUTA nei Tre Santuari!`;
    }

    this.combatLog.push(resultText);
    this.notify();
  }

  notify() {
    if (this.onStateChange) {
      this.onStateChange(this);
    }
  }
}
