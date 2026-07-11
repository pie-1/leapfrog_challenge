import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const categories = [
  { name: 'Books', slug: 'books' },
  { name: 'Games', slug: 'games' },
  { name: 'Tools', slug: 'tools' },
  { name: 'Outdoors', slug: 'outdoors' },
]

const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-200/30">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/Buddy-logo.png" alt="CollegeBuddy" className="h-9" />
              <span className="font-display text-xl font-bold text-primary-800">
                CollegeBuddy
              </span>
            </Link>
            <p className="text-sm text-primary-500/70 mt-4 max-w-xs leading-relaxed">
              A community-driven lending platform built for students, by students.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold text-primary-800 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-primary-500/70 hover:text-primary-600 transition-colors">Home</Link></li>
              <li><Link to="/catalogue" className="text-primary-500/70 hover:text-primary-600 transition-colors">Catalogue</Link></li>
              <li><Link to="/register" className="text-primary-500/70 hover:text-primary-600 transition-colors">Join Community</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-primary-800 mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/catalogue?category=${cat.slug}`} className="text-primary-500/70 hover:text-primary-600 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-display font-semibold text-primary-800 mb-4">Account</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="text-primary-500/70 hover:text-primary-600 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-primary-500/70 hover:text-primary-600 transition-colors">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-200/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-400">© 2024 CollegeBuddy. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-primary-400">
            <Icon icon="mdi:leaf" className="w-4 h-4 text-primary-500" />
            Free, easy, eco-friendly
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer