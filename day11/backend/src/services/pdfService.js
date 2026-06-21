import fs from 'fs/promises';
import path from 'path';
import { pdf } from 'pdf-to-img';

export const convertPDFToSVG = async (pdfPath, originalFileName) => {
  try {
    const pages = [];

    try {
      const document = await pdf(pdfPath);

      let pageIndex = 0;

      for await (const image of document) {
        const base64Image = image.toString('base64');

        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 800 600"
               width="800"
               height="600">
            <rect width="800" height="600" fill="white"/>
            <image
              href="data:image/png;base64,${base64Image}"
              x="0"
              y="0"
              width="800"
              height="600"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        `;

        pages.push({
          pageNumber: pageIndex + 1,
          name: `${originalFileName.replace(/\.[^/.]+$/, '')} - Page ${pageIndex + 1}`,
          svg
        });

        pageIndex++;
      }

      return pages;
    } catch (renderError) {
      console.warn(
        'PDF render error, using fallback:',
        renderError.message
      );

      return [
        {
          pageNumber: 1,
          name: originalFileName.replace(/\.[^/.]+$/, ''),
          svg: generateFallbackSVG(originalFileName)
        }
      ];
    }
  } catch (error) {
    console.error('PDF conversion error:', error);

    return [
      {
        pageNumber: 1,
        name: 'Uploaded Page',
        svg: generateFallbackSVG('Uploaded')
      }
    ];
  }
};
