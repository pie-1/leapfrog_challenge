import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Catalogue = () => {
  const [items] = useState([
    { id: 1, title: 'The Art of War', category: 'books', condition: 'Good', available: true, owner: 'Sun Tzu' },
    { id: 2, title: 'Data Structures', category: 'books', condition: 'Like New', available: true, owner: 'Pawan Singh' },
    { id: 3, title: 'Game Controller', category: 'games', condition: 'Excellent', available: false, owner: 'Jane Doe' },
    { id: 4, title: 'Wireless Keyboard', category: 'tools', condition: 'New', available: true, owner: 'John Smith' },
  ])

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-600 text-sm font-medium rounded-full mb-3">
            Browse All
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-900">
            Available Items
          </h1>
          <p className="text-primary-500/60 mt-2">Find what you need from the community</p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="card group">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100/50 to-primary-200/20 rounded-xl flex items-center justify-center relative">
                <img src="/grayBook.png" alt={item.title} className="w-16 h-16 opacity-30 group-hover:scale-110 transition-transform" />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {item.available ? 'Available' : 'Borrowed'}
                </span>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-medium border border-primary-200/30">
                  {item.category}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary-800">{item.title}</h3>
                <p className="text-sm text-primary-500/50">by {item.owner}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-200/30">
                  <span className="text-sm text-primary-500/60">{item.condition}</span>
                  <button className="text-primary-500 text-sm font-medium hover:text-primary-700 transition-colors flex items-center gap-1">
                    View
                    <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Catalogue