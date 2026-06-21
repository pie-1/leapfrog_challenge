import Page from '../models/Page.js';
import { convertPDFToSVG } from '../services/pdfService.js';
import fs from 'fs/promises';

export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ isPublic: true });
    res.json(pages);
  } catch (error) {
    console.error('Get all pages error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = file.originalname;
    const filePath = file.path;
    const fileType = file.mimetype;

    let pages = [];

    // Handle PDF
    if (fileType === 'application/pdf') {
      pages = await convertPDFToSVG(filePath, fileName);
    } 
    // Handle Images
    else if (fileType.startsWith('image/')) {
      const svg = await convertImageToSVG(filePath, fileName);
      pages = [{
        pageNumber: 1,
        name: fileName.replace(/\.[^/.]+$/, ''),
        svg: svg
      }];
    } 
    else {
      return res.status(400).json({ error: 'Unsupported file type. Please upload PDF or image.' });
    }

    if (!pages || pages.length === 0) {
      return res.status(500).json({ error: 'Failed to convert file' });
    }

    // Save all pages with original name
    const savedPages = await Promise.all(pages.map(async (pageData) => {
      const page = new Page({
        name: pageData.name || `Page ${pageData.pageNumber}`,
        category: 'Uploaded',
        difficulty: 'Easy',
        imageData: pageData.svg,
        originalFileName: fileName,
        fileType: fileType,
        pageNumber: pageData.pageNumber || 1,
        totalPages: pages.length,
      });
      return await page.save();
    }));

    // Clean up uploaded file
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Could not delete temp file:', err.message);
    }

    res.json({
      success: true,
      message: `Converted ${savedPages.length} pages from "${fileName}"`,
      pages: savedPages
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

const convertImageToSVG = async (imagePath, fileName) => {
  const imageBuffer = await fs.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = fileName.endsWith('.png') ? 'image/png' : 
                   fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' : 
                   'image/svg+xml';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="white"/>
    <image href="data:${mimeType};base64,${base64Image}" x="0" y="0" width="800" height="600" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;
};

export const createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};