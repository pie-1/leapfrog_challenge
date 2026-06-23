import { builtInTemplates } from './builtInTemplates';

export const templates = builtInTemplates;

export const getTemplateById = (id) => {
  return templates[id] || null;
};

export const getAllTemplates = () => {
  return Object.values(templates);
};