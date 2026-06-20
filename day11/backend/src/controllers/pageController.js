import Page from '../models/Page.js';
import { convertPDFToSVG } from '../services/pdfService.js';

// Get all pages
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ isPublic: true });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get page by ID
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload PDF and convert to pages
export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pages = await convertPDFToSVG(req.file.path);
    
    // Save each page to database
    const savedPages = await Promise.all(pages.map(async (pageData) => {
      const page = new Page({
        name: pageData.name || `Page ${pageData.pageNumber}`,
        category: 'Uploaded',
        difficulty: 'Easy',
        imageData: pageData.svg,
        thumbnail: pageData.thumbnail || null,
      });
      return await page.save();
    }));

    res.json({
      success: true,
      message: `Converted ${savedPages.length} pages`,
      pages: savedPages
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create custom page
export const createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};