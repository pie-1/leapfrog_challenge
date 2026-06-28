import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function WeddingHeader({ wedding, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-serif text-gray-800">{wedding.title}</h1>
        <p className="text-gray-500">
          {new Date(wedding.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition"
        >
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
}