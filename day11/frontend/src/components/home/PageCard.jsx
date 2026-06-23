import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  const preview = page.preview || page.imageData || page.svg;

  return (
    <Link to={`/color/${page._id || page.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pastel-pink/20 hover:border-pastel-pink/50">
        <div className="h-40 bg-gradient-to-br from-pastel-pink/10 to-pastel-sky/10 flex items-center justify-center p-4 relative">
          <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-white/80">
            {page.isPDF ? '📄' : '🖼️'}
          </span>
          {preview ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: preview
              }}
            />
          ) : (
            <span className="text-4xl">🎨</span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-700 truncate text-sm">
            {page.name || 'Untitled'}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs px-2 py-1 bg-pastel-pink/20 text-pink-500 rounded-full">
              {page.category || 'General'}
            </span>
            <span className="text-xs text-gray-400">
              {page.difficulty || 'Easy'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;