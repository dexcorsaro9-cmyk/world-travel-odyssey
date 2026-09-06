# DIRECTIVE: AAA MOBILE GAME VISUAL QUALITY STANDARD
**World Travel Odyssey (WTO)**
**Stato**: ATTIVA & OBBLIGATORIA (Regola Permanente di Progetto)

Tutti gli asset grafici realizzati o modificati per questo progetto DEVONO obbligatoriamente rispettare lo standard estetico e qualitativo di un **gioco Tripla A (AAA) mobile** di fascia altissima (benchmark di riferimento: *Blizzard Hearthstone*, *Marvel Snap*, *Riot Legends of Runeterra*, *Genshin Impact*, *Civilization VI Mobile*).

---

## 1. Zero Grafica Amatoriale o Placeholder
- È formalmente vietato l'uso di forme vettoriali piatte a tinta unita senza profondità, icone generiche a clip-art, font di sistema non stilizzati o sfondi scuri anonimi.
- Nessun asset grafico temporaneo o a bassa risoluzione può essere rilasciato come definitivo.

## 2. Risoluzione & Supporto Retina High-DPI
- **Master Asset**: Risoluzione minima 2x/3x/4x retina (es. min. 2048×1200 o 2400×1500 per loghi e splash, 1024×1024 per icone app, 600×900 per le carte).
- **Inquadratura & Bounding Box**: I master grafici devono essere ritagliati accuratamente sui bordi attivi dell'opera (zero margini vuoti o padding trasparente sprecato che rimpicciolisca l'elemento sui display smartphone).
- **Formati Lossless**: Esportazione in PNG ad alta fedeltà o JPEG a compressione visivamente indistinguibile (qualità ≥ 0.92).

## 3. Materialità, Luce & Shading 3D Volumetrico
- **Materiali Realistici**: Finiture in oro massiccio 24k, titanio satinato, cristallo di zaffiro, cuoio martellato, platino lucido, pergamena antica e fibra di carbonio.
- **Illuminazione Cinematica**: Ogni elemento deve presentare luce chiave direzionale, luce radente di contorno (rim light), riflessi speculari diamantati (lens flares ad 8 punte, bagliori anamorfici) e occlusione ambientale profonda (ambient occlusion).
- **Tipografia Scultorea**: Testi dei loghi e dei titoli scolpiti in 3D con sfaccettature cesellate a V (chiseled bevels), bisellatura metallica e ombre portate a più livelli.

## 4. Unicità Assoluta per Carte, Luoghi e Lore
- **Ogni Carta è Unica**: Ciascuna delle 39 carte del gioco possiede un'opera d'arte originale e dedicata, con color grading e atmosfera specifica per nazione e tema (zero immagini condivise).
- **Integrazione Grafica Valori**: I valori di costo, moltiplicatore e nazione non devono mai sembrare "incollati" sopra la carta, ma integrati come sigilli metallici, targhette in titanio e placche consolari fuse nell'illustrazione.
- **Lore sul Retro**: Il retro della carta deve essere un dossier consolare di lusso con timbri d'immigrazione, passaporto e cenni storici dettagliati.

## 5. Pipeline di Rendering Tripla A
- Qualora le API di generazione esterne siano soggette a limiti di quota, il rendering deve essere eseguito tramite la pipeline interna in headless Chrome con Canvas 2D/3D WebGL a passaggi multipli (color grading, vignettatura radiale, soft-light overlay, particelle e lens flare).

## 6. Identità WTO Autonoma
- Nessun riferimento diretto o indiretto a Balatro o altri titoli deve apparire nel codice, nella UI o nei testi. World Travel Odyssey ha un'identità autonoma originale basata sui viaggi mondiali, visti, miglia aeree e meraviglie del pianeta.
