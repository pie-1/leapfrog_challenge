import fs from 'fs/promises';
import path from 'path';
import { fromPath } from 'pdf2pic';

export const generatePDFPreviews = async (pdfPath) => {
  try {
    // Create a temp directory for images
    const tempDir = path.join(path.dirname(pdfPath), 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    const options = {
      density: 100,
      saveFilename: 'page',
      savePath: tempDir,
      format: 'png',
      width: 800,
      height: 600,
    };

    const convert = fromPath(pdfPath, options);
    const result = await convert.bulk(-1); // Convert all pages

    const pages = [];
    for (let i = 0; i < result.length; i++) {
      const imagePath = result[i].path;
      const imageBuffer = await fs.readFile(imagePath);
      const base64 = imageBuffer.toString('base64');
      const preview = `data:image/png;base64,${base64}`;
      pages.push({
        pageNumber: i + 1,
        preview: preview,
        width: 800,
        height: 600,
      });
      // Clean up temp file
      await fs.unlink(imagePath);
    }

    // Remove temp directory
    await fs.rmdir(tempDir);

    return { totalPages: pages.length, pages };
  } catch (error) {
    console.error('PDF preview generation error:', error);
    // Fallback: single page with simple shape
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="100%" height="100%" fill="white"/>
      <circle cx="400" cy="300" r="100" fill="none" stroke="#333" stroke-width="4"/>
      <rect x="300" y="420" width="200" height="80" fill="none" stroke="#333" stroke-width="4"/>
      <text x="50%" y="90%" font-family="Fredoka, sans-serif" font-size="20" fill="#999" text-anchor="middle">PDF Preview</text>
    </svg>`;
    const base64 = Buffer.from(fallbackSvg).toString('base64');
    return {
      totalPages: 1,
      pages: [{ pageNumber: 1, preview: `data:image/svg+xml;base64,${base64}`, width: 800, height: 600 }],
    };
  }
};