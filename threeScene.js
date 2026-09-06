// AetherClash: Sovereign - Three.js 3D WebGL Battlefield Engine
// Tavolo in vero 3D, altari fluttuanti, mesh delle carte con spessore fisico, luci dinamiche e ombre.

export class ThreeBattlefield {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sanctuaryPlinths = [];
    this.cardMeshes = new Map(); // instanceId -> THREE.Group
    this.pointLights = [];
    this.starfield = null;
    this.clock = null;
    this.animId = null;

    // Controllo parallasse al movimento mouse/touch
    this.targetCameraX = 0;
    this.targetCameraY = 16;
    this.targetCameraZ = 15;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js non ancora caricato.');
      return;
    }

    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 700;

    // 1. SCENA & CLOCK
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x08090d, 0.025);
    this.clock = new THREE.Clock();

    // 2. CAMERA PROSPETTICA
    this.camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    this.camera.position.set(0, 16, 15);
    this.camera.lookAt(0, 0, -1);

    // 3. RENDERER WEBGL CON OMBRE
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. ILLUMINAZIONE 3D DINAMICA
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.001;
    this.scene.add(sunLight);

    // 5. STARFIELD COSMICO
    this.createCosmicStarfield();

    // 6. I TRE SANTUARI FLUTTUANTI (ALTARI 3D)
    this.createSanctuaryAltars();

    // 7. EVENTI RESIZE & PARALLASSE
    window.addEventListener('resize', () => this.onResize());
    this.container.addEventListener('mousemove', (e) => this.onPointerMove(e));
    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) this.onPointerMove(e.touches[0]);
    }, { passive: true });

    this.animate();
  }

  createCosmicStarfield() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const posArray = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 50;
      posArray[i + 1] = Math.random() * 30 - 5;
      posArray[i + 2] = (Math.random() - 0.5) * 50;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.8
    });

    this.starfield = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starfield);
  }

  createSanctuaryAltars() {
    const altarColors = [0xf97316, 0xa855f7, 0x00f0ff]; // Forgia, Cripta, Nexus
    const spacingX = 4.2;

    for (let i = 0; i < 3; i++) {
      const group = new THREE.Group();
      group.position.set((i - 1) * spacingX, 0, -1.5);

      // Basamento in pietra runica 3D (con smusso e ombra)
      const baseGeo = new THREE.BoxGeometry(3.6, 0.4, 7.8);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x131722,
        roughness: 0.6,
        metalness: 0.3
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.receiveShadow = true;
      group.add(baseMesh);

      // Bordo runico luminoso attorno al santuario
      const edgeGeo = new THREE.BoxGeometry(3.7, 0.08, 7.9);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: altarColors[i],
        emissive: altarColors[i],
        emissiveIntensity: 0.5,
        roughness: 0.2
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.y = 0.22;
      group.add(edgeMesh);

      // Cristallo di Potenza Fluttuante al Centro (Balatro Score Core)
      const crystalGeo = new THREE.OctahedronGeometry(0.35, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: altarColors[i],
        emissive: altarColors[i],
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.9
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalMesh.position.set(0, 1.2, 0);
      crystalMesh.castShadow = true;
      group.add(crystalMesh);

      // Luce PointLight dinamica dedicata all'altare
      const pLight = new THREE.PointLight(altarColors[i], 1.2, 8);
      pLight.position.set(0, 2.0, 0);
      group.add(pLight);
      this.pointLights.push(pLight);

      this.scene.add(group);
      this.sanctuaryPlinths.push({ group, crystal: crystalMesh, baseLight: pLight, baseY: 0 });
    }
  }

  // Genera la Texture Frontale Canvas ad Alta Definizione per la carta 3D
  createCardTexture(card) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Sfondo carta dark obsidian
    ctx.fillStyle = '#11141e';
    ctx.fillRect(0, 0, 512, 768);

    // Bordo interno decorato
    ctx.strokeStyle = card.edition === 'polychrome' ? '#f43f5e' : (card.edition === 'foil' ? '#ffd700' : '#38bdf8');
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 492, 748);

    // Header Costo ed Energia
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(60, 60, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${card.cost}`, 60, 74);

    // Cerchio Potere
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.arc(452, 60, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${card.currentPower || card.power}`, 452, 74);

    // Titolo
    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 32px sans-serif';
    ctx.fillText(card.name, 256, 120);

    // Rettangolo illustrazione centrale
    ctx.fillStyle = '#07090e';
    ctx.fillRect(40, 150, 432, 400);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 150, 432, 400);

    // Effetto disegno stilizzato
    ctx.fillStyle = card.artColor || '#38bdf8';
    ctx.beginPath();
    ctx.arc(256, 350, 120, 0, Math.PI * 2);
    ctx.fill();

    // Descrizione abilità
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    const words = (card.text || '').split(' ');
    let line = '';
    let y = 600;
    for (let w of words) {
      if ((line + w).length > 30) {
        ctx.fillText(line, 256, y);
        line = w + ' ';
        y += 30;
      } else {
        line += w + ' ';
      }
    }
    ctx.fillText(line, 256, y);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Crea una Mesh 3D della carta con spessore reale e bordi metallici
  spawnCard3D(card, position, isEnemy = false) {
    const cardWidth = 1.35;
    const cardThickness = 0.04;
    const cardHeight = 2.0;

    const cardGeo = new THREE.BoxGeometry(cardWidth, cardThickness, cardHeight);
    const frontTex = this.createCardTexture(card);

    // Materiale frontale e bordi dorati
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }), // Destra
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }), // Sinistra
      new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.3, metalness: 0.1 }),    // Faccia superiore (Front)
      new THREE.MeshStandardMaterial({ color: 0x0a0d14, roughness: 0.5, metalness: 0.4 }), // Faccia inferiore (Back)
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }), // Sopra
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 })  // Sotto
    ];

    const cardMesh = new THREE.Mesh(cardGeo, materials);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;

    const group = new THREE.Group();
    group.add(cardMesh);
    group.position.copy(position);

    // Animazione di schieramento parabolica 3D
    group.position.y += 4;
    const targetY = position.y + 0.25;

    const startTime = performance.now();
    const animateDrop = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / 0.35);
      // Interpolazione elastica con impatto
      group.position.y = targetY + (1 - progress) * 3;
      if (progress < 1) {
        requestAnimationFrame(animateDrop);
      } else {
        group.position.y = targetY;
      }
    };
    requestAnimationFrame(animateDrop);

    this.scene.add(group);
    this.cardMeshes.set(card.instanceId, group);
    return group;
  }

  // Risoluzione Balatro in 3D: La carta si solleva e pulsa
  animateCardScoring(instanceId, multVal) {
    const group = this.cardMeshes.get(instanceId);
    if (!group) return;

    const startY = group.position.y;
    group.position.y += 0.4;
    group.scale.set(1.15, 1.15, 1.15);

    setTimeout(() => {
      group.position.y = startY;
      group.scale.set(1, 1, 1);
    }, 400);
  }

  onPointerMove(e) {
    const rect = this.container.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    // Parallasse morbida della telecamera
    this.targetCameraX = normX * 1.5;
    this.targetCameraZ = 15 + normY * 1.0;
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Rotazione lenta campo stellare
    if (this.starfield) {
      this.starfield.rotation.y = time * 0.03;
    }

    // Fluttuazione dolce altari 3D e rotazione cristalli Balatro
    this.sanctuaryPlinths.forEach((plinth, i) => {
      plinth.group.position.y = Math.sin(time * 1.5 + i * 2.1) * 0.12;
      if (plinth.crystal) {
        plinth.crystal.rotation.y = time * 2;
        plinth.crystal.rotation.x = Math.sin(time) * 0.3;
      }
    });

    // Lerp telecamera per effetto giroscopico 3D ultra-fluido
    this.camera.position.x += (this.targetCameraX - this.camera.position.x) * 0.05;
    this.camera.position.z += (this.targetCameraZ - this.camera.position.z) * 0.05;
    this.camera.lookAt(0, 0, -1);

    this.renderer.render(this.scene, this.camera);
  }

  clearCards() {
    this.cardMeshes.forEach(group => this.scene.remove(group));
    this.cardMeshes.clear();
  }
}
