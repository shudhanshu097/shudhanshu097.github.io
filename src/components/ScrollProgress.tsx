import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPercent(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <span className="sr-only" aria-live="polite">
        Page scroll progress: {percent}%
      </span>
    </>
  )
}
