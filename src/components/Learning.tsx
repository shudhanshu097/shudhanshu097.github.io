import { Check, Circle, Lock } from 'lucide-react'
import { learningRoadmap } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

const statusConfig = {
  completed: {
    icon: Check,
    label: 'Completed',
    color: 'text-emerald-400',
    dot: 'bg-emerald-400',
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/10',
  },
  'in-progress': {
    icon: Circle,
    label: 'In Progress',
    color: 'text-accent',
    dot: 'bg-accent',
    border: 'border-accent/30',
    bg: 'bg-accent-soft',
  },
  upcoming: {
    icon: Lock,
    label: 'Upcoming',
    color: 'text-ink-subtle',
    dot: 'bg-ink-subtle',
    border: 'border-border',
    bg: 'bg-canvas-raised',
  },
} as const

export function Learning() {
  return (
    <section
      id="learning"
      className="py-24 md:py-32 border-t border-border"
      aria-labelledby="learning-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">Growth</p>
          <h2
            id="learning-heading"
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink"
          >
            Learning roadmap
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            A structured path from foundations to advanced analytics — always building.
          </p>
        </FadeInView>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {learningRoadmap.map((phase, index) => {
            const config = statusConfig[phase.status]
            const Icon = config.icon
            return (
              <FadeInView key={phase.phase} delay={index * 0.06}>
                <TiltCard className={`p-6 h-full border ${config.border}`} glowColor="56, 189, 248">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
                    <Icon size={12} aria-hidden="true" />
                    {config.label}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{phase.phase}</h3>
                  <ul className="mt-4 space-y-2" role="list">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${config.dot}`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {phase.status === 'upcoming' && (
                    <p className="mt-4 text-xs text-ink-subtle italic">Unlocks with continued progress</p>
                  )}
                </TiltCard>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
