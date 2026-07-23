export interface Product {
  id: string;
  name: string;
  category: 'geradores';
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
  { id: 'geradores', name: 'PROJETOS DE GERADORES' },
] as const;

export const BRANDS = [
  { name: 'Iguaçu', logoText: 'Iguaçu', subtitle: 'Grupos Geradores' },
  { name: 'Baudouin', logoText: 'Baudouin', subtitle: 'Motores Diesel' },
  { name: 'WEG', logoText: 'WEG', subtitle: 'Alternadores & Painéis' },
  { name: 'Cummins', logoText: 'Cummins', subtitle: 'Motores Premium' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'gerador-sob-medida',
    name: 'GRUPO GERADOR DIESEL SOB MEDIDA',
    category: 'geradores',
    brand: 'Iguaçu',
    price: 0,
    discountPrice: 0,
    installments: 12,
    installmentValue: 0,
    rating: 5,
    tag: 'destaque',
    code: 'IG-CUSTOM',
    isConsultation: true,
    description: 'Não trabalhamos com uma lista fixa de equipamentos engessados. Na Iguaçu Geradores, cada projeto é único: realizamos o levantamento técnico detalhado, o dimensionamento preciso e desenvolvemos grupos geradores totalmente personalizados (abertos ou cabinados silenciados) para atender exatamente a sua demanda de energia, garantindo máxima eficiência e confiabilidade.',
    imageUrl: 'https://i.postimg.cc/cHVLqJMf/Whats-App-Image-2026-07-16-at-14-51-07.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    company: 'Supermercado Todo Dia',
    text: 'A Iguaçu Geradores projetou o gerador ideal para o nosso supermercado. O dimensionamento técnico foi perfeito para a nossa demanda de carga de frios, e a instalação ocorreu sem interrupções.',
    rating: 5,
    date: '10/06/2026'
  },
  {
    id: '2',
    name: 'Fernanda Silveira',
    company: 'Condomínio Residencial Bella Vista',
    text: 'Tivemos uma falha inesperada no nosso grupo gerador e a equipe da Iguaçu Geradores prestou um atendimento corretivo com muita agilidade. O problema foi identificado e solucionado rapidamente, restabelecendo o funcionamento do equipamento e evitando maiores prejuízos.',
    rating: 5,
    date: '18/05/2026'
  },
  {
    id: '3',
    name: 'Ricardo Nogueira',
    company: 'Granja Vale Verde',
    text: 'Para o setor de agronegócio, o dimensionamento preciso faz toda a diferença. O gerador sob medida da Iguaçu garante a energia das nossas estufas sem oscilações. Suporte excelente!',
    rating: 5,
    date: '02/04/2026'
  }
];
