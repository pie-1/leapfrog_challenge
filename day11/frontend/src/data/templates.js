import { builtInTemplates } from './builtInTemplates';
import { pdfTemplates } from './pdfTemplates';

// Merge built-in templates with PDF templates
export const templates = {
  ...builtInTemplates,
  ...pdfTemplates.reduce((acc, pdf) => {
    acc[pdf.id] = pdf;
    return acc;
  }, {})
};

// Helper: Get template by ID
export const getTemplateById = (id) => {
  return templates[id] || null;
};

// Helper: Get all templates as array
export const getAllTemplates = () => {
  return Object.values(templates);
};

// Helper: Get templates by category
export const getTemplatesByCategory = (category) => {
  if (category === 'All') return getAllTemplates();
  return Object.values(templates).filter(t => t.category === category);
};