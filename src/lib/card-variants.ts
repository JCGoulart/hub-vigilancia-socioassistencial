import { cva } from 'class-variance-authority'

export const cardVariants = cva(
  'rounded-xl transition-all duration-300 gradient-border-card',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1',
        glass: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-white/20 dark:border-slate-700/50 shadow-lg',
        elevated: 'bg-white dark:bg-slate-800 border-transparent shadow-xl hover:shadow-2xl',
        ghost: 'bg-transparent border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800',
      },
      accent: {
        blue: 'hover:border-institucional-blue/50 dark:hover:border-blue-500/50',
        green: 'hover:border-institucional-green/50 dark:hover:border-green-500/50',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      accent: 'none',
    },
  },
)
