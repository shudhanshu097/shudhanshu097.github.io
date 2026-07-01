import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, FileText, UserRound } from 'lucide-react'
import { heroStats, links, projects, site } from '../content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { TiltCard } from './TiltCard'

const linkItems = [
  { label: 'Resume', href: links.resume, icon: FileText, external: true },
  { label: 'GitHub', href: links.github, icon: Code2, external: true },
  { label: 'LinkedIn', href: links.linkedin, icon: UserRound, external: true },
] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
}

const line = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const featured = projects.featured[0]

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % site.rotatingPhrases.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [reducedMotion])

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 glow-orb opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 glow-orb opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7"
            variants={reducedMotion ? undefined : container}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
          >
            <motion.p variants={reducedMotion ? undefined : line} className="section-label mb-6">
              {site.badge}
            </motion.p>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              <motion.span variants={reducedMotion ? undefined : line} className="block gradient-text">
                {site.name.split(' ')[0]}
              </motion.span>
              <motion.span variants={reducedMotion ? undefined : line} className="block text-ink mt-1">
                {site.name.split(' ').slice(1).join(' ')}
              </motion.span>
            </h1>

            <motion.p
              variants={reducedMotion ? undefined : line}
              className="mt-4 text-lg text-ink-muted"
            >
              {site.tagline} · IIM Jammu
            </motion.p>

            <motion.p
              variants={reducedMotion ? undefined : line}
              className="mt-6 text-xl md:text-2xl text-ink-muted leading-relaxed"
            >
              I turn raw data into{' '}
              <span className="inline-block min-w-[12ch] text-accent font-medium" aria-live="polite">
                {site.rotatingPhrases[phraseIndex]}
              </span>
            </motion.p>

            <motion.div
              variants={reducedMotion ? undefined : line}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {linkItems.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-canvas-raised/80 px-5 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:border-accent/50 hover:bg-accent-soft"
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </motion.div>

            <motion.dl
              variants={reducedMotion ? undefined : line}
              className="mt-14 flex gap-10"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wider text-ink-subtle">{stat.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="p-6 md:p-8" glowColor="56, 189, 248">
              <p className="section-label mb-4">Featured pipeline</p>
              <h2 className="font-display text-xl font-semibold text-ink">{featured.title}</h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{featured.subtitle}</p>

              <div className="mt-6 flex items-center gap-2" aria-label="Data pipeline steps">
                {featured.pipeline.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-md bg-canvas-raised border border-border px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
                      {step}
                    </span>
                    {i < featured.pipeline.length - 1 && (
                      <span className="text-ink-subtle text-xs" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-canvas border border-border p-4 font-mono text-xs text-ink-muted">
                <span className="text-accent">analyst@iimj</span> ~ pipeline
                <br />
                <span className="text-ink-subtle">$</span> python pipeline.py --source sales_db
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-4">
                {featured.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <dt className="text-[10px] uppercase tracking-wider text-ink-subtle">{s.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-accent">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="#projects"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                Explore projects
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ink-subtle">
        <motion.span
          className="block h-10 w-px bg-border"
          animate={reducedMotion ? {} : { scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  )
}
