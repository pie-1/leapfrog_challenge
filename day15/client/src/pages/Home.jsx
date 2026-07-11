import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Home = () => {
  const categories = [
    { name: 'Books', slug: 'books', icon: 'twemoji:open-book' },
    { name: 'Games', slug: 'games', icon: 'twemoji:video-game' },
    { name: 'Tools', slug: 'tools', icon: 'twemoji:hammer-and-wrench' },
    { name: 'Outdoors', slug: 'outdoors', icon: 'twemoji:camping' },
  ]

  const steps = [
    { icon: 'mdi:upload-outline', title: 'List your items', desc: 'Post books, tools, or games you want to share' },
    { icon: 'mdi:magnify', title: 'Discover & request', desc: 'Browse items and request what you need' },
    { icon: 'mdi:handshake-outline', title: 'Connect & share', desc: 'Connect with owners and build community' },
  ]

  const scrollRef = useRef(null)
  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-primary-200 pt-20">
        <div className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left */}
            <div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-900 leading-[1.08]">
                What's on
                <br />
                your <em className="text-primary-600 not-italic font-serif italic">Shelf</em> today?
              </h1>

              <p className="mt-5 text-base md:text-lg text-primary-700/70 max-w-md leading-relaxed">
                Share and borrow books, tools, and games with the community.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/catalogue"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm text-white bg-primary-800 hover:bg-primary-700 transition-colors"
                >
                  View listings
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm text-primary-800 bg-white/80 hover:bg-white transition-colors border border-primary-300/50"
                >
                  Join Community
                </Link>
              </div>

              {/* Trust indicator */}
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary-500/20 border-2 border-white flex items-center justify-center text-primary-700 text-xs font-semibold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-800">1,200+ students</p>
                  <p className="text-xs text-primary-600/60">Already sharing</p>
                </div>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/home-hero-illustration.svg"
                alt="Student reading with borrowed books"
                className="w-full max-w-sm animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="bg-white py-14 md:py-16">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-900">
              What do you want to find?
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="w-8 h-8 rounded-full border border-primary-200 flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors"
                aria-label="Scroll left"
              >
                <Icon icon="mdi:chevron-left" className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="w-8 h-8 rounded-full border border-primary-200 flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors"
                aria-label="Scroll right"
              >
                <Icon icon="mdi:chevron-right" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalogue?category=${cat.slug}`}
                className="group snap-start shrink-0 w-[168px] h-[140px] bg-white border border-primary-200/60 rounded-2xl p-4 flex flex-col justify-between hover:border-primary-400 hover:shadow-md transition-all"
              >
                <span className="font-display font-semibold text-primary-900">{cat.name}</span>
                <Icon icon={cat.icon} className="w-9 h-9 self-end group-hover:scale-110 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-primary-50/40 py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
              Share, borrow, repeat
            </h2>
            <p className="text-primary-500/70 mt-3 text-sm md:text-base">
              Three simple steps to start sharing with your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => (
              <div key={step.title} className="bg-white rounded-2xl border border-primary-200/40 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-100 flex items-center justify-center">
                  <Icon icon={step.icon} className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-display font-semibold text-primary-900 text-lg mt-4">{step.title}</h3>
                <p className="text-primary-500/70 text-sm mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ITEMS ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-900">
                Featured <span className="text-primary-600">Items</span>
              </h2>
              <p className="text-primary-500/60 text-sm mt-1">Popular items in the community</p>
            </div>
            <Link
              to="/catalogue"
              className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1"
            >
              View all
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'The Art of War', author: 'Sun Tzu', available: true },
              { title: 'Data Structures', author: 'Pawan Singh', available: true },
              { title: 'Game Controller', author: 'Jane Doe', available: false },
            ].map((item, index) => (
              <div key={index} className="card group">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100/50 to-primary-200/20 rounded-xl flex items-center justify-center relative">
                  <img src="/grayBook.png" alt={item.title} className="w-16 h-16 opacity-30 group-hover:scale-110 transition-transform" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                    item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.available ? 'Available' : 'Borrowed'}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-primary-800">{item.title}</h3>
                  <p className="text-sm text-primary-500/50">by {item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary-900 py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Ready to share and borrow?
          </h2>
          <p className="text-primary-200/70 max-w-md mx-auto mb-8 text-sm md:text-base">
            Join the community today. It's free, easy, and eco-friendly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-white text-primary-900 hover:bg-primary-50 transition-colors inline-flex items-center gap-2"
            >
              Get started free
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Link>
            <Link
              to="/catalogue"
              className="px-6 py-3 rounded-lg font-semibold text-sm text-white border border-white/25 hover:bg-white/10 transition-colors"
            >
              Browse items
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home