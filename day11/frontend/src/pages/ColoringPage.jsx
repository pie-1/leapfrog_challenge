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
  const [currentPage, setCurrentPage] = useState(0);
  const canvasRef = useRef(null);
  const { play } = useSound();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      
      // 1. FIRST: Check if it's a built-in template
      const template = getTemplateById(id);
      if (template) {
        // Convert template to page format
        setPage({
          id: template.id,
          name: template.name,
          category: template.category,
          difficulty: template.difficulty,
          imageData: template.svg,
          isBuiltIn: true,
          pages: [{ preview: template.svg }],
          totalPages: 1
        });
        setLoading(false);
        return;
      }

      // 2. SECOND: Try fetching from backend (uploaded pages)
      try {
        const response = await fetch(`http://localhost:5000/api/pages/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setPage({
              ...data,
              id: data._id,
              imageData: data.imageData,
              isBuiltIn: false
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

    loadPage();
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
    if (!imageData) return;
    const link = document.createElement('a');
    link.download = `${page?.name || 'coloring'}.png`;
    link.href = imageData;
    link.click();
  };

  const nextPage = () => {
    if (currentPage < (page?.pages?.length || 1) - 1) {
      setCurrentPage(currentPage + 1);
      canvasRef.current?.resetCanvas();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      canvasRef.current?.resetCanvas();
    }
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

  // Get the current page data (for built-in, use imageData)
  const totalPages = page?.pages?.length || 1;
  const currentPageData = page?.pages?.[currentPage] || { preview: page.imageData };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">{page.name}</h1>
            <p className="text-gray-400">{page.category} • {totalPages} page{totalPages > 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-500">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50"
                >
                  Next →
                </button>
              </>
            )}
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold"
            >
              📥 Download
            </button>
            <ShareButton title={`Check out my coloring: ${page.name} on ColorMe! 🎨`} />
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
            >
              ← Back
            </button>
          </div>
        </div>

        {!audioReady && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <button
              onClick={handleStartColoring}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              🎨 Start Coloring!
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ColorPalette selectedColor={selectedColor} onColorSelect={handleColorChange} />
          </div>

          <div className="lg:col-span-2">
            <Canvas
              ref={canvasRef}
              pageData={currentPageData}
              totalPages={totalPages}
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
              onClear={() => canvasRef.current?.clearCanvas()}
              onUndo={() => canvasRef.current?.undo()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColoringPage;