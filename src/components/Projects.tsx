import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { projects } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

function ProjectShowcase({
  project,
  index,
}: {
  project: (typeof projects.featured)[number]
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const glowRgb = project.accent === '#34d399' ? '52, 211, 153' : '56, 189, 248'

  return (
    <FadeInView delay={index * 0.08}>
      <TiltCard className="overflow-hidden" glowColor={glowRgb}>
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-sm text-ink-subtle">{project.number}</span>
                <span
                  className="h-px flex-1 max-w-16"
                  style={{ backgroundColor: project.accent }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-accent text-sm font-medium">{project.subtitle}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                {project.description}
              </p>
            </div>

            <dl className="flex gap-8 md:gap-10 shrink-0">
              {project.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="text-[10px] uppercase tracking-wider text-ink-subtle">{s.label}</dt>
                  <dd
                    className="mt-1 font-display text-2xl font-semibold"
                    style={{ color: project.accent }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-canvas-raised px-3 py-1 text-xs font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2" aria-label="Project pipeline">
            {project.pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="text-xs font-medium text-ink-subtle px-2 py-1 rounded border border-border/50">
                  {step}
                </span>
                {i < project.pipeline.length - 1 && (
                  <span className="text-ink-subtle text-xs" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-8 flex items-center gap-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? 'Hide details' : 'View full breakdown'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`grid gap-4 overflow-hidden transition-all duration-300 ${
              expanded ? 'mt-6 max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {project.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-border bg-canvas-raised p-5"
              >
                <h4 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {section.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{section.content}</p>
              </div>
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:border-accent/50 hover:text-accent"
          >
            View on GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </TiltCard>
    </FadeInView>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 border-t border-border"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">What I Build</p>
          <h2
            id="projects-heading"
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink"
          >
            Featured projects
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            End-to-end analytics work — from raw data to business recommendations.
          </p>
        </FadeInView>

        <div className="mt-16 space-y-8">
          {projects.featured.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
