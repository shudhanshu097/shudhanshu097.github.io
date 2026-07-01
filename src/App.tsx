import { lazy, Suspense } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { SmoothScroll } from './components/SmoothScroll'
import { PageLoader } from './components/PageLoader'
import { Footer } from './components/Footer'

const About = lazy(() =>
  import('./components/About').then((m) => ({ default: m.About })),
)
const Education = lazy(() =>
  import('./components/Education').then((m) => ({ default: m.Education })),
)
const Skills = lazy(() =>
  import('./components/Skills').then((m) => ({ default: m.Skills })),
)
const Projects = lazy(() =>
  import('./components/Projects').then((m) => ({ default: m.Projects })),
)
const Experience = lazy(() =>
  import('./components/Experience').then((m) => ({ default: m.Experience })),
)
const Certifications = lazy(() =>
  import('./components/Certifications').then((m) => ({ default: m.Certifications })),
)
const Learning = lazy(() =>
  import('./components/Learning').then((m) => ({ default: m.Learning })),
)
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return <div className="py-24" aria-hidden="true" />
}

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <PageLoader />
      <Nav />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Learning />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
