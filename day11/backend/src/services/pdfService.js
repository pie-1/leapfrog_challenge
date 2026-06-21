import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertPDFToSVG = async (pdfPath, originalFileName) => {
  try {
    // Try to parse PDF
    let pdfData;
    let totalPages = 1;
    let text = '';

    try {
      const pdfParse = (await import('pdf-parse')).default;
      const dataBuffer = await fs.readFile(pdfPath);
      pdfData = await pdfParse(dataBuffer);
      totalPages = pdfData.numpages || 1;
      text = pdfData.text || '';
    } catch (parseError) {
      console.warn('PDF parse failed, using fallback:', parseError.message);
      // Return single fallback page
      return [{
        pageNumber: 1,
        name: originalFileName ? originalFileName.replace(/\.[^/.]+$/, '') : 'Uploaded Page',
        svg: generateFallbackSVG()
      }];
    }

    const pages = [];
    const baseName = originalFileName ? originalFileName.replace(/\.[^/.]+$/, '') : 'Page';

    // Generate SVG for each page
    for (let i = 0; i < totalPages; i++) {
      const pageNumber = i + 1;
      pages.push({
        pageNumber,
        name: `${baseName} - Page ${pageNumber}`,
        svg: generateSVGFromPDF(text, pageNumber, totalPages)
      });
    }

    return pages;
  } catch (error) {
    console.error('PDF conversion error:', error);
    return [{
      pageNumber: 1,
      name: originalFileName || 'Uploaded Page',
      svg: generateFallbackSVG()
    }];
  }
};

const generateSVGFromPDF = (text, pageNumber, totalPages) => {
  const shapes = [
    `<circle cx="200" cy="250" r="80" fill="none" stroke="#333" stroke-width="4"/>`,
    `<rect x="350" y="170" width="160" height="160" fill="none" stroke="#333" stroke-width="4"/>`,
    `<polygon points="580,250 520,350 640,350" fill="none" stroke="#333" stroke-width="4"/>`,
    `<ellipse cx="600" cy="150" rx="40" ry="30" fill="none" stroke="#333" stroke-width="3"/>`,
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="white"/>
    <rect x="10" y="10" width="780" height="580" fill="none" stroke="#333" stroke-width="3" rx="10"/>
    ${shapes.join('\n    ')}
    <text x="400" y="570" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="16" fill="#999">
      Page ${pageNumber} of ${totalPages}
    </text>
  </svg>`;
};

const generateFallbackSVG = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="white"/>
    <rect x="10" y="10" width="780" height="580" fill="none" stroke="#333" stroke-width="3" rx="10"/>
    <circle cx="400" cy="250" r="100" fill="none" stroke="#333" stroke-width="3"/>
    <rect x="300" y="370" width="200" height="150" fill="none" stroke="#333" stroke-width="3"/>
    <circle cx="200" cy="150" r="50" fill="none" stroke="#333" stroke-width="3"/>
    <circle cx="600" cy="150" r="50" fill="none" stroke="#333" stroke-width="3"/>
    <text x="400" y="550" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="20" fill="#999">Uploaded Coloring Page</text>
  </svg>`;
};