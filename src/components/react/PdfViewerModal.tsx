import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Download, ExternalLink, FileText, X } from 'lucide-react'

interface PdfViewerModalProps {
  titulo: string
  descricao: string
  pdfUrl: string
  thumbnail?: string
  tipo: string
  data?: string
  tags: string[]
}

export default function PdfViewerModal({
  titulo,
  descricao,
  pdfUrl,
  thumbnail,
  tipo,
  data,
  tags,
}: PdfViewerModalProps) {
  const [open, setOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
    setIframeLoaded(false)
  }, [])

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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-xl hover:-translate-y-1 hover:border-institucional-blue/30 dark:hover:border-blue-600/30 transition-all duration-300"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            {thumbnail ? (
              <img src={thumbnail} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <FileText className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-institucional-blue dark:text-blue-300">
                {tipo}
              </span>
              {data && (
                <span className="text-[11px] text-slate-400">{data}</span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-institucional-blue dark:group-hover:text-blue-300 transition-colors">
              {titulo}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {descricao}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-7xl h-[92vh] mx-auto mt-4 rounded-xl overflow-hidden shadow-2xl flex flex-col bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white truncate mr-4">
                {titulo}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  download
                  className="rounded-lg hover:bg-white/20 transition-colors text-white px-3 py-1.5 text-sm inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg hover:bg-white/20 transition-colors text-white px-3 py-1.5 text-sm inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir
                </a>
                <button
                  onClick={handleClose}
                  className="rounded-lg hover:bg-white/20 transition-colors text-white px-3 py-1.5 text-sm inline-flex items-center gap-1.5"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
              <div className="w-full lg:w-80 shrink-0 bg-slate-900/80 backdrop-blur p-5 overflow-y-auto max-h-48 lg:max-h-none">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  {tipo}
                </span>
                {data && (
                  <p className="text-sm text-slate-400 mt-1">{data}</p>
                )}
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {descricao}
                </p>
                {tags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase text-slate-500 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-700 text-slate-300 text-xs px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 min-h-0 bg-slate-100 lg:rounded-r-lg relative">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                    <svg className="animate-spin h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                )}
                <iframe
                  src={pdfUrl}
                  title={titulo}
                  className="w-full h-full border-0"
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
