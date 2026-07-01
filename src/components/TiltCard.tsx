import { useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'a' | 'article'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  glowColor?: string
}

function useTiltStyle(glowColor: string) {
  const [style, setStyle] = useState<CSSProperties>({})
  const reducedMotion = useReducedMotion()

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reducedMotion) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5

    setStyle({
      transform: `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-2px)`,
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(${glowColor}, 0.12), transparent 40%)`,
      transition: 'transform 200ms ease, background 200ms ease',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)',
      background: 'transparent',
      transition: 'transform 200ms ease, background 200ms ease',
    })
  }

  return {
    style: reducedMotion ? undefined : style,
    handleMouseMove,
    handleMouseLeave,
  }
}

export function TiltCard({
  children,
  className = '',
  as = 'div',
  href,
  target,
  rel,
  onClick,
  glowColor = '56, 189, 248',
}: TiltCardProps) {
  const { style, handleMouseMove, handleMouseLeave } = useTiltStyle(glowColor)

  const inner = (
    <>
      <div className="noise-texture absolute inset-0 pointer-events-none opacity-50" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </>
  )

  const baseClass = `card-surface relative overflow-hidden ${className}`

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }

  if (as === 'article') {
    return (
      <article
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        onClick={onClick}
      >
        {inner}
      </article>
    )
  }

  return (
    <div
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      onClick={onClick}
    >
      {inner}
    </div>
  )
}
