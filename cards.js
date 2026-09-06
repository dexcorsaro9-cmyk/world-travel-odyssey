// World Travel Odyssey (WTO) - Grande Atlante delle 39 Carte Mondiali
// 12 Nazioni, 4 continenti, materiali autentici, meccaniche culturali ed imprevisti doganali.

export const CARD_TYPES = {
  SOVEREIGN: 'SOVEREIGN',     // Icona Nazionale (Campione con Level-Up)
  DESTINATION: 'DESTINATION', // Città / Meraviglia del Mondo
  EVENT: 'EVENT',             // Volo speciale / Esperienza culturale / Magia rapida
  INCIDENT: 'INCIDENT'        // Imprevisto di viaggio (Trappola coperta a sorpresa)
};

export const MATERIALS = {
  LEATHER: 'leather',       // Pelle toscana cucita a mano (Italia)
  TITANIUM: 'titanium',     // Titanio nero spazzolato & chip (USA)
  ACRYLIC_NEON: 'neon',     // Acrilico High-Tech & Washi (Giappone)
  PAPYRUS: 'papyrus',       // Papiro & Lapislazzuli (Egitto)
  SILK: 'silk',             // Seta Haute-Couture (Francia)
  TWEED: 'tweed',           // Tweed Savile Row & Francobollo (Regno Unito)
  TROPICAL: 'tropical',     // Jacaranda & Piume Sambodromo (Brasile)
  SWISS_STEEL: 'swiss',     // Acciaio satinato & Ingranaggi (Svizzera)
  CYBER_GLASS: 'korea',     // Vetro olografico K-Pop (Corea del Sud)
  VOLCANIC_ICE: 'iceland',  // Ghiaccio & Ossidiana vulcanica (Islanda)
  TERRACOTTA: 'mexico',     // Terracotta & Giada (Messico)
  OPAL: 'australia'         // Opale & Eucalipto (Australia)
};

export const RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary'
};

export const WORLD_DESTINATIONS = [
  { id: 'dest_tokyo', country: 'Giappone', city: 'Tokyo (HND)', desc: 'Puntualità Shinkansen: Costo -1 Miglia e x1.5 Hype.', multBonus: 1.5, energyDiscount: 1, lightColor: 0x00f0ff, icon: '🗼' },
  { id: 'dest_rome', country: 'Italia', city: 'Roma (FCO)', desc: 'Patrimonio UNESCO: I monumenti raddoppiano il Prestigio x2.0.', multBonus: 2.0, sacrificeBonus: 4, lightColor: 0xf59e0b, icon: '🏛️' },
  { id: 'dest_ny', country: 'USA', city: 'New York (JFK)', desc: 'Wall Street: L\'Upgrade raddoppia i guadagni.', multBonus: 1.3, championBuff: true, lightColor: 0x10b981, icon: '🗽' },
  { id: 'dest_paris', country: 'Francia', city: 'Parigi (CDG)', desc: 'Guida Michelin: Le carte Evento aumentano il Prestigio di +3.', multBonus: 1.6, energyDiscount: 0, lightColor: 0xec4899, icon: '🥐' },
  { id: 'dest_cairo', country: 'Egitto', city: 'Il Cairo (CAI)', desc: 'Mistero delle Piramidi: Resurrezione delle carte sacrificate.', multBonus: 1.4, sacrificeBonus: 6, lightColor: 0xeab308, icon: '🏺' }
];

