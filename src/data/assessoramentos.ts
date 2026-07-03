export interface Assessoramento {
  id: string
  titulo: string
  descricao: string
  regiao: string
  municipio?: string
  tipo: 'regionalizado' | 'municipal' | 'temático'
  url: string
  data: string
  ano?: number
  tags: string[]
}

export const assessoramentos: Assessoramento[] = [
  // ── Regionalizados ──────────────────────────────────────────────
  {
    id: 'regional-baixadas-litoraneas',
    titulo: 'Assessoramento Regionalizado — Baixadas Litorâneas',
    descricao:
      'Assessoramento técnico da COOVIG para a região das Baixadas Litorâneas, com orientações para implantação e fortalecimento da Vigilância Socioassistencial nos municípios da região.',
    regiao: 'Baixadas Litorâneas',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-baixadas-litoraneas.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Baixadas Litorâneas', 'Assessoramento'],
  },
  {
    id: 'regional-centro-sul',
    titulo: 'Assessoramento Regionalizado — Centro-Sul',
    descricao:
      'Assessoramento técnico da COOVIG para a região Centro-Sul fluminense, abordando estratégias de vigilância socioassistencial e apoio às equipes municipais.',
    regiao: 'Centro-Sul',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-centro-sul.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Centro-Sul', 'Assessoramento'],
  },
  {
    id: 'regional-metro-i-ii',
    titulo: 'Assessoramento Regionalizado — Metro I e II',
    descricao:
      'Assessoramento técnico da COOVIG para as regiões Metropolitanas I e II, com diretrizes para consolidação da vigilância socioassistencial nos municípios metropolitanos.',
    regiao: 'Metro I e II',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-metro-i-ii.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Metro I', 'Metro II', 'Assessoramento'],
  },
  {
    id: 'regional-medio-paraiba-costa-verde',
    titulo: 'Assessoramento Regionalizado — Médio Paraíba e Costa Verde',
    descricao:
      'Assessoramento técnico da COOVIG para as regiões do Médio Paraíba e Costa Verde, com orientações técnicas para o aprimoramento da vigilância socioassistencial.',
    regiao: 'Médio Paraíba e Costa Verde',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-medio-paraiba-costa-verde.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Médio Paraíba', 'Costa Verde', 'Assessoramento'],
  },
  {
    id: 'regional-noroeste',
    titulo: 'Assessoramento Regionalizado — Noroeste',
    descricao:
      'Assessoramento técnico da COOVIG para a região Noroeste fluminense, com suporte técnico para estruturação da vigilância socioassistencial nos municípios da região.',
    regiao: 'Noroeste',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-noroeste.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Noroeste', 'Assessoramento'],
  },
  {
    id: 'regional-norte-fluminense',
    titulo: 'Assessoramento Regionalizado — Norte Fluminense',
    descricao:
      'Assessoramento técnico da COOVIG para a região Norte Fluminense, abordando ferramentas e metodologias para a vigilância socioassistencial.',
    regiao: 'Norte Fluminense',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-norte-fluminense.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Norte Fluminense', 'Assessoramento'],
  },
  {
    id: 'regional-serrana',
    titulo: 'Assessoramento Regionalizado — Serrana',
    descricao:
      'Assessoramento técnico da COOVIG para a região Serrana do Estado do Rio de Janeiro, com orientações para implantação e monitoramento da vigilância socioassistencial.',
    regiao: 'Serrana',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-serrana.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Serrana', 'Assessoramento'],
  },
  {
    id: 'regional-novas-gestoes',
    titulo: 'Assessoramento — Novas Gestões Municipais',
    descricao:
      'Assessoramento técnico da COOVIG voltado para novas gestões municipais, com orientações iniciais para implantação da Vigilância Socioassistencial.',
    regiao: 'Novas Gestões Municipais',
    tipo: 'regionalizado',
    url: '/docs/assessoramento-novas-gestoes.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Regionalizado', 'Novas Gestões', 'Assessoramento'],
  },

  // ── Municipais ──────────────────────────────────────────────────
  {
    id: 'municipal-carmo',
    titulo: 'Assessoramento Municipal — Carmo',
    descricao:
      'Assessoramento técnico da COOVIG ao município de Carmo para fortalecimento da Vigilância Socioassistencial local.',
    regiao: 'Carmo',
    municipio: 'Carmo',
    tipo: 'municipal',
    url: '/docs/assessoramento-carmo.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Municipal', 'Carmo', 'Assessoramento'],
  },
  {
    id: 'municipal-itaguai',
    titulo: 'Assessoramento Municipal — Itaguaí',
    descricao:
      'Assessoramento técnico da COOVIG ao município de Itaguaí para aprimoramento dos processos de vigilância socioassistencial.',
    regiao: 'Itaguaí',
    municipio: 'Itaguaí',
    tipo: 'municipal',
    url: '/docs/assessoramento-itaguai.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Municipal', 'Itaguaí', 'Assessoramento'],
  },
  {
    id: 'municipal-paraty',
    titulo: 'Assessoramento Municipal — Paraty',
    descricao:
      'Assessoramento técnico da COOVIG ao município de Paraty para estruturação e fortalecimento da Vigilância Socioassistencial.',
    regiao: 'Paraty',
    municipio: 'Paraty',
    tipo: 'municipal',
    url: '/docs/assessoramento-paraty.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Municipal', 'Paraty', 'Assessoramento'],
  },
  {
    id: 'municipal-mendes-conferencia',
    titulo: '14ª Conferência Municipal de Assistência Social — Mendes',
    descricao:
      'Assessoramento da COOVIG ao município de Mendes para realização da 14ª Conferência Municipal de Assistência Social.',
    regiao: 'Mendes',
    municipio: 'Mendes',
    tipo: 'municipal',
    url: '/docs/conferencia-mendes.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Municipal', 'Mendes', 'Conferência', 'Assessoramento'],
  },

  // ── Temáticos ───────────────────────────────────────────────────
  {
    id: 'tematico-implantacao-guia',
    titulo: 'Guia de Implantação da Vigilância Socioassistencial',
    descricao:
      'Guia prático elaborado pela COOVIG para orientar a implantação da Vigilância Socioassistencial nos municípios fluminenses, com roteiro passo a passo.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/assessoramento-implantacao-2026-guia.pdf',
    data: '2026-01-01',
    ano: 2026,
    tags: ['Temático', 'Implantação', 'Guia', 'Vigilância'],
  },
  {
    id: 'tematico-implantacao-base',
    titulo: 'Implantação da Vigilância Socioassistencial — Documento Base',
    descricao:
      'Documento base com fundamentos e diretrizes para implantação da Vigilância Socioassistencial, elaborado pela COOVIG como referência para os municípios.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/assessoramento-implantacao-2026.pdf',
    data: '2026-01-01',
    ano: 2026,
    tags: ['Temático', 'Implantação', 'Documento Base', 'Vigilância'],
  },
  {
    id: 'tematico-implantacao-simplificado',
    titulo: 'Implementação Simplificada da Vigilância Socioassistencial',
    descricao:
      'Versão simplificada do roteiro de implementação da Vigilância Socioassistencial, com linguagem acessível e etapas essenciais para os municípios.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/assessoramento-implantacao-simplificado.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Temático', 'Implementação', 'Simplificado', 'Vigilância'],
  },
  {
    id: 'tematico-diagnostico-educacao-permanente',
    titulo: 'Diagnóstico de Educação Permanente da Vigilância Socioassistencial',
    descricao:
      'Diagnóstico sobre as necessidades de educação permanente na Vigilância Socioassistencial, com propostas de capacitação e aperfeiçoamento para as equipes municipais.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/assessoramento-diagnostico-educacao-permanente.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Temático', 'Diagnóstico', 'Educação Permanente', 'Capacitação'],
  },
  {
    id: 'tematico-rma-assessoramento',
    titulo: 'Roteiro de Assessoramento Integrado — RMA',
    descricao:
      'Roteiro para assessoramento integrado da COOVIG sobre o Registro Mensal de Atendimentos (RMA), com orientações para preenchimento e análise dos dados.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/rma-roteiro-assessoramento.pdf',
    data: '2024-01-01',
    ano: 2024,
    tags: ['Temático', 'RMA', 'Roteiro', 'Registro Mensal'],
  },
  {
    id: 'tematico-suas-em-dados-manual',
    titulo: 'SUAS em Dados — Manual de Instruções',
    descricao:
      'Manual de instruções da plataforma SUAS em Dados para assessoramento técnico, com orientações sobre funcionalidades e uso da ferramenta pelas equipes municipais.',
    regiao: 'Estadual',
    tipo: 'temático',
    url: '/docs/suas-em-dados-manual-instrucoes.pdf',
    data: '2025-01-01',
    ano: 2025,
    tags: ['Temático', 'SUAS em Dados', 'Manual', 'Instruções'],
  },
]
