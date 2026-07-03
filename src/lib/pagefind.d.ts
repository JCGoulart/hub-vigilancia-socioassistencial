declare global {
  interface Window {
    pagefind?: {
      init: () => Promise<void>
      search: (query: string) => Promise<{
        results: Array<{
          data: () => Promise<{
            url: string
            meta?: { title?: string }
            excerpt?: string
            sub_results?: Array<{
              url: string
              title?: string
              excerpt?: string
              plain_excerpt?: string
            }>
          }>
        }>
      }>
    }
  }
}

export {}