export const ALL_CARDS = [
  // ================= 🇮🇹 ITALIA (Pelle Toscana & Ceralacca) =================
  {
    id: 'card_italy_champ', country: 'Italia', name: 'Leonardo, Maestro Rinascimento', type: CARD_TYPES.SOVEREIGN, cost: 3, power: 5, mult: 1.5,
    material: MATERIALS.LEATHER, materialDesc: 'Pelle Toscana Conciata al Vegetale & Sigillo in Ceralacca', rarity: RARITY.LEGENDARY, airport: 'FCO - Roma',
    image: 'assets/cards/dest_tokyo.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="44" fill="#2d150b" stroke="#f59e0b" stroke-width="2"/><circle cx="50" cy="50" r="18" fill="#b45309" stroke="#fef08a"/><circle cx="50" cy="22" r="5" fill="#ef4444"/></svg>`,
    levelUpReq: 'Visita 2 Città d\'Arte o Gioca 2 carte Meraviglia', isLeveledUp: false, leveledPower: 14, leveledMult: 3.2,
    text: 'Genio Universale: +2 Prestigio a tutte le destinazioni europee.',
    levelUpText: 'RINASCIMENTO TOTALE: Raddoppia i moltiplicatori di tutte le destinazioni mondiali!',
    voiceLine: 'I dettagli fanno la perfezione e la perfezione non è un dettaglio!', soundType: 'espresso'
  },
  {
    id: 'card_italy_colosseum', country: 'Italia', name: 'Colosseo dei Cesari', type: CARD_TYPES.DESTINATION, cost: 2, power: 4, mult: 1.2,
    material: MATERIALS.LEATHER, materialDesc: 'Pelle Toscana Conciata al Vegetale & Sigillo in Ceralacca', rarity: RARITY.RARE, airport: 'FCO - Roma',
    image: 'assets/cards/card_italy_colosseum.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="20" width="70" height="60" rx="8" fill="#451a03" stroke="#f59e0b" stroke-width="2"/><path d="M25 40 Q50 30 75 40 M25 60 Q50 50 75 60" stroke="#fde047" stroke-width="2" fill="none"/></svg>`,
    text: 'Meraviglia Eterna: Riduce di 3 il potere avversario in questa destinazione.', soundType: 'stamp'
  },
  {
    id: 'card_italy_espresso', country: 'Italia', name: 'Espresso Napoletano Doc', type: CARD_TYPES.EVENT, cost: 1, power: 2, mult: 1.5,
    material: MATERIALS.LEATHER, materialDesc: 'Pelle Toscana Conciata al Vegetale & Sigillo in Ceralacca', rarity: RARITY.COMMON, airport: 'NAP - Napoli',
    image: 'assets/cards/card_italy_espresso.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="55" r="30" fill="#3e1c08"/><ellipse cx="50" cy="40" rx="20" ry="12" fill="#78350f"/><path d="M70 45 Q85 50 70 65" stroke="#f59e0b" stroke-width="3" fill="none"/></svg>`,
    text: 'Scossa d\'Energia: Ricarica 1 Miglia Aerea immediata.', soundType: 'espresso'
  },

  // ================= 🇯🇵 GIAPPONE (Acrilico High-Tech & Neon) =================
  {
    id: 'card_japan_champ', country: 'Giappone', name: 'Kenji, Cyber-Samurai', type: CARD_TYPES.SOVEREIGN, cost: 4, power: 6, mult: 2.0,
    material: MATERIALS.ACRYLIC_NEON, materialDesc: 'Acrilico High-Tech Neon & Carta Washi Incastonata', rarity: RARITY.LEGENDARY, airport: 'HND - Tokyo',
    image: 'assets/cards/card_japan_champ.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#0d1117" stroke="#00f0ff" stroke-width="2"/><polygon points="50,15 62,48 92,50 68,68 76,96 50,78 24,96 32,68 8,50 38,48" fill="#00f0ff" opacity="0.8"/><circle cx="50" cy="50" r="10" fill="#ff0055"/></svg>`,
    levelUpReq: 'Attiva 2 combo ad alta velocità o raggiungi 100 Hype', isLeveledUp: false, leveledPower: 16, leveledMult: 3.5,
    text: 'Puntualità Assoluta: Immune a scioperi e ritardi.',
    levelUpText: 'LINEA SHINKANSEN: Ruba 5 Miglia e congela il prossimo turno nemico.',
    voiceLine: 'Il treno non aspetta, e neppure la mia katana.', soundType: 'tokyo'
  },
  {
    id: 'card_japan_fuji', country: 'Giappone', name: 'Santuario del Monte Fuji', type: CARD_TYPES.DESTINATION, cost: 3, power: 7, mult: 1.8,
    material: MATERIALS.ACRYLIC_NEON, materialDesc: 'Acrilico High-Tech Neon & Carta Washi Incastonata', rarity: RARITY.EPIC, airport: 'HND - Tokyo',
    image: 'assets/cards/card_japan_fuji.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#1e1b4b" stroke="#ec4899" stroke-width="2"/><polygon points="50,20 20,80 80,80" fill="#312e81"/><polygon points="50,20 40,40 60,40" fill="#ffffff"/></svg>`,
    text: 'Hype Turistico: Moltiplica x1.8 il punteggio finale della destinazione.', soundType: 'tokyo'
  },
  {
    id: 'card_japan_shinkansen', country: 'Giappone', name: 'Treno Maglev Shinkansen', type: CARD_TYPES.EVENT, cost: 2, power: 4, mult: 1.4,
    material: MATERIALS.ACRYLIC_NEON, materialDesc: 'Acrilico High-Tech Neon & Carta Washi Incastonata', rarity: RARITY.RARE, airport: 'NRT - Tokyo',
    image: 'assets/cards/card_japan_shinkansen.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="35" width="70" height="30" rx="12" fill="#0284c7"/><line x1="20" y1="50" x2="80" y2="50" stroke="#fff" stroke-width="3"/></svg>`,
    text: 'Velocità Istantanea: Sposta una carta da una corsia all\'altra.', soundType: 'tokyo'
  },

  // ================= 🇺🇸 STATI UNITI (Titanio Nero & Chip) =================
  {
    id: 'card_usa_champ', country: 'USA', name: 'Il Magnate di Wall Street', type: CARD_TYPES.SOVEREIGN, cost: 4, power: 6, mult: 1.8,
    material: MATERIALS.TITANIUM, materialDesc: 'Titanio Nero Spazzolato Opaco & Chip EMV 24k', rarity: RARITY.LEGENDARY, airport: 'JFK - New York',
    image: 'assets/cards/card_usa_champ.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="10" fill="#09090b" stroke="#10b981" stroke-width="2"/><circle cx="50" cy="45" r="16" fill="#15803d"/><text x="50" y="52" font-size="20" fill="#fff" text-anchor="middle">$</text></svg>`,
    levelUpReq: 'Attiva l\'Overcharge First Class con successo', isLeveledUp: false, leveledPower: 15, leveledMult: 3.4,
    text: 'Capitale di Rischio: Ogni Overcharge aggiunge +5 Potere.',
    levelUpText: 'BOOM ECONOMICO: Raddoppia all\'istante tutte le scommesse!',
    voiceLine: 'Il denaro non dorme mai, e neppure New York.', soundType: 'cash'
  },
  {
    id: 'card_usa_wallstreet', country: 'USA', name: 'Il Toro di Wall Street', type: CARD_TYPES.DESTINATION, cost: 3, power: 8, mult: 1.5,
    material: MATERIALS.TITANIUM, materialDesc: 'Titanio Nero Spazzolato Opaco & Chip EMV 24k', rarity: RARITY.EPIC, airport: 'JFK - New York',
    image: 'assets/cards/card_usa_wallstreet.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="12" y="15" width="76" height="70" rx="10" fill="#09090b" stroke="#10b981" stroke-width="2"/><path d="M25 60 Q40 30 75 50 Q60 70 25 60 Z" fill="#b45309"/></svg>`,
    text: 'Capitale Finanziario: L\'Upgrade 1st Class conferisce +4 Potere immediato.', soundType: 'cash'
  },
  {
    id: 'card_usa_broadway', country: 'USA', name: 'Premio Musical Broadway', type: CARD_TYPES.EVENT, cost: 2, power: 3, mult: 2.0,
    material: MATERIALS.TITANIUM, materialDesc: 'Titanio Nero Spazzolato Opaco & Chip EMV 24k', rarity: RARITY.RARE, airport: 'JFK - New York',
    image: 'assets/cards/card_usa_broadway.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="12" fill="#1c1917" stroke="#fbbf24" stroke-width="2"/><text x="50" y="58" font-size="28" font-weight="900" fill="#facc15" text-anchor="middle">SHOW</text></svg>`,
    text: 'Showmanship: Raddoppia x2 il moltiplicatore in questa città.', soundType: 'cash'
  },

  // ================= 🇫🇷 FRANCIA (Seta Haute-Couture & Champagne) =================
  {
    id: 'card_france_champ', country: 'Francia', name: 'Chef Pierre, 3 Stelle Michelin', type: CARD_TYPES.SOVEREIGN, cost: 3, power: 4, mult: 2.2,
    material: MATERIALS.SILK, materialDesc: 'Seta Haute-Couture Blu Navy & Ricami Fleur-de-Lis Dorati', rarity: RARITY.LEGENDARY, airport: 'CDG - Parigi',
    image: 'assets/cards/card_france_champ.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#1e1b4b" stroke="#f43f5e" stroke-width="2"/><polygon points="50,15 60,38 85,38 65,54 72,78 50,62 28,78 35,54 15,38 40,38" fill="#fbbf24"/></svg>`,
    levelUpReq: 'Gioca 2 carte Gourmet o Eventi in corsia', isLeveledUp: false, leveledPower: 12, leveledMult: 4.0,
    text: 'Haute Cuisine: +1 Moltiplicatore a tutte le carte nella corsia.',
    levelUpText: 'STELLA MICHELIN SUPREMA: Moltiplica x4.0 il punteggio di Parigi!',
    voiceLine: 'La cucina è arte, eleganza e perfezione assoluta!', soundType: 'chime'
  },
  {
    id: 'card_france_eiffel', country: 'Francia', name: 'Tour Eiffel & Luci di Notte', type: CARD_TYPES.DESTINATION, cost: 3, power: 6, mult: 1.7,
    material: MATERIALS.SILK, materialDesc: 'Seta Haute-Couture Blu Navy & Ricami Fleur-de-Lis Dorati', rarity: RARITY.EPIC, airport: 'CDG - Parigi',
    image: 'assets/cards/card_france_eiffel.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="10" fill="#1e1b4b" stroke="#ec4899" stroke-width="2"/><polygon points="50,20 40,80 60,80" fill="#fb7185"/><circle cx="50" cy="20" r="4" fill="#facc15"/></svg>`,
    text: 'Simbolo dei Romantici: Aumenta del 50% il prestigio di tutte le carte europee.', soundType: 'chime'
  },
  {
    id: 'card_france_champagne', country: 'Francia', name: 'Calice di Champagne Millesimato', type: CARD_TYPES.EVENT, cost: 1, power: 2, mult: 1.5,
    material: MATERIALS.SILK, materialDesc: 'Seta Haute-Couture Blu Navy & Ricami Fleur-de-Lis Dorati', rarity: RARITY.COMMON, airport: 'ORY - Parigi',
    image: 'assets/cards/card_france_champagne.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="40" fill="#450a0a" stroke="#fef08a"/><path d="M40 30 L60 30 L55 60 L50 75 L45 60 Z" fill="#facc15"/></svg>`,
    text: 'Brindisi VIP: Rimuove tutti gli effetti negativi dagli alleati.', soundType: 'chime'
  },

  // ================= 🇬🇧 REGNO UNITO (Tweed Savile Row & MI6) =================
  {
    id: 'card_uk_agent', country: 'Regno Unito', name: 'Agente 00-Savile (MI6)', type: CARD_TYPES.SOVEREIGN, cost: 4, power: 7, mult: 1.6,
    material: MATERIALS.TWEED, materialDesc: 'Tweed Savile Row & Filigrana MI6 Dorata', rarity: RARITY.LEGENDARY, airport: 'LHR - Londra',
    image: 'assets/cards/card_uk_agent.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="2"/><circle cx="50" cy="45" r="14" fill="#042f2e"/><line x1="20" y1="50" x2="80" y2="50" stroke="#10b981" stroke-width="2"/></svg>`,
    levelUpReq: 'Rivela 1 carta avversaria o attiva 1 imprevisto segreto', isLeveledUp: false, leveledPower: 15, leveledMult: 3.2,
    text: 'Licenza di Spionaggio: Rivela tutte le carte nella mano nemica.',
    levelUpText: 'MISSIONE COMPIUTA: Neutralizza la carta nemica più forte in campo.',
    voiceLine: 'Agitato, non mescolato.', soundType: 'chime'
  },
  {
    id: 'card_uk_bigben', country: 'Regno Unito', name: 'Torre del Big Ben', type: CARD_TYPES.DESTINATION, cost: 2, power: 5, mult: 1.2,
    material: MATERIALS.TWEED, materialDesc: 'Tweed Savile Row & Filigrana MI6 Dorata', rarity: RARITY.RARE, airport: 'LHR - Londra',
    image: 'assets/cards/card_uk_bigben.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="30" y="15" width="40" height="70" fill="#1f2937" stroke="#fbbf24" stroke-width="2"/><circle cx="50" cy="35" r="10" fill="#fef08a"/></svg>`,
    text: 'Rintocco Preciso: Aggiunge +1 Miglia Aerea permanente al tuo turno.', soundType: 'chime'
  },

  // ================= 🇧🇷 BRASILE (Jacaranda & Piume Sambodromo) =================
  {
    id: 'card_brazil_samba', country: 'Brasile', name: 'Regina della Samba', type: CARD_TYPES.SOVEREIGN, cost: 3, power: 5, mult: 2.0,
    material: MATERIALS.TROPICAL, materialDesc: 'Legno Jacaranda Tropicale Pregiato & Piume Sambodromo', rarity: RARITY.LEGENDARY, airport: 'GIG - Rio',
    image: 'assets/cards/card_brazil_samba.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#064e3b" stroke="#fbbf24" stroke-width="2"/><path d="M50 20 Q30 50 50 80 Q70 50 50 20 Z" fill="#10b981"/><circle cx="50" cy="50" r="10" fill="#facc15"/></svg>`,
    levelUpReq: 'Raggiungi una differenza punteggio di +15 in una destinazione', isLeveledUp: false, leveledPower: 14, leveledMult: 3.8,
    text: 'Festa Irrefrenabile: Annulla tutti gli imprevisti doganali nemici.',
    levelUpText: 'CARNEVALE DI RIO: Moltiplica x3.8 e costringe l\'avversario a passare il turno!',
    voiceLine: 'Il ritmo del Brasile scorre nelle vene del mondo!', soundType: 'chime'
  },
  {
    id: 'card_brazil_corcovado', country: 'Brasile', name: 'Cristo Redentore del Corcovado', type: CARD_TYPES.DESTINATION, cost: 4, power: 9, mult: 1.5,
    material: MATERIALS.TROPICAL, materialDesc: 'Legno Jacaranda Tropicale Pregiato & Piume Sambodromo', rarity: RARITY.EPIC, airport: 'GIG - Rio',
    image: 'assets/cards/card_brazil_corcovado.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#042f2e" stroke="#2dd4bf" stroke-width="2"/><line x1="50" y1="25" x2="50" y2="75" stroke="#fff" stroke-width="4"/><line x1="30" y1="40" x2="70" y2="40" stroke="#fff" stroke-width="4"/></svg>`,
    text: 'Benedizione Tropicale: Protegge tutte le carte adiacenti dalla distruzione.', soundType: 'chime'
  },

  // ================= 🇨🇭 SVIZZERA (Acciaio Satinato & Orologeria) =================
  {
    id: 'card_swiss_banker', country: 'Svizzera', name: 'Banchiere Privato di Zurigo', type: CARD_TYPES.SOVEREIGN, cost: 4, power: 6, mult: 1.5,
    material: MATERIALS.SWISS_STEEL, materialDesc: 'Acciaio Inox Spazzolato Satinato & Tourbillon Meccanico a Vista', rarity: RARITY.LEGENDARY, airport: 'ZRH - Zurigo',
    image: 'assets/cards/card_swiss_banker.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="8" fill="#18181b" stroke="#e4e4e7" stroke-width="2"/><circle cx="50" cy="50" r="22" fill="#27272a" stroke="#fff" stroke-dasharray="3 3"/></svg>`,
    levelUpReq: 'Accumula 4 o più Miglia Aeree inutilizzate a fine turno', isLeveledUp: false, leveledPower: 15, leveledMult: 3.0,
    text: 'Neutralità Assoluta: Non può essere bersagliato da imprevisti o sanzioni.',
    levelUpText: 'CASSETTA DI SICUREZZA CAYMAN: Ruba 3 Miglia per ogni turno rimanente.',
    voiceLine: 'La discrezione e la precisione sono il nostro marchio di fabbrica.', soundType: 'cash'
  },
  {
    id: 'card_swiss_train', country: 'Svizzera', name: 'Bernina Express Panoramico', type: CARD_TYPES.DESTINATION, cost: 2, power: 4, mult: 1.3,
    material: MATERIALS.SWISS_STEEL, materialDesc: 'Acciaio Inox Spazzolato Satinato & Tourbillon Meccanico a Vista', rarity: RARITY.RARE, airport: 'GVA - Ginevra',
    image: 'assets/cards/card_swiss_train.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="30" width="70" height="40" rx="6" fill="#b91c1c" stroke="#fff" stroke-width="2"/><line x1="20" y1="50" x2="80" y2="50" stroke="#fff" stroke-width="2"/></svg>`,
    text: 'Precisione Svizzera: Conferisce +1 Potere a tutte le destinazioni montane.', soundType: 'stamp'
  },

  // ================= 🇪🇬 EGITTO (Papiro d'Oro & Lapislazzuli) =================
  {
    id: 'card_egypt_cleopatra', country: 'Egitto', name: 'Cleopatra, Sovrana del Nilo', type: CARD_TYPES.SOVEREIGN, cost: 4, power: 7, mult: 2.0,
    material: MATERIALS.PAPYRUS, materialDesc: 'Papiro d\'Oro Antico Goffrato & Bordo in Lapislazzuli', rarity: RARITY.LEGENDARY, airport: 'CAI - Il Cairo',
    image: 'assets/cards/card_egypt_cleopatra.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="14" fill="#422006" stroke="#ca8a04" stroke-width="3"/><circle cx="50" cy="45" r="14" fill="#ca8a04"/><polygon points="50,15 35,45 65,45" fill="#facc15"/></svg>`,
    levelUpReq: 'Sacrifica 1 unità per le Piramidi o gioca un reperto antico', isLeveledUp: false, leveledPower: 16, leveledMult: 3.6,
    text: 'Fascino dei Faraoni: Ruba il controllo dell\'unità nemica più debole.',
    levelUpText: 'IMPERO DEL NILO: Raddoppia all\'istante il potere di tutte le meraviglie!',
    voiceLine: 'I regni cadono, ma l\'Egitto e la mia corona sono eterni.', soundType: 'stamp'
  },
  {
    id: 'card_egypt_pyramids', country: 'Egitto', name: 'Piramidi di Giza', type: CARD_TYPES.DESTINATION, cost: 5, power: 15, mult: 2.0,
    material: MATERIALS.PAPYRUS, materialDesc: 'Papiro d\'Oro Antico Goffrato & Bordo in Lapislazzuli', rarity: RARITY.EPIC, airport: 'CAI - Il Cairo', requiresSacrifice: true,
    image: 'assets/cards/card_egypt_pyramids.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="10" y="10" width="80" height="80" rx="14" fill="#422006" stroke="#ca8a04" stroke-width="3"/><polygon points="50,20 20,75 80,75" fill="#ca8a04"/><polygon points="50,20 50,75 80,75" fill="#a16207"/></svg>`,
    text: 'Monumento Millenario (Inscryption): Sacrifica 1 volo charter per sbloccare la Meraviglia.', soundType: 'stamp'
  },

  // ================= 🇰🇷 COREA DEL SUD (Cyber-Glass K-Pop) =================
  {
    id: 'card_korea_kpop', country: 'Corea del Sud', name: 'Idol K-Pop Mondiale', type: CARD_TYPES.SOVEREIGN, cost: 3, power: 4, mult: 2.5,
    material: MATERIALS.CYBER_GLASS, materialDesc: 'Vetro Smart Olografico Multicolore & Circuiti Cyber K-Pop', rarity: RARITY.LEGENDARY, airport: 'ICN - Seul',
    image: 'assets/cards/card_korea_kpop.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#030712" stroke="#ec4899" stroke-width="2"/><polygon points="50,15 65,50 50,85 35,50" fill="#a855f7"/></svg>`,
    levelUpReq: 'Raggiungi 200 Hype virale nei terminal asiatici', isLeveledUp: false, leveledPower: 12, leveledMult: 5.0,
    text: 'Trend Globale: Guadagna +1 Mult ogni volta che una carta viene giocata.',
    levelUpText: 'MEGA HIT BILLBOARD: Moltiplicatore x5.0 esponenziale a catena!',
    voiceLine: 'Siete pronti a cantare con me in tutto il mondo?', soundType: 'tokyo'
  },
  {
    id: 'card_korea_tower', country: 'Corea del Sud', name: 'Torre N Seoul & Myeongdong', type: CARD_TYPES.DESTINATION, cost: 2, power: 5, mult: 1.3,
    material: MATERIALS.CYBER_GLASS, materialDesc: 'Vetro Smart Olografico Multicolore & Circuiti Cyber K-Pop', rarity: RARITY.RARE, airport: 'ICN - Seul',
    image: 'assets/cards/card_korea_tower.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="8" fill="#0f172a" stroke="#06b6d4"/><line x1="50" y1="20" x2="50" y2="80" stroke="#06b6d4" stroke-width="3"/></svg>`,
    text: 'Connettività 6G: Pescate 1 carta aggiuntiva quando atterrate qui.', soundType: 'tokyo'
  },

  // ================= 🇮🇸 ISLANDA (Ghiaccio Vulcanico & Ossidiana) =================
  {
    id: 'card_iceland_geysir', country: 'Islanda', name: 'Geysir di Strokkur', type: CARD_TYPES.DESTINATION, cost: 3, power: 6, mult: 1.6,
    material: MATERIALS.VOLCANIC_ICE, materialDesc: 'Ossidiana Vulcanica & Ghiaccio Glaciale Luminescente', rarity: RARITY.EPIC, airport: 'KEF - Reykjavik',
    image: 'assets/cards/card_iceland_geysir.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#082f49" stroke="#38bdf8" stroke-width="2"/><polygon points="50,15 40,75 60,75" fill="#7dd3fc"/></svg>`,
    text: 'Eruzione Geotermica: Congela la corsia nemica per 1 turno.', soundType: 'stamp'
  },

  // ================= 🇲🇽 MESSICO (Terracotta & Giada Maya) =================
  {
    id: 'card_mexico_chichen', country: 'Messico', name: 'Piramide di Chichén Itzá', type: CARD_TYPES.DESTINATION, cost: 4, power: 9, mult: 1.5,
    material: MATERIALS.TERRACOTTA, materialDesc: 'Terracotta Maya Incisa & Giada Verde Imperiale', rarity: RARITY.EPIC, airport: 'CUN - Cancún',
    image: 'assets/cards/card_mexico_chichen.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" fill="#7c2d12" stroke="#fbbf24" stroke-width="2"/><polygon points="50,25 25,75 75,75" fill="#b45309"/></svg>`,
    text: 'Equinozio del Serpente Piumato: Aggiunge +3 a tutti i monumenti storici.', soundType: 'stamp'
  },

  // ================= 🇦🇺 AUSTRALIA (Opale & Barriera Corallina) =================
  {
    id: 'card_australia_reef', country: 'Australia', name: 'Grande Barriera Corallina', type: CARD_TYPES.DESTINATION, cost: 3, power: 7, mult: 1.7,
    material: MATERIALS.OPAL, materialDesc: 'Opale Fiammeggiante d\'Oceania & Eucalipto Australiano', rarity: RARITY.EPIC, airport: 'CNS - Cairns',
    image: 'assets/cards/card_australia_reef.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#042f2e" stroke="#2dd4bf" stroke-width="2"/><circle cx="40" cy="40" r="8" fill="#f43f5e"/><circle cx="60" cy="55" r="10" fill="#fbbf24"/></svg>`,
    text: 'Biodiversità Marina: Cura di 5 punti la tua Valigia a fine turno.', soundType: 'chime'
  },

  // ================= ⚠️ IMPREVISTI DOGANALI (Trappole Coperte Yu-Gi-Oh) =================
  {
    id: 'trap_visa_denied', country: 'Dogana Internazionale', name: 'Visto Negato alla Frontiera', type: CARD_TYPES.INCIDENT, cost: 1, power: 1, mult: 1.0,
    material: MATERIALS.LEATHER, materialDesc: 'Documento Doganale d\'Emergenza & Ceralacca Rossa', rarity: RARITY.COMMON, airport: 'IMMIGRATION', isFacedown: true,
    image: 'assets/cards/trap_visa_denied.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#450a0a" stroke="#ef4444" stroke-width="2"/><text x="50" y="62" font-size="34" font-weight="900" fill="#ef4444" text-anchor="middle">❌</text></svg>`,
    text: 'Imprevisto (Trappola Coperta): Respinge la prima carta avversaria con costo >=3 a 0 potere.', soundType: 'stamp'
  },
  {
    id: 'trap_strike', country: 'Compagnia Aerea', name: 'Sciopero Generale dei Trasporti', type: CARD_TYPES.INCIDENT, cost: 2, power: 0, mult: 2.2,
    material: MATERIALS.TITANIUM, materialDesc: 'Display Partenze Sciopero & Titanio Oscurato', rarity: RARITY.RARE, airport: 'CONTROL TOWER', isFacedown: true,
    image: 'assets/cards/trap_strike.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="10" fill="#18181b" stroke="#f59e0b" stroke-width="2"/><text x="50" y="58" font-size="28" font-weight="900" fill="#facc15" text-anchor="middle">DELAY</text></svg>`,
    text: 'Imprevisto: Quando l\'avversario attiva l\'Overcharge, annulla il suo bonus e raddoppia il TUO Hype.', soundType: 'chime'
  },
  {
    id: 'trap_lost_luggage', country: 'Terminal Smistamento', name: 'Bagaglio Smarrito a Malpensa', type: CARD_TYPES.INCIDENT, cost: 1, power: 0, mult: 1.8,
    material: MATERIALS.LEATHER, materialDesc: 'Etichetta Bagaglio Smarrito & Cuoio Graffiato', rarity: RARITY.COMMON, airport: 'MXP - Milano', isFacedown: true,
    image: 'assets/cards/trap_lost_luggage.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="20" y="30" width="60" height="40" rx="8" fill="#3f3f46" stroke="#ef4444" stroke-width="2"/><text x="50" y="55" font-size="16" fill="#fff" text-anchor="middle">LOST</text></svg>`,
    text: 'Imprevisto: Fa scartare 1 carta a caso dalla mano dell\'avversario.', soundType: 'stamp'
  },

  // ================= ✈️ VOLI SPECIALI & DISCOVER =================
  {
    id: 'spell_lastminute', country: 'Club Viaggiatori', name: 'Scalo Last-Minute', type: CARD_TYPES.EVENT, cost: 1, power: 0, mult: 1.0,
    material: MATERIALS.ACRYLIC_NEON, materialDesc: 'Carta Boarding Pass Digitale Olografica', rarity: RARITY.COMMON, airport: 'WORLD GATE',
    image: 'assets/cards/spell_lastminute.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="42" fill="#042f2e" stroke="#14b8a6" stroke-width="2"/><path d="M50 20 L58 42 L80 50 L58 58 L50 80 L42 58 L20 50 L42 42 Z" fill="#2dd4bf"/></svg>`,
    text: 'Scoperta (Discover Hearthstone): Scegli 1 destinazione o passaporto esotico tra 3 offerte dalla compagnia.', isDiscover: true, soundType: 'chime'
  },
  {
    id: 'spell_diplomatic_pass', country: 'Ambasciata Globale', name: 'Passaporto Diplomatico VIP', type: CARD_TYPES.EVENT, cost: 2, power: 3, mult: 1.5,
    material: MATERIALS.LEATHER, materialDesc: 'Passaporto Diplomatico in Pelle Blu & Lettere d\'Oro 24k', rarity: RARITY.EPIC, airport: 'DIPLOMATIC CORPS',
    image: 'assets/cards/spell_diplomatic_pass.jpg',
    artSvg: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="10" fill="#1e1b4b" stroke="#facc15" stroke-width="2"/><text x="50" y="58" font-size="20" font-weight="900" fill="#facc15" text-anchor="middle">VIP</text></svg>`,
    text: 'Immunità Totale: Protegge tutte le tue carte dagli imprevisti avversari per il turno.', soundType: 'stamp'
  }
];
