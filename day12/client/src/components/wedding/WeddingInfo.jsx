import { CalendarIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

export default function WeddingInfo({ wedding }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">Date</span>
          </div>
          <p className="text-gray-800">
            {new Date(wedding.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-medium">Venue</span>
          </div>
          <p className="text-gray-800">{wedding.venue}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <CurrencyRupeeIcon className="w-5 h-5" />
            <span className="font-medium">Budget</span>
          </div>
          <p className="text-gray-800">
            ₹{wedding.budget?.total?.toLocaleString() || 0}
            {wedding.budget?.spent > 0 && (
              <span className="text-sm text-gray-500 ml-2">
                (₹{wedding.budget.spent.toLocaleString()} spent)
              </span>
            )}
          </p>
        </div>
      </div>

      {wedding.description && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="font-serif text-lg text-gray-800 mb-2">About</h3>
          <p className="text-gray-600">{wedding.description}</p>
        </div>
      )}
    </>
  );
}