import { ArrowUpRight, MapPin } from 'lucide-react'
import { links, site } from '../content'
import { FadeInView } from './FadeInView'
import { TiltCard } from './TiltCard'

const contactLinks = [
  {
    label: 'Personal Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'Straight to my inbox — expect a reply within 24 hours.',
  },
  {
    label: 'College Email',
    value: site.collegeEmail,
    href: `mailto:${site.collegeEmail}`,
    note: 'IIM Jammu official correspondence.',
  },
  {
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: links.linkedin,
    external: true,
    note: 'Professional network and updates.',
  },
  {
    label: 'GitHub',
    value: 'View repositories',
    href: links.github,
    external: true,
    note: 'Code, notebooks, and project work.',
  },
] as const

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 md:py-40 border-t border-border"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <FadeInView>
          <p className="section-label mb-4">Contact</p>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold tracking-tight text-ink leading-none"
          >
            Let&apos;s talk
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-muted">
            Open to internships, collaborations, and conversations about analytics and business strategy.
          </p>
        </FadeInView>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactLinks.map((link, index) => (
            <FadeInView key={link.label} delay={index * 0.05}>
              <TiltCard
                as="a"
                href={link.href}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group block p-6"
                glowColor="56, 189, 248"
              >
                <p className="text-xs uppercase tracking-wider text-ink-subtle">{link.label}</p>
                <p className="mt-2 font-display text-xl font-medium text-ink group-hover:text-accent transition-colors flex items-center gap-2">
                  {link.value}
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </p>
                <p className="mt-2 text-sm text-ink-muted">{link.note}</p>
              </TiltCard>
            </FadeInView>
          ))}
        </div>

        <FadeInView className="mt-8" delay={0.2}>
          <div className="inline-flex items-center gap-2 text-sm text-ink-subtle">
            <MapPin size={14} aria-hidden="true" />
            {site.location}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
