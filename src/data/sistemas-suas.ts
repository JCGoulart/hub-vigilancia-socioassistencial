export interface SistemaSuas {
  id: string
  titulo: string
  descricao: string
  sistema: 'Prontuário Eletrônico SUAS' | 'RMA' | 'CNEAS' | 'SAA' | 'SISC' | 'CadSUAS' | 'Estrutura SUAS'
  tipo: 'manual' | 'formulario' | 'guia' | 'apresentacao' | 'faq'
  url: string
  data: string
  tags: string[]
}

export const sistemasSuas: SistemaSuas[] = [
  // ── Prontuário Eletrônico SUAS ──────────────────────────────────
  {
    id: 'prontuario-manual-completo',
    titulo: 'Manual Completo — Prontuário Eletrônico SUAS',
    descricao: 'Manual completo de utilização do Prontuário Eletrônico do SUAS, com orientações para registro e acompanhamento dos atendimentos.',
    sistema: 'Prontuário Eletrônico SUAS',
    tipo: 'manual',
    url: '/docs/prontuario-manual.pdf',
    data: '2025-01-01',
    tags: ['Prontuário', 'Manual', 'SUAS'],
  },
  {
    id: 'prontuario-faq',
    titulo: 'FAQ — Prontuário Eletrônico SUAS',
    descricao: 'Perguntas e respostas frequentes sobre o uso do Prontuário Eletrônico do SUAS no dia a dia dos serviços.',
    sistema: 'Prontuário Eletrônico SUAS',
    tipo: 'faq',
    url: '/docs/prontuario-faq.pdf',
    data: '2025-02-01',
    tags: ['Prontuário', 'FAQ', 'SUAS'],
  },
  {
    id: 'prontuario-assessoramento-coovig',
    titulo: 'Assessoramento COOVIG — Prontuário SUAS',
    descricao: 'Apresentação sobre o assessoramento da COOVIG aos municípios para implantação do Prontuário Eletrônico do SUAS.',
    sistema: 'Prontuário Eletrônico SUAS',
    tipo: 'apresentacao',
    url: '/docs/prontuario-assessoramento.pdf',
    data: '2025-03-01',
    tags: ['Assessoramento', 'COOVIG', 'Prontuário'],
  },
  {
    id: 'prontuario-acolhimento',
    titulo: 'Apresentação Acolhimento — Prontuário SUAS',
    descricao: 'Materiais de acolhimento e ambientação para novos usuários do Prontuário Eletrônico do SUAS.',
    sistema: 'Prontuário Eletrônico SUAS',
    tipo: 'apresentacao',
    url: '/docs/prontuario-acolhimento.pdf',
    data: '2025-03-15',
    tags: ['Acolhimento', 'Prontuário', 'SUAS'],
  },
  {
    id: 'prontuario-suas-psb-coovig-rj',
    titulo: 'SUAS PSB COOVIG RJ — Prontuário Eletrônico',
    descricao: 'Apresentação sobre a integração do Prontuário SUAS com a Proteção Social Básica no estado do Rio de Janeiro.',
    sistema: 'Prontuário Eletrônico SUAS',
    tipo: 'apresentacao',
    url: '/docs/prontuario-suas-psb.pdf',
    data: '2025-04-01',
    tags: ['PSB', 'COOVIG', 'RJ', 'Prontuário'],
  },

  // ── RMA ─────────────────────────────────────────────────────────
  {
    id: 'rma-manual-cras-2022',
    titulo: 'Manual RMA — CRAS 2022',
    descricao: 'Manual de preenchimento do Registro Mensal de Atendimento (RMA) para unidades CRAS.',
    sistema: 'RMA',
    tipo: 'manual',
    url: '/docs/rma-manual-cras-2022.pdf',
    data: '2022-01-01',
    tags: ['RMA', 'CRAS', 'Manual', 'Registro'],
  },
  {
    id: 'rma-manual-creas-2022',
    titulo: 'Manual RMA — CREAS 2022',
    descricao: 'Manual de preenchimento do Registro Mensal de Atendimento (RMA) para unidades CREAS.',
    sistema: 'RMA',
    tipo: 'manual',
    url: '/docs/rma-manual-creas-2022.pdf',
    data: '2022-01-01',
    tags: ['RMA', 'CREAS', 'Manual', 'Registro'],
  },
  {
    id: 'rma-manual-centro-pop-2022',
    titulo: 'Manual RMA — Centro POP 2022',
    descricao: 'Manual de preenchimento do Registro Mensal de Atendimento (RMA) para unidades Centro POP.',
    sistema: 'RMA',
    tipo: 'manual',
    url: '/docs/rma-manual-centro-pop-2022.pdf',
    data: '2022-01-01',
    tags: ['RMA', 'Centro POP', 'Manual', 'Registro'],
  },
  // ── CNEAS ───────────────────────────────────────────────────────
  {
    id: 'cneas-guia-preenchimento',
    titulo: 'Guia de Preenchimento — CNEAS',
    descricao: 'Guia detalhado para o preenchimento correto do Cadastro Nacional de Entidades de Assistência Social.',
    sistema: 'CNEAS',
    tipo: 'guia',
    url: '/docs/cneas-guia-preenchimento.pdf',
    data: '2025-01-01',
    tags: ['CNEAS', 'Guia', 'Preenchimento'],
  },
  {
    id: 'cneas-perguntas-respostas',
    titulo: 'Perguntas e Respostas — CNEAS',
    descricao: 'Compilado de perguntas e respostas sobre o cadastro e a atualização de dados no CNEAS.',
    sistema: 'CNEAS',
    tipo: 'faq',
    url: '/docs/cneas-perguntas-respostas.pdf',
    data: '2025-02-01',
    tags: ['CNEAS', 'FAQ', 'Perguntas', 'Respostas'],
  },
  {
    id: 'cneas-questionario-beneficios',
    titulo: 'Questionário — Benefícios Eventuais — CNEAS',
    descricao: 'Questionário do CNEAS para registro de informações sobre a oferta de benefícios eventuais.',
    sistema: 'CNEAS',
    tipo: 'formulario',
    url: '/docs/cneas-questionario-beneficios.pdf',
    data: '2025-02-15',
    tags: ['CNEAS', 'Questionário', 'Benefícios Eventuais'],
  },
  {
    id: 'cneas-questionario-programas',
    titulo: 'Questionário — Programas e Projetos — CNEAS',
    descricao: 'Questionário do CNEAS para registro de informações sobre programas e projetos de assistência social.',
    sistema: 'CNEAS',
    tipo: 'formulario',
    url: '/docs/cneas-questionario-programas-projetos.pdf',
    data: '2025-02-15',
    tags: ['CNEAS', 'Questionário', 'Programas', 'Projetos'],
  },
  {
    id: 'cneas-questionario-servicos',
    titulo: 'Questionário — Serviços — CNEAS',
    descricao: 'Questionário do CNEAS para registro de informações sobre os serviços socioassistenciais ofertados.',
    sistema: 'CNEAS',
    tipo: 'formulario',
    url: '/docs/cneas-questionario-servicos.pdf',
    data: '2025-02-15',
    tags: ['CNEAS', 'Questionário', 'Serviços'],
  },

  // ── SAA ─────────────────────────────────────────────────────────
  {
    id: 'saa-catalogo-perfis',
    titulo: 'Catálogo de Perfis — SAA v3.3',
    descricao: 'Catálogo de perfis de acesso do Sistema de Atendimento ao Assistido (SAA), versão 3.3.',
    sistema: 'SAA',
    tipo: 'manual',
    url: '/docs/saa-catalogo-perfis.pdf',
    data: '2025-01-01',
    tags: ['SAA', 'Perfis', 'Catálogo', 'Acesso'],
  },
  {
    id: 'saa-manual',
    titulo: 'Manual SAA v2',
    descricao: 'Manual do Sistema de Atendimento ao Assistido (SAA), versão 2, com orientações de uso e funcionalidades.',
    sistema: 'SAA',
    tipo: 'manual',
    url: '/docs/saa-manual.pdf',
    data: '2025-01-01',
    tags: ['SAA', 'Manual', 'Atendimento'],
  },

  // ── SISC ────────────────────────────────────────────────────────
  {
    id: 'sisc-manual-gestor',
    titulo: 'Manual do Gestor Municipal — SISC',
    descricao: 'Manual do Sistema de Informação sobre a Situação da Criança e do Adolescente (SISC) para gestores municipais.',
    sistema: 'SISC',
    tipo: 'manual',
    url: '/docs/sisc-manual-gestor.pdf',
    data: '2025-01-01',
    tags: ['SISC', 'Manual', 'Gestor', 'Criança', 'Adolescente'],
  },

  // ── CadSUAS ─────────────────────────────────────────────────────
  {
    id: 'cadsuas-manual',
    titulo: 'Manual CadSUAS v4.1',
    descricao: 'Manual de utilização do Cadastro Nacional do SUAS (CadSUAS), versão 4.1, com instruções para cadastro e manutenção.',
    sistema: 'CadSUAS',
    tipo: 'manual',
    url: '/docs/cadsuas-manual.pdf',
    data: '2025-01-01',
    tags: ['CadSUAS', 'Manual', 'Cadastro'],
  },

  // ── Estrutura SUAS ──────────────────────────────────────────────
  {
    id: 'estrutura-suas-guia-pratico',
    titulo: 'Guia Prático do Gestor — Estrutura SUAS',
    descricao: 'Guia prático para gestores municipais sobre a utilização do sistema Estrutura SUAS.',
    sistema: 'Estrutura SUAS',
    tipo: 'guia',
    url: '/docs/estrutura-suas-guia-pratico.pdf',
    data: '2025-01-01',
    tags: ['Estrutura SUAS', 'Guia Prático', 'Gestor'],
  },
  {
    id: 'estrutura-suas-manual-sigtv',
    titulo: 'Manual SIGTV — Estrutura SUAS',
    descricao: 'Manual do Sistema de Informação do Gestão do Trabalho e da Vigilância (SIGTV), atualizado para o Estrutura SUAS.',
    sistema: 'Estrutura SUAS',
    tipo: 'manual',
    url: '/docs/estrutura-suas-manual-sigtv.pdf',
    data: '2025-01-01',
    tags: ['SIGTV', 'Estrutura SUAS', 'Manual', 'Gestão'],
  },
]
