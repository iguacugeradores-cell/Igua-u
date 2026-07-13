export interface Product {
  id: string;
  name: string;
  category: 'eletrica' | 'mecanica' | 'revisao' | 'geradores' | 'servicos';
  brand: string;
  price: number;
  discountPrice: number;
  installments: number;
  installmentValue: number;
  rating: number;
  tag: 'destaque' | 'lancamento' | 'normal';
  code?: string;
  isConsultation?: boolean;
  description?: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
  date: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'TODOS OS PRODUTOS' },
  { id: 'eletrica', name: 'PEÇAS ELÉTRICAS/ELETRÔNICAS' },
  { id: 'mecanica', name: 'PEÇAS MECÂNICAS' },
  { id: 'revisao', name: 'KITS REVISÃO MECÂNICA' },
  { id: 'geradores', name: 'GRUPOS GERADORES' },
  { id: 'servicos', name: 'SERVIÇOS DE MANUTENÇÃO' },
] as const;

export const BRANDS = [
  { name: 'WEG', logoText: 'WEG', subtitle: 'Motores & Painéis' },
  { name: 'Baudouin', logoText: 'Baudouin', subtitle: 'Motores Diesel' },
  { name: 'DSE', logoText: 'DSE', subtitle: 'Deep Sea Electronics' },
  { name: 'Optima', logoText: 'OPTIMA', subtitle: 'Baterias Premium' },
  { name: 'Teccom', logoText: 'TECCOM', subtitle: 'Aditivos Fuel' },
  { name: 'Chint', logoText: 'CHNT', subtitle: 'Chint Electric' },
];

export const PRODUCTS: Product[] = [
  // MECCANICA & CONTENÇÕES
  {
    id: 'bacia-contencao-125',
    name: 'Bacia de contenção p/ tanque de combustível 125 litros 27cm x 67cm x 85cm',
    category: 'mecanica',
    brand: 'Iguaçu',
    price: 920.76,
    discountPrice: 874.72,
    installments: 6,
    installmentValue: 153.46,
    rating: 5,
    tag: 'normal',
    code: 'pn 1001538508',
    description: 'Bacia metálica reforçada para tanques de gerador, prevenindo vazamentos de óleo diesel e protegendo o meio ambiente de acordo com normas técnicas.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'visor-acrilico-carenagem',
    name: 'Visor acrílico para porta de carenagem de container de gerador',
    category: 'mecanica',
    brand: 'Iguaçu',
    price: 45.70,
    discountPrice: 43.42,
    installments: 6,
    installmentValue: 7.62,
    rating: 4,
    tag: 'normal',
    description: 'Visor de alta resistência mecânica e térmica para inspeção externa do painel de controle do gerador sem necessidade de abrir a carenagem.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'estabilizador-combustivel',
    name: 'Estabilizador / otimizador de combustível STC 10 by Teccom',
    category: 'mecanica',
    brand: 'Teccom',
    price: 114.21,
    discountPrice: 108.50,
    installments: 6,
    installmentValue: 19.04,
    rating: 5,
    tag: 'destaque',
    description: 'Aditivo condicionador de alta performance para combustível diesel. Elimina água, evita proliferação de bactérias e previne oxidação e borras no tanque.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60'
  },

  // FLUIDOS E KITS REVISÃO (FILTROS)
  {
    id: 'arrefecimento-378l',
    name: 'Líquido de arrefecimento Fleetguard ES Compleat 3,78l',
    category: 'revisao',
    brand: 'Fleetguard',
    price: 290.96,
    discountPrice: 276.41,
    installments: 6,
    installmentValue: 48.49,
    rating: 5,
    tag: 'normal',
    code: 'pn CC2820',
    description: 'Aditivo anticongelante e refrigerante de vida estendida para radiadores de motores diesel pesados. Excelente proteção contra cavitação e corrosão.',
    imageUrl: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'arrefecimento-189l',
    name: 'Líquido de arrefecimento Fleetguard ES Compleat 18,9l',
    category: 'revisao',
    brand: 'Fleetguard',
    price: 1090.50,
    discountPrice: 1035.98,
    installments: 6,
    installmentValue: 181.75,
    rating: 5,
    tag: 'normal',
    code: 'pn CC2847',
    description: 'Galão industrial de aditivo refrigerante de altíssima durabilidade. Ideal para frotas de geradores de energia e manutenções de grande porte.',
    imageUrl: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'filtro-combustivel-baudouin',
    name: 'Filtro do óleo combustível Baudouin 4M06G20 / G25 / G41 / G50',
    category: 'revisao',
    brand: 'Baudouin',
    price: 29.58,
    discountPrice: 28.10,
    installments: 6,
    installmentValue: 4.93,
    rating: 5,
    tag: 'destaque',
    code: 'pn 1001538508',
    description: 'Elemento filtrante original de combustível para motores Baudouin de grupos geradores. Garante máxima pureza do diesel que chega aos bicos injetores.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'filtro-oleo-baudouin',
    name: 'Filtro de óleo lubrificante Baudouin 4M06G41 / G50',
    category: 'revisao',
    brand: 'Baudouin',
    price: 73.71,
    discountPrice: 70.02,
    installments: 6,
    installmentValue: 12.29,
    rating: 5,
    tag: 'destaque',
    code: 'pn 1001562599',
    description: 'Filtro de lubrificante original de alta vazão para garantir a perfeita viscosidade do óleo e retenção de micropartículas no motor diesel Baudouin.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'filtro-ar-baudouin',
    name: 'Filtro de ar Baudouin 4M06G / 4M10G',
    category: 'revisao',
    brand: 'Baudouin',
    price: 303.02,
    discountPrice: 287.87,
    installments: 6,
    installmentValue: 50.50,
    rating: 5,
    tag: 'destaque',
    code: 'pn 1001069804',
    description: 'Filtro de ar de admissão primário de altíssima eficiência. Protege as câmaras de combustão contra poeira e detritos de suspensão.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'filtro-gas-baudouin',
    name: 'Elemento do filtro de gás Baudouin 6M33G6N06',
    category: 'revisao',
    brand: 'Baudouin',
    price: 0,
    discountPrice: 0,
    installments: 0,
    installmentValue: 0,
    rating: 5,
    tag: 'destaque',
    code: 'pn 1006408342',
    isConsultation: true,
    description: 'Elemento filtrante específico para geradores alimentados a gás natural ou biogás Baudouin. Produto técnico sob consulta para dimensionamento correto.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'filtro-separador-baudouin',
    name: 'Filtro de óleo separador d\'água Baudouin 6M16G250/308',
    category: 'revisao',
    brand: 'Baudouin',
    price: 216.66,
    discountPrice: 205.83,
    installments: 6,
    installmentValue: 36.11,
    rating: 5,
    tag: 'destaque',
    code: 'pn 1001044161',
    description: 'Filtro decantador/separador de água de alto rendimento. Essencial para evitar a corrosão do sistema de injeção provocada pela umidade no diesel.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },

  // PEÇAS ELÉTRICAS/ELETRÔNICAS
  {
    id: 'controlador-dse-4520',
    name: 'Aparelho controlador (módulo) comando gerador Deep Sea DSE 4520 MKII',
    category: 'eletrica',
    brand: 'DSE',
    price: 1347.68,
    discountPrice: 1280.30,
    installments: 6,
    installmentValue: 224.61,
    rating: 5,
    tag: 'destaque',
    description: 'Módulo de controle de falha de rede (AMF) extremamente confiável. Monitoramento completo de motor, gerador, rede e alarmes de proteção automática.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'bloco-contato-weg',
    name: 'Bloco de contato lateral WEG BCXML11',
    category: 'eletrica',
    brand: 'WEG',
    price: 303.02,
    discountPrice: 287.87,
    installments: 6,
    installmentValue: 47.98,
    rating: 5,
    tag: 'lancamento',
    code: 'pn 10459053',
    description: 'Bloco de contatos auxiliares laterais para contatores de transferência. Alta confiabilidade nas manobras elétricas do gerador.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'disjuntor-chint-125a',
    name: 'Disjuntor tripolar Chint NXB-125 C125 125A',
    category: 'eletrica',
    brand: 'Chint',
    price: 107.03,
    discountPrice: 101.68,
    installments: 6,
    installmentValue: 17.84,
    rating: 5,
    tag: 'lancamento',
    code: 'pn nxb125-3-125c',
    description: 'Mini disjuntor termomagnético tripolar de 125 amperes. Perfeita proteção contra sobrecarga e curto-circuito em instalações industriais.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'disjuntor-chint-70a',
    name: 'Disjuntor tripolar Chint NXB-80 C70 70A',
    category: 'eletrica',
    brand: 'Chint',
    price: 83.64,
    discountPrice: 79.46,
    installments: 6,
    installmentValue: 13.94,
    rating: 5,
    tag: 'lancamento',
    code: 'pn 442794',
    description: 'Mini disjuntor termomagnético robusto para circuitos auxiliares de grupos geradores ou painéis de comando automático.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'regulador-tensao-weg',
    name: 'Regulador eletrônico de tensão KVA/WEG K38P1 7A 160-300V',
    category: 'eletrica',
    brand: 'WEG',
    price: 1109.06,
    discountPrice: 1053.61,
    installments: 6,
    installmentValue: 184.84,
    rating: 5,
    tag: 'lancamento',
    description: 'AVR (Automatic Voltage Regulator) analógico de alta performance. Mantém a tensão de saída do gerador perfeitamente estabilizada contra flutuações de carga.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60'
  },

  // GRUPOS GERADORES (EQUIPAMENTOS COMPLETOS)
  {
    id: 'grupo-geradores',
    name: 'Grupo Geradores',
    category: 'geradores',
    brand: 'Iguaçu',
    price: 0,
    discountPrice: 0,
    installments: 0,
    installmentValue: 0,
    rating: 5,
    tag: 'destaque',
    isConsultation: true,
    description: 'Encontre a solução ideal em grupos geradores para a sua necessidade. Atendemos aplicações residenciais, comerciais, industriais e rurais, oferecendo orientação técnica para indicar o equipamento mais adequado. Clique no botão do WhatsApp e solicite um orçamento sem compromisso.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'
  },

  // SERVIÇOS DE MANUTENÇÃO E SUPORTE
  {
    id: 'servico-preventiva',
    name: 'Contrato de Manutenção Preventiva Mensal de Gerador',
    category: 'servicos',
    brand: 'Iguaçu',
    price: 0,
    discountPrice: 0,
    installments: 0,
    installmentValue: 0,
    rating: 5,
    tag: 'destaque',
    isConsultation: true,
    description: 'Assegure o pleno funcionamento do seu gerador quando a energia faltar! Visitas regulares, verificação de fluidos, carga de bateria, limpeza do radiador e testes periódicos de partida.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'servico-corretiva',
    name: 'Manutenção Corretiva Emergencial & Plantão 24h',
    category: 'servicos',
    brand: 'Iguaçu',
    price: 0,
    discountPrice: 0,
    installments: 0,
    installmentValue: 0,
    rating: 5,
    tag: 'destaque',
    isConsultation: true,
    description: 'Seu gerador parou no meio de uma emergência? Nossa equipe técnica altamente especializada está de prontidão 24 horas por dia, 7 dias por semana para te atender no local imediatamente.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'servico-instalacao-qta',
    name: 'Instalação e Programação de QTA (Quadro de Transferência)',
    category: 'servicos',
    brand: 'Iguaçu',
    price: 1200.00,
    discountPrice: 1140.00,
    installments: 6,
    installmentValue: 200.00,
    rating: 5,
    tag: 'normal',
    description: 'Instalação técnica profissional de quadros de comando automático. Garante que seu gerador assuma a carga do estabelecimento em até 8 segundos após a queda de energia da concessionária.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    company: 'Supermercado Todo Dia',
    text: 'A Iguaçu Geradores salvou nosso estoque de frios! O gerador apresentou falha num domingo à noite e o atendimento do plantão 24h chegou em 40 minutos. Super recomendo a assistência técnica deles!',
    rating: 5,
    date: '10/06/2026'
  },
  {
    id: '2',
    name: 'Fernanda Silveira',
    company: 'Condomínio Residencial Bella Vista',
    text: 'Fechamos o contrato de manutenção preventiva mensal há 1 ano. Desde então, nunca mais tivemos problemas com falta de energia. Os técnicos são pontuais, educados e extremamente organizados.',
    rating: 5,
    date: '18/05/2026'
  },
  {
    id: '3',
    name: 'Ricardo Nogueira',
    company: 'Granja Vale Verde',
    text: 'Comprei o gerador de 150 kVA silenciado para nossa granja e também as peças de revisão. Preço justo, envio rápido e suporte técnico incrível no dimensionamento. Empresa séria!',
    rating: 5,
    date: '02/04/2026'
  }
];
