import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const links = [
    { path: '/', label: 'Home' },
    { path: '/catalogue', label: 'Catalogue' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-primary-200/30 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/Buddy-logo.png" alt="CollegeBuddy" className="h-8" />
            <span className="font-display text-xl font-bold text-primary-900">
              CollegeBuddy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-10 mr-auto">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium pb-1 transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-900'
                    : 'text-primary-500/70 hover:text-primary-800'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-primary-800" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/login"
              className="text-sm font-medium text-primary-500/80 hover:text-primary-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-800 hover:bg-primary-700 transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-primary-50 transition-colors text-primary-700"
            aria-label="Toggle menu"
          >
            <Icon icon={mobileOpen ? 'mdi:close' : 'mdi:menu'} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out ${
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="container-custom py-3 flex flex-col gap-1 border-t border-primary-200/30 bg-white">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-900 bg-primary-50'
                    : 'text-primary-600/80 hover:bg-primary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-3 py-3 rounded-lg text-[15px] font-medium text-primary-600/80 hover:bg-primary-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mt-2 px-4 py-3 rounded-lg text-center font-semibold text-white bg-primary-800 hover:bg-primary-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar