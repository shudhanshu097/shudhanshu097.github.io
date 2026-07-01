import { experience } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 border-t border-border"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">Experience</p>
          <h2
            id="experience-heading"
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink"
          >
            Leadership &amp; involvement
          </h2>
        </FadeInView>

        <ol className="mt-16 relative space-y-6" role="list">
          <div
            className="absolute left-[19px] top-4 bottom-4 w-px bg-border hidden md:block"
            aria-hidden="true"
          />

          {experience.map((item, index) => (
            <FadeInView key={item.org} as="li" delay={index * 0.06}>
              <div className="relative md:pl-12">
                <span
                  className="absolute left-3 top-8 hidden md:block h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-canvas"
                  aria-hidden="true"
                />
                <TiltCard className="p-6 md:p-8" glowColor="56, 189, 248">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-accent">
                        {item.role}
                      </p>
                      <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold tracking-tight text-ink">
                        {item.org}
                      </h3>
                    </div>
                    <time className="text-sm text-ink-subtle shrink-0">{item.period}</time>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </TiltCard>
              </div>
            </FadeInView>
          ))}
        </ol>
      </div>
    </section>
  )
}
