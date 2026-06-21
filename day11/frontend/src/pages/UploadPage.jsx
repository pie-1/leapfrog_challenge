import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFile = async (selectedFile) => {
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/pages/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
        setTimeout(() => {
          // Navigate with timestamp to force refresh in gallery
          navigate('/gallery?t=' + Date.now());
        }, 1500);
      } else {
        setMessage('❌ ' + (data.error || 'Upload failed'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📤 Upload PDF</h1>
          <p className="text-gray-500 mb-6">Upload a PDF coloring book and color each page</p>
          
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? 'border-pink-400 bg-pink-50'
                : 'border-pastel-pink/50 hover:border-pink-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-6xl mb-4">{file ? '📄' : '📤'}</div>
            {file ? (
              <div>
                <p className="font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={() => setFile(null)}
                  className="mt-2 text-sm text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-400 mb-4">
                  Drop your PDF here or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUpload}
                  className="hidden"
                  id="file-input"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-input"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full cursor-pointer hover:scale-105 transition"
                >
                  {uploading ? 'Uploading...' : 'Choose PDF'}
                </label>
              </>
            )}
          </div>
          
          {message && (
            <div className={`mt-4 p-4 rounded-xl text-center ${
              message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadPage;