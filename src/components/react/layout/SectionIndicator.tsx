import { useState, useEffect, useCallback } from 'react'

interface Section {
  id: string
  label: string
}

interface SectionIndicatorProps {
  sections: Section[]
}

export function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sectionEls = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    if (!sectionEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sectionEls.indexOf(entry.target as HTMLElement)
            if (index >= 0) setActiveIndex(index)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sectionEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <nav
      className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 translate-y-[calc(-50%+10px)]'
      }`}
      aria-label="Navegação por seções"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
          aria-label={`Ir para ${section.label}`}
          title={section.label}
        >
          <span
            className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-institucional-blue dark:bg-blue-400 scale-125 shadow-lg shadow-institucional-blue/30'
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 scale-100'
            }`}
          />
          <span className="absolute right-full mr-3 px-2 py-1 rounded bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
