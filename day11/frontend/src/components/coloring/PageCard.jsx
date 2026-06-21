import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  return (
    <Link to={`/color/${page._id || page.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pastel-pink/20 hover:border-pastel-pink/50">
        <div className="h-40 bg-gradient-to-br from-pastel-pink/10 to-pastel-sky/10 flex items-center justify-center p-4 relative">
          {/* Source badge with original name */}
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              page.fileType?.includes('pdf') ? 'bg-red-100 text-red-600' : 
              page.fileType?.includes('image') ? 'bg-blue-100 text-blue-600' : 
              'bg-gray-100 text-gray-600'
            }`}>
              {page.fileType?.includes('pdf') ? '📄 PDF' : 
               page.fileType?.includes('image') ? '🖼️ Image' : 
               page.source === 'image' ? '🖼️ Image' : '📄 PDF'}
            </span>
            {page.originalFileName && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/50 text-white truncate max-w-[120px]">
                {page.originalFileName}
              </span>
            )}
          </div>
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
          {page.originalFileName && (
            <p className="text-xs text-gray-400 truncate">
              📎 {page.originalFileName}
            </p>
          )}
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