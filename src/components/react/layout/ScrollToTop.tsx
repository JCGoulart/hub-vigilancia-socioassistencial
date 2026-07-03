import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(pct)
      setVisible(scrollTop > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const circumference = 2 * Math.PI * 20 // radius 20

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-institucional-blue dark:text-blue-400 hover:scale-110 transition-all duration-300 inline-flex items-center justify-center"
    >
      <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        <circle
          cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
