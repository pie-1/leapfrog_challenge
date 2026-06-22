import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const processPDF = async (pdfPath, fileName) => {
  try {
    // Read PDF
    const dataBuffer = await fs.readFile(pdfPath);
    const pdfData = await pdfjsLib.getDocument({ data: dataBuffer }).promise;
    
    const totalPages = pdfData.numPages;
    const pages = [];

    // Generate preview for each page
    for (let i = 1; i <= totalPages; i++) {
      const page = await pdfjsLib.getDocument({ data: dataBuffer }).promise;
      const pageContent = await page.getPage(i);
      const viewport = pageContent.getViewport({ scale: 1.5 });
      
      // Create canvas for preview (using canvas module for Node)
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      
      await pageContent.render({ canvasContext: ctx, viewport }).promise;
      
      // Store as base64
      const preview = canvas.toDataURL('image/png');
      
      pages.push({
        pageNumber: i,
        preview: preview,
        width: viewport.width,
        height: viewport.height
      });
    }

    return {
      totalPages,
      pages,
      pdfData: dataBuffer.toString('base64')
    };
  } catch (error) {
    console.error('PDF processing error:', error);
    throw error;
  }
};