import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────

interface FeedbackData {
  type: 'useful' | 'not-useful'
  timestamp: number
  comment?: string
}

export interface FeedbackWidgetProps {
  /** ID único da seção para persistir feedback no localStorage */
  sectionId: string
  /** Título da seção para contexto */
  sectionTitle: string
}

// ── localStorage helpers ──────────────────────────────────────

function getStorageKey(sectionId: string): string {
  return `feedback-${sectionId}`
}

function loadFeedback(sectionId: string): FeedbackData | null {
  try {
    const raw = localStorage.getItem(getStorageKey(sectionId))
    if (!raw) return null
    return JSON.parse(raw) as FeedbackData
  } catch {
    return null
  }
}

function saveFeedback(sectionId: string, data: FeedbackData): void {
  try {
    localStorage.setItem(getStorageKey(sectionId), JSON.stringify(data))
  } catch {
    // localStorage indisponível — falha silenciosa
  }
}

// ── Icons ───────────────────────────────────────────────────────

function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function ThumbsDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 15v3a3 3 0 0 1-3 3l-4-9V2h11.28a2 2 0 0 1 2 1.7l1.38 9a2 2 0 0 1-2 2.3H14zM7 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────

export function FeedbackWidget({ sectionId, sectionTitle }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'useful' | 'not-useful' | null>(null)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [existing, setExisting] = useState<FeedbackData | null>(null)
  const [commentSaved, setCommentSaved] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ── Mount: carregar estado salvo ─────────────────────────────
  useEffect(() => {
    const saved = loadFeedback(sectionId)
    if (saved) {
      setExisting(saved)
      setFeedback(saved.type)
      setComment(saved.comment ?? '')
      setSubmitted(true)
      if (saved.comment) {
        setCommentSaved(true)
      }
    }
  }, [sectionId])

  // ── Foco no textarea quando expandir ─────────────────────────
  useEffect(() => {
    if (showComment && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [showComment])

  // ── Handlers ─────────────────────────────────────────────────

  const handleFeedback = useCallback(
    (type: 'useful' | 'not-useful') => {
      const data: FeedbackData = { type, timestamp: Date.now() }
      saveFeedback(sectionId, data)
      setFeedback(type)
      setSubmitted(true)
      setCommentSaved(false)
    },
    [sectionId],
  )

  const handleSaveComment = useCallback(() => {
    const trimmed = comment.trim()
    const data: FeedbackData = {
      type: feedback as 'useful' | 'not-useful',
      timestamp: Date.now(),
      comment: trimmed || undefined,
    }
    saveFeedback(sectionId, data)
    setShowComment(false)
    setCommentSaved(true)
  }, [comment, feedback, sectionId])

  const handleReset = useCallback(() => {
    // Remove do localStorage
    try {
      localStorage.removeItem(getStorageKey(sectionId))
    } catch {
      // falha silenciosa
    }
    setFeedback(null)
    setSubmitted(false)
    setComment('')
    setShowComment(false)
    setExisting(null)
    setCommentSaved(false)
  }, [sectionId])

  const handleCancelComment = useCallback(() => {
    setShowComment(false)
    setComment(existing?.comment ?? '')
  }, [existing])

  // ── Render ──────────────────────────────────────────────────

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 animate-on-scroll',
      )}
      role="group"
      aria-label={`Feedback sobre: ${sectionTitle}`}
    >
      {/* Título */}
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        Este conteúdo foi útil?
      </p>

      {/* Botões de feedback */}
      <div className="flex gap-3" role="group" aria-label="Avaliação de utilidade">
        <button
          onClick={() => handleFeedback('useful')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-2',
            submitted && feedback === 'useful'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
              : submitted
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-50 cursor-not-allowed'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600',
          )}
          disabled={submitted && feedback !== 'useful'}
          aria-pressed={submitted && feedback === 'useful'}
          type="button"
        >
          <ThumbsUpIcon />
          Útil
        </button>

        <button
          onClick={() => handleFeedback('not-useful')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-2',
            submitted && feedback === 'not-useful'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700'
              : submitted
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-50 cursor-not-allowed'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600',
          )}
          disabled={submitted && feedback !== 'not-useful'}
          aria-pressed={submitted && feedback === 'not-useful'}
          type="button"
        >
          <ThumbsDownIcon />
          Não útil
        </button>
      </div>

      {/* Estado pós-submissão */}
      {submitted && (
        <div className="mt-4 space-y-3">
          {/* Agradecimento + link "Alterar" */}
          <div className="flex items-center justify-between">
            <p
              className={cn(
                'text-sm font-medium',
                feedback === 'useful'
                  ? 'text-institucional-green dark:text-green-400'
                  : 'text-red-600 dark:text-red-400',
              )}
            >
              {feedback === 'useful'
                ? 'Obrigado pelo feedback!'
                : 'Obrigado! Seu feedback é importante.'}
            </p>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors"
              type="button"
            >
              Alterar
            </button>
          </div>

          {/* Comentário opcional */}
          {!showComment ? (
            <button
              onClick={() => setShowComment(true)}
              className={cn(
                'text-xs inline-flex items-center gap-1.5 transition-colors rounded px-2 py-1 -ml-2',
                'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
                'hover:bg-slate-100 dark:hover:bg-slate-700',
              )}
              type="button"
              aria-expanded={false}
              aria-controls={`feedback-comment-${sectionId}`}
            >
              <CommentIcon />
              {commentSaved ? 'Editar comentário' : 'Deixar comentário'}
            </button>
          ) : (
            /* Área de comentário com animação expand/collapse */
            <div
              id={`feedback-comment-${sectionId}`}
              className="overflow-hidden transition-all duration-300 ease-out max-h-48"
            >
              <div className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={commentSaved ? 'Edite seu comentário (opcional)' : 'Deixe seu comentário (opcional)'}
                  rows={3}
                  className="w-full mt-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-institucional-blue/50 transition-all"
                  aria-label="Seu comentário sobre este conteúdo"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelComment}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveComment}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-institucional-blue hover:bg-institucional-blue/90 text-white shadow-sm transition-all"
                    type="button"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
