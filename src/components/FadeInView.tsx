import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface FadeInViewProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
}

export function FadeInView({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: FadeInViewProps) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 90, damping: 18, delay }
      }
    >
      {children}
    </Component>
  )
}
