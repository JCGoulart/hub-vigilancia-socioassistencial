import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface ChecklistItem {
  id: string
  label: string
  category?: string
}

interface ChecklistGridProps {
  title: string
  items: ChecklistItem[]
  storageKey: string
}

export function ChecklistGrid({ title, items, storageKey }: ChecklistGridProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {
      /* localStorage not available */
    }
  }, [checked, storageKey])

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const reset = useCallback(() => {
    setChecked({})
  }, [])

  const completedCount = Object.values(checked).filter(Boolean).length
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0

  /* ── Staggered scroll animation ── */
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const animEls = el.querySelectorAll<HTMLElement>('.animate-on-scroll')
    if (!animEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )

    for (const item of animEls) observer.observe(item)
    return () => observer.disconnect()
  }, [items])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      {/* Title */}
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{title}</h3>

      {/* Progress bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 shrink-0">
          {completedCount} de {items.length} itens verificados
        </span>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-1 max-w-40">
          <div
            className="h-full bg-institucional-green transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 stagger"
      >
        {items.map((item) => {
          const isChecked = !!checked[item.id]
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg cursor-pointer text-left w-full transition-colors',
                'hover:bg-slate-50 dark:hover:bg-slate-700/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue focus-visible:ring-offset-2',
                'animate-on-scroll',
              )}
            >
              {/* Checkbox icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isChecked
                    ? 'text-institucional-blue'
                    : 'text-slate-300 dark:text-slate-600',
                )}
                aria-hidden="true"
              >
                {isChecked ? (
                  <>
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </>
                ) : (
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                )}
              </svg>

              {/* Label */}
              <span
                className={cn(
                  'text-sm font-medium transition-colors',
                  isChecked
                    ? 'text-slate-500 dark:text-slate-400 line-through'
                    : 'text-slate-700 dark:text-slate-300',
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Reset button */}
      {completedCount > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="text-xs text-slate-500 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue"
          >
            Limpar checklist
          </button>
        </div>
      )}
    </div>
  )
}
