
import Page from '../models/Page.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all pages
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ isPublic: true });
    res.json(pages);
  } catch (error) {
    console.error('Get all pages error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get page by ID
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    console.error('Get page by ID error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Upload PDF or Image
export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = file.originalname;
    const filePath = file.path;
    const fileType = file.mimetype;
    const fileSize = file.size;

    console.log(`📤 Uploading: ${fileName} (${fileType}, ${fileSize} bytes)`);

    // Read file as base64
    const fileBuffer = await fs.readFile(filePath);
    const base64File = fileBuffer.toString('base64');
    const dataUrl = `data:${fileType};base64,${base64File}`;

    // Determine if it's a PDF or image
    const isPDF = fileType === 'application/pdf';
    const category = isPDF ? 'PDF Book' : 'Image';

    // Create page entry
    const page = new Page({
      name: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
      category: category,
      difficulty: 'Easy',
      imageData: dataUrl,
      isPDF: isPDF,
      originalFileName: fileName,
      fileType: fileType,
      fileSize: fileSize,
      pageNumber: 1,
      totalPages: 1,
    });

    await page.save();

    // Clean up temp file
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('⚠️ Could not delete temp file:', err.message);
    }

    console.log(`✅ Uploaded: ${fileName}`);

    res.json({
      success: true,
      message: `Successfully uploaded "${fileName}" as a coloring book`,
      page: page
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    // Clean up temp file if it exists
    try {
      if (req.file && req.file.path) {
        await fs.unlink(req.file.path);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
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
    console.error('Create page error:', error);
    res.status(500).json({ error: error.message });
  }
};