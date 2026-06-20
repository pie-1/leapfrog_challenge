import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Canvas from '../components/coloring/Canvas';
import Toolbar from '../components/coloring/Toolbar';
import ColorPalette from '../components/coloring/ColorPalette';
import { builtInTemplates } from '../data/builtInTemplates';
import { useSound } from '../hooks/useSound';
import ShareButton from '../components/shared/ShareButton';

const ColoringPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('fill');
  const [audioReady, setAudioReady] = useState(false);
  const canvasRef = useRef(null);
  const { play } = useSound();

  useEffect(() => {
    const template = Object.values(builtInTemplates).find(t => t.id === id);
    if (template) {
      setPage(template);
    } else {
      navigate('/');
    }
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

  if (!page) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-700">{page.name}</h1>
            <p className="text-gray-400">{page.category} • {page.difficulty}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition"
          >
            ← Back
          </button>
        </motion.div>

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
              svg={page.svg}
              selectedColor={selectedColor}
              brushSize={brushSize}
              tool={tool}
              onFill={() => play('pop')}
              onDraw={() => play('brush')}
            />
          </div>

            <div className="flex items-center gap-3">
            <ShareButton 
              title={`Check out my coloring page: ${page.name} on ColorMe! 🎨`}
              image={page.thumbnail}
            />
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition"
            >
              ← Back
            </button>
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