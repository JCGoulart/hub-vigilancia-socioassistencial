import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { Material } from '@/data/materiais'

interface Props {
  item: Material
}

export default function VideoModal({ item }: Props) {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-institucional-blue/30 dark:hover:border-blue-600/30 transition-all duration-200"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center relative">
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.titulo} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <span className="text-slate-400 text-2xl">🎥</span>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-institucional-blue dark:text-blue-300">vídeo</span>
              <span className="text-[11px] text-slate-400">{item.ano || item.data}</span>
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-institucional-blue dark:group-hover:text-blue-300 transition-colors">
              {item.titulo}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.descricao}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.tags.map(tag => (
                <span key={tag} className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-5xl mx-4 max-sm:max-w-full max-sm:mx-2 bg-slate-900 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-14 px-5 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 shrink-0">{item.tipo}</span>
                {item.ano && (
                  <span className="text-xs text-slate-400 shrink-0">{item.ano}</span>
                )}
                <h2 className="text-lg max-sm:text-base font-semibold text-white truncate">{item.titulo}</h2>
              </div>
              <button
                onClick={handleClose}
                className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${item.embedUrl}?autoplay=1`}
                title={item.titulo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
