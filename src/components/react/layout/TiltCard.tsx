'use client'

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'

/**
 * Props para o componente TiltCard.
 *
 * Aplica um efeito 3D de inclinação (tilt) ao cartão conforme a posição
 * do mouse, usando apenas transformações aceleradas por GPU.
 */
interface TiltCardProps {
  /** Conteúdo do cartão */
  children: ReactNode
  /** Classes CSS adicionais repassadas ao elemento raiz */
  className?: string
  /** Rotação máxima em graus (padrão: 8) */
  maxTilt?: number
  /** Distância da perspectiva em px (padrão: 800) */
  perspective?: number
  /** Escala ao passar o mouse (padrão: 1.02) */
  scale?: number
}

/**
 * TiltCard — cartão com efeito 3D de inclinação por movimento do mouse.
 *
 * Respeita a preferência `prefers-reduced-motion: reduce` do sistema,
 * desabilitando a animação quando ativada.
 *
 * Uso em Astro:
 * ```astro
 * <TiltCard client:visible className="...">
 *   <SeuConteudo />
 * </TiltCard>
 * ```
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 800,
  scale = 1.02,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      // Normaliza para -0.5 a 0.5 (centro do elemento = 0)
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      containerRef.current.style.transform = `perspective(${perspective}px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`
      containerRef.current.style.transition = ''
    },
    [reducedMotion, perspective, maxTilt, scale],
  )

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    containerRef.current.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`
    containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
  }, [perspective])

  const handleMouseEnter = useCallback(() => {
    if (!containerRef.current) return
    containerRef.current.style.transition = 'transform 0.1s ease-out'
  }, [])

  // Se o usuário prefere movimento reduzido, renderiza uma div simples
  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  )
}
