import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const PDFViewer = ({ pdfData, pageNumber = 1, onPageRender }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfData) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        
        // Get the page
        const page = await pdf.getPage(pageNumber);
        
        // Set canvas size
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render page
        const context = canvas.getContext('2d');
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        
        await page.render(renderContext).promise;
        
        // Pass rendered data to parent
        if (onPageRender) {
          onPageRender({
            canvas: canvas,
            width: viewport.width,
            height: viewport.height,
            imageData: canvas.toDataURL('image/png')
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('PDF render error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    renderPage();
  }, [pdfData, pageNumber, onPageRender]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
        <div className="text-center">
          <p className="text-red-500">Error loading PDF page</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-inner">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
      />
    </div>
  );
};

export default PDFViewer;