import { ArrowUp } from 'lucide-react'
import { links, site } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-sm font-semibold text-ink">{site.name}</p>
            <p className="mt-1 text-sm text-ink-subtle">
              {site.tagline} · IIM Jammu
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={14} aria-hidden="true" />
              Top
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-ink-subtle">
          &copy; {site.year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
