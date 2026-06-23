import Page from '../models/Page.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generatePDFPreviews } from '../services/pdfService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PDFS_DIR = path.join(__dirname, '../../../uploads/pdfs');

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
    const isPDF = fileType === 'application/pdf';

    // Ensure uploads/pdfs exists
    await fs.mkdir(PDFS_DIR, { recursive: true });

    // Move file to permanent storage
    const pdfName = `${Date.now()}_${fileName}`;
    const permanentPath = path.join(PDFS_DIR, pdfName);
    await fs.copyFile(filePath, permanentPath);
    await fs.unlink(filePath);

    let pageData;

    if (isPDF) {
      const { totalPages, pages } = await generatePDFPreviews(permanentPath);
      pageData = {
        name: fileName.replace(/\.[^/.]+$/, ''),
        category: 'PDF Book',
        difficulty: 'Easy',
        isPDF: true,
        filePath: permanentPath,
        fileType: fileType,
        totalPages,
        pages,
        originalFileName: fileName,
      };
    } else {
      const imageBuffer = await fs.readFile(permanentPath);
      const base64 = imageBuffer.toString('base64');
      const dataUrl = `data:${fileType};base64,${base64}`;
      pageData = {
        name: fileName.replace(/\.[^/.]+$/, ''),
        category: 'Image',
        difficulty: 'Easy',
        imageData: dataUrl,
        fileType: fileType,
        isPDF: false,
        originalFileName: fileName,
      };
    }

    const page = new Page(pageData);
    await page.save();

    res.json({
      success: true,
      message: `Uploaded "${fileName}" successfully`,
      page: page
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete page
export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Delete file if exists
    if (page.filePath) {
      try {
        await fs.unlink(page.filePath);
      } catch (err) {
        console.warn('Could not delete file:', err.message);
      }
    }

    await Page.findByIdAndDelete(id);
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: error.message });
  }
};