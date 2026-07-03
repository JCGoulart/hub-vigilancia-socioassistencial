export interface Membro {
  nome: string
  cargo: string
  formacao?: string
  email?: string
  foto?: string
}

export const equipe: Membro[] = [
  {
    nome: 'Matheus Lopes',
    cargo: 'Coordenador',
    formacao: 'Gestor Público',
    email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  },
  {
    nome: 'Junier Goulart',
    cargo: 'Assessor',
    formacao: 'Cientista de Dados',
    email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  },
  {
    nome: 'Matheus de Freitas',
    cargo: 'Assessor',
    formacao: 'Programador',
    email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  },
]
