import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 md:py-32 border-t border-border"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">Credentials</p>
          <h2
            id="certifications-heading"
            className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink"
          >
            Certifications
          </h2>
        </FadeInView>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <FadeInView key={cert.name} delay={index * 0.05}>
              <TiltCard
                as="a"
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5"
                glowColor="56, 189, 248"
              >
                <span className="font-medium text-ink group-hover:text-accent transition-colors">
                  {cert.name}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-ink-subtle group-hover:text-accent transition-colors"
                  aria-hidden="true"
                />
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
