import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Canvas from '../components/coloring/Canvas';
import Toolbar from '../components/coloring/Toolbar';
import ColorPalette from '../components/coloring/ColorPalette';
import ShareButton from '../components/shared/ShareButton';
import { getTemplateById } from '../data/templates';
import { useSound } from '../hooks/useSound';

const ColoringPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('fill');
  const [audioReady, setAudioReady] = useState(false);
  const canvasRef = useRef(null);
  const { play } = useSound();

  useEffect(() => {
    // First check built-in or PDF templates
    const template = getTemplateById(id);
    if (template) {
      setPage(template);
      setLoading(false);
      return;
    }

    // If not found, try fetching from backend (uploaded pages)
    const fetchPage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pages/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.imageData) {
            setPage({
              id: data._id,
              name: data.name || 'Uploaded Page',
              category: data.category || 'Uploaded',
              difficulty: data.difficulty || 'Easy',
              svg: data.imageData,
              imageData: data.imageData
            });
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, navigate]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    play('click');
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
    play('click');
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
    play('click');
  };

  const handleStartColoring = () => {
    setAudioReady(true);
    play('click');
  };

  const handleDownload = () => {
    const imageData = canvasRef.current?.getImageData();
    if (!imageData) {
      alert('Unable to capture image. Please try again.');
      return;
    }
    const link = document.createElement('a');
    link.download = `${page?.name || 'coloring'}.png`;
    link.href = imageData;
    link.click();
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl text-gray-400">Page not found</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center mb-6 gap-3"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-700">{page.name}</h1>
            <p className="text-gray-400">{page.category} • {page.difficulty}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition"
            >
              📥 Download
            </button>
            <ShareButton
              title={`Check out my coloring: ${page.name} on ColorMe! 🎨`}
              image={page.thumbnail}
            />
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition"
            >
              ← Back
            </button>
          </div>
        </motion.div>

        {/* Audio activation overlay */}
        {!audioReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartColoring}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              🎨 Start Coloring!
            </motion.button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ColorPalette
              selectedColor={selectedColor}
              onColorSelect={handleColorChange}
            />
          </div>

          <div className="lg:col-span-2">
            <Canvas
              ref={canvasRef}
              svg={page.svg || page.imageData}
              selectedColor={selectedColor}
              brushSize={brushSize}
              tool={tool}
              onFill={() => play('pop')}
              onDraw={() => play('brush')}
            />
          </div>

          <div className="lg:col-span-1">
            <Toolbar
              selectedTool={tool}
              onToolSelect={handleToolChange}
              brushSize={brushSize}
              onBrushSizeChange={handleBrushSizeChange}
              onClear={() => {
                if (canvasRef.current) {
                  canvasRef.current.clearCanvas();
                  play('erase');
                }
              }}
              onUndo={() => canvasRef.current?.undo()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColoringPage;