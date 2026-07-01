import {
  BarChart3,
  Code2,
  Database,
  GitBranch,
  Grid3x3,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { skills } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  chart: BarChart3,
  dashboard: BarChart3,
  layers: Layers,
  grid: Grid3x3,
  git: GitBranch,
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">Skills & Toolkit</p>
          <h2
            id="skills-heading"
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink"
          >
            What I work with
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            Tools and technologies I use to extract, analyze, and communicate insights.
          </p>
        </FadeInView>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon] ?? Code2
            return (
              <FadeInView key={skill.title} delay={index * 0.04}>
                <TiltCard className="p-6 h-full" glowColor="56, 189, 248">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                        {skill.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                        {skill.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft border border-border">
                      <Icon size={18} className="text-accent" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{skill.description}</p>
                </TiltCard>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
