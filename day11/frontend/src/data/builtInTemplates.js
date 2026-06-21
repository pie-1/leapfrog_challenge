export const builtInTemplates = {
  lion: {
    id: 'lion',
    name: 'Happy Lion',
    category: 'Animals',
    difficulty: 'Easy',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Mane -->
      <circle cx="200" cy="200" r="120" fill="none" stroke="#333" stroke-width="3" />
      <!-- Face -->
      <circle cx="200" cy="200" r="80" fill="none" stroke="#333" stroke-width="3" />
      <!-- Eyes -->
      <circle cx="160" cy="180" r="12" fill="none" stroke="#333" stroke-width="3" />
      <circle cx="240" cy="180" r="12" fill="none" stroke="#333" stroke-width="3" />
      <!-- Pupils -->
      <circle cx="160" cy="180" r="4" fill="#333" />
      <circle cx="240" cy="180" r="4" fill="#333" />
      <!-- Nose -->
      <path d="M190 210 Q200 225 210 210" fill="none" stroke="#333" stroke-width="3" />
      <!-- Mouth -->
      <path d="M185 220 Q200 235 215 220" fill="none" stroke="#333" stroke-width="2" />
      <!-- Whiskers -->
      <line x1="100" y1="200" x2="150" y2="210" stroke="#333" stroke-width="2" />
      <line x1="100" y1="215" x2="150" y2="220" stroke="#333" stroke-width="2" />
      <line x1="300" y1="200" x2="250" y2="210" stroke="#333" stroke-width="2" />
      <line x1="300" y1="215" x2="250" y2="220" stroke="#333" stroke-width="2" />
    </svg>`
  },
  butterfly: {
    id: 'butterfly',
    name: 'Butterfly',
    category: 'Animals',
    difficulty: 'Medium',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Body -->
      <ellipse cx="200" cy="200" rx="12" ry="70" fill="none" stroke="#333" stroke-width="3" />
      <!-- Head -->
      <circle cx="200" cy="120" r="15" fill="none" stroke="#333" stroke-width="3" />
      <!-- Left Wing -->
      <path d="M190 160 Q100 100 80 180 Q60 260 190 260" fill="none" stroke="#333" stroke-width="3" />
      <!-- Right Wing -->
      <path d="M210 160 Q300 100 320 180 Q340 260 210 260" fill="none" stroke="#333" stroke-width="3" />
      <!-- Left Wing Patterns -->
      <circle cx="140" cy="180" r="20" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="130" cy="220" r="12" fill="none" stroke="#333" stroke-width="2" />
      <!-- Right Wing Patterns -->
      <circle cx="260" cy="180" r="20" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="270" cy="220" r="12" fill="none" stroke="#333" stroke-width="2" />
      <!-- Antennae -->
      <line x1="190" y1="115" x2="160" y2="80" stroke="#333" stroke-width="2" />
      <line x1="210" y1="115" x2="240" y2="80" stroke="#333" stroke-width="2" />
      <circle cx="160" cy="80" r="5" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="240" cy="80" r="5" fill="none" stroke="#333" stroke-width="2" />
    </svg>`
  },
  flower: {
    id: 'flower',
    name: 'Flower Garden',
    category: 'Nature',
    difficulty: 'Easy',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Stem -->
      <line x1="200" y1="280" x2="200" y2="150" stroke="#333" stroke-width="4" />
      <!-- Leaves -->
      <path d="M200 230 Q160 210 160 240 Q180 250 200 230" fill="none" stroke="#333" stroke-width="2" />
      <path d="M200 250 Q240 230 240 260 Q220 270 200 250" fill="none" stroke="#333" stroke-width="2" />
      <!-- Center -->
      <circle cx="200" cy="140" r="25" fill="none" stroke="#333" stroke-width="3" />
      <!-- Petals -->
      <ellipse cx="200" cy="95" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" />
      <ellipse cx="235" cy="115" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(60 235 115)" />
      <ellipse cx="245" cy="155" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(120 245 155)" />
      <ellipse cx="200" cy="185" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(180 200 185)" />
      <ellipse cx="165" cy="155" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(240 165 155)" />
      <ellipse cx="155" cy="115" rx="18" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(300 155 115)" />
    </svg>`
  },
  tree: {
    id: 'tree',
    name: 'Magic Tree',
    category: 'Nature',
    difficulty: 'Medium',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Trunk -->
      <rect x="180" y="240" width="40" height="120" fill="none" stroke="#333" stroke-width="3" />
      <!-- Canopy -->
      <circle cx="200" cy="180" r="80" fill="none" stroke="#333" stroke-width="3" />
      <circle cx="140" cy="160" r="50" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="260" cy="160" r="50" fill="none" stroke="#333" stroke-width="2" />
      <!-- Leaves -->
      <circle cx="180" cy="170" r="15" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="220" cy="170" r="15" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="200" cy="150" r="18" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="150" cy="150" r="12" fill="none" stroke="#333" stroke-width="2" />
      <circle cx="250" cy="150" r="12" fill="none" stroke="#333" stroke-width="2" />
      <!-- Roots -->
      <line x1="180" y1="360" x2="140" y2="380" stroke="#333" stroke-width="3" />
      <line x1="220" y1="360" x2="260" y2="380" stroke="#333" stroke-width="3" />
    </svg>`
  },
  cat: {
    id: 'cat',
    name: 'Friendly Cat',
    category: 'Cartoon',
    difficulty: 'Easy',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Face -->
      <circle cx="200" cy="200" r="100" fill="none" stroke="#333" stroke-width="3" />
      <!-- Ears -->
      <polygon points="120,120 140,160 100,160" fill="none" stroke="#333" stroke-width="3" />
      <polygon points="280,120 260,160 300,160" fill="none" stroke="#333" stroke-width="3" />
      <!-- Eyes -->
      <ellipse cx="155" cy="180" rx="18" ry="22" fill="none" stroke="#333" stroke-width="3" />
      <ellipse cx="245" cy="180" rx="18" ry="22" fill="none" stroke="#333" stroke-width="3" />
      <!-- Pupils -->
      <ellipse cx="155" cy="180" rx="6" ry="14" fill="#333" />
      <ellipse cx="245" cy="180" rx="6" ry="14" fill="#333" />
      <!-- Nose -->
      <polygon points="190,210 210,210 200,222" fill="none" stroke="#333" stroke-width="3" />
      <!-- Mouth -->
      <path d="M185,225 Q200,240 215,225" fill="none" stroke="#333" stroke-width="2" />
      <!-- Whiskers -->
      <line x1="80" y1="200" x2="140" y2="210" stroke="#333" stroke-width="2" />
      <line x1="80" y1="220" x2="140" y2="225" stroke="#333" stroke-width="2" />
      <line x1="320" y1="200" x2="260" y2="210" stroke="#333" stroke-width="2" />
      <line x1="320" y1="220" x2="260" y2="225" stroke="#333" stroke-width="2" />
    </svg>`
  },
  rocket: {
    id: 'rocket',
    name: 'Rocket Ship',
    category: 'Cartoon',
    difficulty: 'Medium',
    source: 'image',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <!-- Body -->
      <ellipse cx="200" cy="220" rx="60" ry="100" fill="none" stroke="#333" stroke-width="3" />
      <!-- Nose Cone -->
      <polygon points="200,80 160,140 240,140" fill="none" stroke="#333" stroke-width="3" />
      <!-- Window -->
      <circle cx="200" cy="180" r="22" fill="none" stroke="#333" stroke-width="3" />
      <!-- Left Fin -->
      <polygon points="140,290 110,340 160,310" fill="none" stroke="#333" stroke-width="3" />
      <!-- Right Fin -->
      <polygon points="260,290 290,340 240,310" fill="none" stroke="#333" stroke-width="3" />
      <!-- Flame -->
      <path d="M180 320 Q200 360 220 320" fill="none" stroke="#333" stroke-width="3" />
      <path d="M170 330 Q200 380 230 330" fill="none" stroke="#333" stroke-width="2" />
      <!-- Details -->
      <line x1="160" y1="260" x2="240" y2="260" stroke="#333" stroke-width="2" />
      <line x1="170" y1="280" x2="230" y2="280" stroke="#333" stroke-width="2" />
    </svg>`
  }
};