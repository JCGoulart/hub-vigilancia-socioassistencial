import { useState, useEffect, useRef, useCallback } from 'react'

interface SearchResult {
  url: string
  title: string
  excerpt: string
}

export interface SearchBoxProps {
  placeholder?: string
}

let pagefindPromise: Promise<any> | null = null
let pagefindError = false

async function loadPagefind(): Promise<any> {
  if (pagefindError) return null
  if (pagefindPromise) return pagefindPromise

  pagefindPromise = (async () => {
    try {
      const base = import.meta.env.BASE_URL || '/'
      const pf = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`)
      await pf.init()
      return pf
    } catch {
      if (typeof window !== 'undefined' && window.pagefind) {
        const pf = window.pagefind
        if (pf.init) await pf.init()
        return pf
      }
      console.warn('[SearchBox] Pagefind não disponível')
      pagefindPromise = null
      pagefindError = true
      return null
    }
  })()

  return pagefindPromise
}

function scrollToSection(url: string) {
  const hashIndex = url.indexOf('#')
  if (hashIndex === -1) return

  const id = url.substring(hashIndex + 1)
  if (!id) return

  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', `#${id}`)
  }
}

export function SearchBox({ placeholder = 'Buscar...' }: SearchBoxProps = {}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setResults([])
      setError(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const pf = await loadPagefind()
      if (!pf) {
        setError(true)
        return
      }

      const searchResult = await pf.search(q)
      const items: SearchResult[] = []

      for (const result of searchResult.results) {
        const data = await result.data()

        if (data.sub_results && data.sub_results.length > 0) {
          for (const sub of data.sub_results) {
            items.push({
              url: sub.url || data.url,
              title: sub.title || data.meta?.title || '',
              excerpt: sub.excerpt || sub.plain_excerpt || '',
            })
          }
        } else {
          items.push({
            url: data.url,
            title: data.meta?.title || '',
            excerpt: data.excerpt || '',
          })
        }
      }

      setResults(items.slice(0, 8))
    } catch (err) {
      console.error('[SearchBox] Erro na busca:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  /* 200ms debounce */
  useEffect(() => {
    const timer = setTimeout(() => search(query), 200)
    return () => clearTimeout(timer)
  }, [query, search])

  /* Ctrl+K focus | Escape close */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* Click outside close */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        {/* Search icon */}
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
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-institucional-blue/50 focus:border-institucional-blue transition-all"
        />

        {/* Ctrl+K badge */}
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 ml-auto text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
          Ctrl+K
        </kbd>
      </div>

      {/* Results dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 p-4 text-sm text-slate-500 dark:text-slate-400">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Buscando...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="p-4 text-sm text-amber-600 dark:text-amber-400">
              Busca indisponível no momento.
            </div>
          )}

          {/* Empty */}
          {!loading && !error && results.length === 0 && (
            <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
              Nenhum resultado encontrado.
            </div>
          )}

          {/* Results */}
          {!loading && !error && results.length > 0 && (
            <div>
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (r.url.includes('#')) {
                      scrollToSection(r.url)
                    }
                    setOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors"
                >
                  <div className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                    {r.title || 'Resultado'}
                  </div>
                  {r.excerpt && (
                    <div
                      className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: r.excerpt }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
