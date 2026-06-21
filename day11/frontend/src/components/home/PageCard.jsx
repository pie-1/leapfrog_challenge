import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  return (
    <Link to={`/color/${page._id || page.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pastel-pink/20 hover:border-pastel-pink/50">
        <div className="h-40 bg-gradient-to-br from-pastel-pink/10 to-pastel-sky/10 flex items-center justify-center p-4 relative">
          {/* Source badge */}
          {page.source && (
            <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
              page.source === 'image' ? 'bg-blue-100 text-blue-600' :
              page.source === 'pdf' ? 'bg-purple-100 text-purple-600' :
              'bg-green-100 text-green-600'
            }`}>
              {page.source === 'image' ? '🖼️' :
               page.source === 'pdf' ? '📄' : '📤'}
            </span>
          )}
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{
              __html: page.imageData || page.svg || '<p class="text-gray-400">No preview</p>'
            }}
          />
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