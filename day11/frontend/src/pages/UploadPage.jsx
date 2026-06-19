import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import { templates } from '../data/templates';

const UploadPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pageName, setPageName] = useState('');
  const [category, setCategory] = useState('Custom');
  const navigate = useNavigate();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Convert to SVG or store as image
        setUploadedImage(event.target.result);
        setIsUploading(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Save custom page
  const savePage = () => {
    // In real app, save to backend
    // For now, we'll add to local state
    const newPage = {
      id: `custom-${Date.now()}`,
      name: pageName || 'My Coloring Page',
      category: category,
      difficulty: 'Easy',
      imageData: uploadedImage,
      svg: `<img src="${uploadedImage}" />`
    };
    
    // Add to templates (in memory)
    // In production, save to backend
    localStorage.setItem('customPage', JSON.stringify(newPage));
    alert('Page saved! You can find it in the homepage.');
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pastel-pink/30"
        >
          <h1 className="text-4xl font-bold text-gray-700 mb-4">Upload Your Own</h1>
          <p className="text-gray-400 mb-8">Upload a line art image to color it!</p>

          {/* Upload Area */}
          <div 
            className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
              uploadedImage 
                ? 'border-pastel-green bg-pastel-green/10' 
                : 'border-gray-200 hover:border-pastel-pink'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setUploadedImage(event.target.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            {uploadedImage ? (
              <div>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="mt-4 text-red-500 hover:text-red-600 text-sm"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-400 mb-2">Drop your image here or</p>
                <label className="inline-block px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full cursor-pointer hover:scale-105 transition">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="text-xs text-gray-400 mt-4">PNG, JPG, SVG supported</p>
              </div>
            )}
          </div>

          {/* Details Form */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-gray-600 mb-1">Page Name</label>
                <input
                  type="text"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  placeholder="My Coloring Page"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pastel-pink focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pastel-pink focus:outline-none"
                >
                  <option>Animals</option>
                  <option>Nature</option>
                  <option>Cartoon</option>
                  <option>Custom</option>
                </select>
              </div>
              <button
                onClick={savePage}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:scale-105 transition"
              >
                🎨 Start Coloring!
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;