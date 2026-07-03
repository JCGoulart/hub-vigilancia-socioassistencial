import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  pergunta: string
  resposta: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [])

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span>{item.pergunta}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'flex-shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? contentHeight : 0 }}
      >
        <div
          ref={contentRef}
          className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          {item.resposta}
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (openIds.size === items.length) {
      setOpenIds(new Set())
    } else {
      setOpenIds(new Set(items.map((item) => item.id)))
    }
  }

  const allExpanded = openIds.size === items.length

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={toggleAll}
          className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          {allExpanded ? 'Recolher todas' : 'Expandir todas'}
        </button>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openIds.has(item.id)}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
