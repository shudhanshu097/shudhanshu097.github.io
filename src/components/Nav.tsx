import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, site } from '../content'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useActiveSection } from '../hooks/useActiveSection'
import { ScrollProgress } from './ScrollProgress'

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hidden = useScrollDirection()
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <ScrollProgress />
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-canvas/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <nav
          className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10"
          aria-label="Main navigation"
        >
          <a
            href="#hero"
            className="font-display text-sm font-semibold tracking-tight text-ink hover:text-accent transition-colors"
            aria-label={`${site.name} — back to top`}
          >
            {site.initials}
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`text-sm transition-colors ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-ink"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden fixed inset-0 top-[57px] bg-canvas/95 backdrop-blur-xl z-40"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col gap-1 px-6 py-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-display text-2xl font-medium tracking-tight text-ink hover:text-accent transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
