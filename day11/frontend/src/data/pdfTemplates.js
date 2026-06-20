// Instead of storing PDFs, we store pre-converted SVGs
// This gives instant loading and consistent coloring experience

export const pdfTemplates = [
  {
    id: 'pdf-1',
    name: 'Nature Scenes',
    category: 'Nature',
    difficulty: 'Easy',
    // Pre-converted SVG from colorfiling1.pdf page 1
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Sun -->
      <circle cx="150" cy="100" r="50" fill="none" stroke="#333" stroke-width="3"/>
      <circle cx="150" cy="100" r="60" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4,4"/>
      <!-- Mountains -->
      <path d="M0 350 L200 200 L300 280 L450 180 L600 300 L800 220 L800 600 L0 600 Z" fill="none" stroke="#333" stroke-width="3"/>
      <!-- Trees -->
      <rect x="350" y="350" width="20" height="60" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="360" cy="330" r="30" fill="none" stroke="#333" stroke-width="2"/>
      <rect x="550" y="320" width="15" height="50" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="558" cy="300" r="25" fill="none" stroke="#333" stroke-width="2"/>
      <!-- River -->
      <path d="M0 450 Q200 400 400 450 Q600 500 800 430" fill="none" stroke="#333" stroke-width="3"/>
      <!-- Clouds -->
      <ellipse cx="500" cy="120" rx="60" ry="25" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="540" cy="110" rx="40" ry="20" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="460" cy="110" rx="35" ry="18" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`,
    thumbnail: '/thumbnails/nature.jpg'
  },
  {
    id: 'pdf-2',
    name: 'Animal Friends',
    category: 'Animals',
    difficulty: 'Medium',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Elephant -->
      <ellipse cx="300" cy="350" rx="80" ry="100" fill="none" stroke="#333" stroke-width="3"/>
      <ellipse cx="380" cy="380" rx="60" ry="70" fill="none" stroke="#333" stroke-width="3"/>
      <!-- Trunk -->
      <path d="M220 370 Q180 390 200 430" fill="none" stroke="#333" stroke-width="3"/>
      <!-- Ears -->
      <ellipse cx="300" cy="300" rx="30" ry="50" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Eyes -->
      <circle cx="280" cy="320" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Giraffe -->
      <rect x="600" y="250" width="20" height="200" fill="none" stroke="#333" stroke-width="3"/>
      <ellipse cx="610" cy="240" rx="25" ry="35" fill="none" stroke="#333" stroke-width="3"/>
      <!-- Giraffe spots -->
      <circle cx="610" cy="300" r="10" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="615" cy="340" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="605" cy="380" r="12" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Ground -->
      <line x1="0" y1="480" x2="800" y2="480" stroke="#333" stroke-width="2"/>
      <!-- Grass -->
      <path d="M50 480 L55 460 L60 480 M150 480 L155 465 L160 480" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`,
    thumbnail: '/thumbnails/animals.jpg'
  },
  {
    id: 'pdf-3',
    name: 'Underwater World',
    category: 'Nature',
    difficulty: 'Hard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Fish -->
      <ellipse cx="300" cy="250" rx="60" ry="30" fill="none" stroke="#333" stroke-width="3"/>
      <polygon points="360,250 390,220 390,280" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="270" cy="245" r="5" fill="#333"/>
      <!-- Fish 2 -->
      <ellipse cx="500" cy="300" rx="40" ry="20" fill="none" stroke="#333" stroke-width="2"/>
      <polygon points="540,300 560,280 560,320" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Bubbles -->
      <circle cx="330" cy="200" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="350" cy="170" r="12" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="320" cy="140" r="6" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Seaweed -->
      <path d="M100 500 Q120 450 100 400 Q80 350 100 300" fill="none" stroke="#333" stroke-width="3"/>
      <path d="M130 500 Q150 460 130 420 Q110 380 130 340" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Starfish -->
      <polygon points="600,400 610,430 640,430 615,450 625,480 600,460 575,480 585,450 560,430 590,430" fill="none" stroke="#333" stroke-width="2"/>
      <!-- Sea floor -->
      <path d="M0 500 Q200 480 400 500 Q600 520 800 500" fill="none" stroke="#333" stroke-width="2"/>
    </svg>`,
    thumbnail: '/thumbnails/underwater.jpg'
  }
];