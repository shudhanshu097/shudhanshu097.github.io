import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PageLoader() {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setDone(true)
      return
    }

    let frame: number
    const start = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)
      if (next < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 300)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reducedMotion])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="w-full max-w-xs px-6 text-center">
            <p className="section-label mb-3">System initialization</p>
            <p className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
              {progress}%
            </p>
            <div className="mt-6 h-px w-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-4 text-sm text-ink-subtle">
              Initializing analytics engine
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
