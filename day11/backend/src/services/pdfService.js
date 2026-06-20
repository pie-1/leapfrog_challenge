import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../../../uploads/pages');

export const convertPDFToSVG = async (pdfPath) => {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Dynamically import pdf-parse
    const pdfParse = (await import('pdf-parse')).default;
    
    // Read PDF file
    const dataBuffer = await fs.readFile(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    
    const pages = [];
    const totalPages = pdfData.numpages || 1;

    for (let i = 0; i < totalPages; i++) {
      const pageNumber = i + 1;
      
      // Generate SVG with actual PDF text content
      const svg = generateSVGFromPDF(pdfData, pageNumber, totalPages);
      
      pages.push({
        pageNumber,
        name: `Page ${pageNumber}`,
        svg: svg,
        thumbnail: null
      });
    }

    return pages;
  } catch (error) {
    console.error('PDF conversion error:', error);
    // Fallback with sample shapes
    return [{
      pageNumber: 1,
      name: 'Uploaded Page',
      svg: generateFallbackSVG(),
      thumbnail: null
    }];
  }
};

// Generate SVG from PDF data
const generateSVGFromPDF = (pdfData, pageNumber, totalPages) => {
  const width = 800;
  const height = 600;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n`;
  svg += `  <rect width="${width}" height="${height}" fill="white"/>\n`;
  svg += `  <rect x="10" y="10" width="${width-20}" height="${height-20}" fill="none" stroke="#333" stroke-width="2" rx="8"/>\n`;
  
  // Add title
  svg += `  <text x="${width/2}" y="50" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="24" fill="#666">📄 Page ${pageNumber}</text>\n`;
  
  // Add coloring shapes (always present)
  svg += generateColoringShapes(pageNumber);
  
  // Add text from PDF if available
  if (pdfData.text && pdfData.text.length > 0) {
    const lines = pdfData.text.split('\n').filter(line => line.trim().length > 0);
    const maxLines = Math.min(lines.length, 6);
    let yPos = 120;
    for (let i = 0; i < maxLines; i++) {
      const displayText = lines[i].length > 60 ? lines[i].substring(0, 60) + '...' : lines[i];
      svg += `  <text x="40" y="${yPos}" font-family="Arial" font-size="14" fill="#555">${escapeXML(displayText)}</text>\n`;
      yPos += 28;
    }
  }
  
  svg += `</svg>`;
  return svg;
};

// Generate coloring shapes
const generateColoringShapes = (pageNumber) => {
  const shapes = [
    // Big shapes for kids
    `<circle cx="200" cy="300" r="60" fill="none" stroke="#333" stroke-width="3"/>`,
    `<rect x="380" y="240" width="120" height="120" fill="none" stroke="#333" stroke-width="3"/>`,
    `<polygon points="550,240 630,360 470,360" fill="none" stroke="#333" stroke-width="3"/>`,
    `<circle cx="600" cy="180" r="25" fill="none" stroke="#333" stroke-width="2"/>`,
    `<path d="M300 360 Q330 330 360 360 Q330 390 300 360" fill="none" stroke="#333" stroke-width="2"/>`,
  ];

  return shapes.join('\n  ');
};

// Helper to escape XML
const escapeXML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    if (m === "'") return '&apos;';
    return m;
  });
};

// Fallback SVG
const generateFallbackSVG = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="white"/>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="#333" stroke-width="3" rx="10"/>
    <circle cx="300" cy="300" r="80" fill="none" stroke="#333" stroke-width="3"/>
    <rect x="420" y="220" width="160" height="160" fill="none" stroke="#333" stroke-width="3"/>
    <circle cx="150" cy="150" r="40" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M500 380 Q540 340 580 380" fill="none" stroke="#333" stroke-width="2"/>
    <text x="400" y="280" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="32" fill="#666">📄 Coloring Page</text>
    <text x="400" y="340" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="18" fill="#999">Color the shapes below!</text>
  </svg>`;
};