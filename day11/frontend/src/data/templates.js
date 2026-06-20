import { pdfTemplates } from './pdfTemplates';
import { builtInTemplates } from './builtInTemplates'; // Your existing SVGs

// Merge all templates into one source
export const templates = {
  ...builtInTemplates,
  ...pdfTemplates.reduce((acc, pdf) => {
    acc[pdf.id] = pdf;
    return acc;
  }, {})
};