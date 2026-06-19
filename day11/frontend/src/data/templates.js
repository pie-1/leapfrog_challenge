export const templates = {
  lion: {
    id: 'lion',
    name: 'Happy Lion',
    category: 'Animals',
    difficulty: 'Easy',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Main body -->
      <circle cx="200" cy="200" r="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Mane -->
      <circle cx="200" cy="200" r="130" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="8,4"/>
      <!-- Eyes -->
      <circle cx="160" cy="180" r="10" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="240" cy="180" r="10" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Nose -->
      <ellipse cx="200" cy="210" rx="15" ry="10" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Mouth -->
      <path d="M185,230 Q200,250 215,230" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  butterfly: {
    id: 'butterfly',
    name: 'Butterfly',
    category: 'Animals',
    difficulty: 'Medium',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Left wing -->
      <ellipse cx="140" cy="180" rx="80" ry="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Right wing -->
      <ellipse cx="260" cy="180" rx="80" ry="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Body -->
      <ellipse cx="200" cy="200" rx="10" ry="60" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Left wing patterns -->
      <circle cx="120" cy="160" r="20" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="130" cy="220" r="15" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Right wing patterns -->
      <circle cx="280" cy="160" r="20" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="270" cy="220" r="15" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  tree: {
    id: 'tree',
    name: 'Magic Tree',
    category: 'Nature',
    difficulty: 'Medium',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Trunk -->
      <rect x="185" y="250" width="30" height="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Canopy -->
      <circle cx="200" cy="200" r="80" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="150" cy="180" r="50" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="250" cy="180" r="50" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Leaves patterns -->
      <circle cx="200" cy="190" r="15" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="170" cy="170" r="10" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="230" cy="170" r="10" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  flower: {
    id: 'flower',
    name: 'Flower Garden',
    category: 'Nature',
    difficulty: 'Easy',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Stem -->
      <line x1="200" y1="280" x2="200" y2="150" stroke="#333" stroke-width="2"/>
      <!-- Center -->
      <circle cx="200" cy="140" r="25" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Petals -->
      <ellipse cx="200" cy="100" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="230" cy="115" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(60 230 115)"/>
      <ellipse cx="240" cy="150" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(120 240 150)"/>
      <ellipse cx="200" cy="180" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(180 200 180)"/>
      <ellipse cx="170" cy="150" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(240 170 150)"/>
      <ellipse cx="160" cy="115" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2" transform="rotate(300 160 115)"/>
    </svg>`
  },
  cat: {
    id: 'cat',
    name: 'Friendly Cat',
    category: 'Cartoon',
    difficulty: 'Easy',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Face -->
      <circle cx="200" cy="200" r="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Ears -->
      <polygon points="120,120 140,160 100,160" fill="none" stroke="#333" stroke-width="2"/>
      <polygon points="280,120 260,160 300,160" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Eyes -->
      <ellipse cx="160" cy="180" rx="15" ry="20" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="240" cy="180" rx="15" ry="20" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Pupils -->
      <ellipse cx="160" cy="180" rx="5" ry="12" fill="#333"/>
      <ellipse cx="240" cy="180" rx="5" ry="12" fill="#333"/>
      <!-- Nose -->
      <polygon points="190,210 210,210 200,220" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Mouth -->
      <path d="M190,220 Q200,235 210,220" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Whiskers -->
      <line x1="100" y1="200" x2="150" y2="210" stroke="#333" stroke-width="2"/>
      <line x1="100" y1="215" x2="150" y2="220" stroke="#333" stroke-width="2"/>
      <line x1="300" y1="200" x2="250" y2="210" stroke="#333" stroke-width="2"/>
      <line x1="300" y1="215" x2="250" y2="220" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  rocket: {
    id: 'rocket',
    name: 'Rocket Ship',
    category: 'Cartoon',
    difficulty: 'Medium',
    svg: `<svg viewBox="0 0 400 400">
      <!-- Body -->
      <ellipse cx="200" cy="220" rx="60" ry="100" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Nose cone -->
      <polygon points="200,80 170,150 230,150" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Fins -->
      <polygon points="140,300 120,350 170,320" fill="none" stroke="#333" stroke-width="2"/>
      <polygon points="260,300 280,350 230,320" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Window -->
      <circle cx="200" cy="180" r="20" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Flame -->
      <ellipse cx="200" cy="330" rx="20" ry="30" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`
  }
};