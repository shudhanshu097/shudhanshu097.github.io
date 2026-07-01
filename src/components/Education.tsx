import { education } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 border-t border-border" aria-labelledby="education-heading">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <FadeInView className="lg:col-span-4">
            <p className="section-label mb-4">Education</p>
            <h2
              id="education-heading"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink"
            >
              {education.institution}
            </h2>
            <p className="mt-3 text-lg text-ink-muted">{education.programme}</p>
          </FadeInView>

          <FadeInView className="lg:col-span-8" delay={0.08}>
            <TiltCard className="p-6 md:p-8" glowColor="56, 189, 248">
              <h3 className="text-sm font-medium uppercase tracking-wide text-ink-subtle mb-6">
                Relevant Coursework
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {education.coursework.map((course) => (
                  <li key={course}>
                    <span className="inline-block rounded-full border border-border bg-canvas-raised px-4 py-2 text-sm text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
                      {course}
                    </span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
