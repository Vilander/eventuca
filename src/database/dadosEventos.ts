// Importação da imagem de teste a partir do diretório de assets
import ImgTeste from '../../assets/gallery/teste.jpg';

export type Evento = {
  id: string;
  titulo: string;
  data: string;
  local?: string;
  categoria: string;
  descricao?: string;
  presencial?: boolean;
  online?: boolean;
  gratuito?: boolean;
  certificado?: boolean;
  preco?: string;
  categorias?: string[];
  linkOficial?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  imagem?: any;
};

const dadosEventos: Evento[] = [
  {
    id: '1',
    titulo: 'Devops Days São Paulo',
    data: '13 jun 2026',
    local: 'São Paulo (SP)',
    categoria: 'Conferência',
    descricao: 'DevOpsDays é um evento comunitário de tecnologia focado em DevOps, cloud, automação e cultura ágil, reunindo palestras, debates técnicos e networking...',
    presencial: true,
    online: false,
    gratuito: true,
    certificado: true,
    categorias: ['Feira Tech', 'Conferência', 'Workshop'],
    linkOficial: 'https://devopsdays.org',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    imagem: ImgTeste,
  },
  {
    id: '2',
    titulo: 'Meetup HackerX',
    data: '27 jun 2026',
    local: 'Online',
    categoria: 'Meetup',
    descricao: 'Ingresso para empregadores no HackerX São Paulo: evento exclusivo de recrutamento e networking para profissionais de TI.',
    presencial: false,
    online: true,
    gratuito: false,
    preco: '$ 250,00',
    certificado: false,
    categorias: ['Meetup', 'Tech Talk'],
    linkOficial: 'https://hackerx.org',
    imagem: ImgTeste,
  },
  {
    id: '3',
    titulo: 'ERP Summit 2026',
    data: '14 jul 2026',
    local: 'Expo Center Norte - SP',
    categoria: 'Summit',
    descricao: 'O maior evento sobre software de gestão da América Latina. Reúne os principais players do mercado e lideranças do setor.',
    presencial: true,
    online: false,
    gratuito: true,
    certificado: true,
    categorias: ['Summit', 'Conferência'],
    linkOficial: 'https://erpsummit.com.br',
    imagem: ImgTeste,
  },
  {
    id: '4',
    titulo: 'DebConf 2026',
    data: '11 out 2026',
    local: 'Campinas - SP',
    categoria: 'Hackathon',
    descricao: 'A conferência anual de desenvolvedores e colaboradores do projeto Debian. Foco total em software livre, Linux e infraestrutura.',
    presencial: true,
    online: true,
    gratuito: false,
    preco: 'R$ 170,00',
    certificado: true,
    categorias: ['Hackathon', 'Workshop', 'Fórum'],
    linkOficial: 'https://debconf.org',
  },
  {
    id: '5',
    titulo: 'AWS Community Day',
    data: '20 ago 2026',
    local: 'Online',
    categoria: 'Webinar',
    descricao: 'Evento técnico organizado por usuários da comunidade AWS com palestras sobre arquitetura serverless, inteligência artificial e segurança.',
    presencial: false,
    online: true,
    gratuito: true,
    certificado: true,
    categorias: ['Webinar', 'Tech Talk'],
    linkOficial: 'https://aws.amazon.com',
    imagem: ImgTeste,
  },
  {
    id: '6',
    titulo: 'Bootcamp IA Aplicada',
    data: '05 set 2026',
    local: 'São Paulo - SP',
    categoria: 'Bootcamp',
    descricao: 'Imersão prática de 2 dias construindo aplicações reais utilizando Modelos de Linguagem e visão computacional.',
    presencial: true,
    online: false,
    gratuito: false,
    preco: 'R$ 350,00',
    certificado: true,
    categorias: ['Bootcamp', 'Workshop'],
    linkOficial: 'https://example.com',
  },
  {
    id: '7',
    titulo: 'Game Jam Indiegames',
    data: '18 nov 2026',
    local: 'Online',
    categoria: 'Game Jam',
    descricao: 'Maratona de 48 horas para criação de jogos independentes do zero. Aberto a programadores, designers e músicos.',
    presencial: false,
    online: true,
    gratuito: true,
    certificado: false,
    categorias: ['Game Jam', 'Hackathon'],
    linkOficial: 'https://example.com',
    imagem: ImgTeste,
  },
];

export default dadosEventos;