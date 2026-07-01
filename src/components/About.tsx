import { about } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">About</p>
          <h2
            id="about-heading"
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink max-w-2xl"
          >
            Who I am
          </h2>
        </FadeInView>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <FadeInView className="lg:col-span-7 space-y-8" delay={0.05}>
            <p className="text-lg leading-relaxed text-ink-muted">{about.whoIAm}</p>
            <p className="text-lg leading-relaxed text-ink-muted">{about.whyAnalytics}</p>
            <p className="text-lg leading-relaxed text-ink-muted">{about.careerObjective}</p>
          </FadeInView>

          <FadeInView className="lg:col-span-5 space-y-6" delay={0.1}>
            <blockquote className="relative pl-6 border-l-2 border-accent">
              <p className="font-display text-2xl md:text-3xl font-medium leading-snug tracking-tight text-ink text-balance">
                &ldquo;{about.pullQuote}&rdquo;
              </p>
            </blockquote>

            <div className="grid gap-4">
              {about.highlights.map((item) => (
                <TiltCard key={item.label} className="p-5" glowColor="56, 189, 248">
                  <p className="text-xs uppercase tracking-wider text-ink-subtle">{item.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{item.value}</p>
                </TiltCard>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
