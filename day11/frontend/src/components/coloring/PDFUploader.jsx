import { useState } from 'react';
import { motion } from 'framer-motion';

const PDFUploader = ({ onPagesAdded }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:5000/api/pages/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        onPagesAdded(data.pages);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border-2 border-dashed border-pastel-pink/50 rounded-2xl p-8 text-center bg-white/50 backdrop-blur-sm"
    >
      <div className="text-4xl mb-4">📄</div>
      <h3 className="text-lg font-semibold text-gray-700">Upload PDF Coloring Book</h3>
      <p className="text-sm text-gray-400 mb-4">Convert PDF pages to coloring pages</p>
      <label className="inline-block px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full cursor-pointer hover:scale-105 transition">
        {uploading ? 'Uploading...' : 'Choose PDF'}
        <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
    </motion.div>
  );
};

export default PDFUploader;