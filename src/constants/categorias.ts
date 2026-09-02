export const CATEGORIAS_EVENTO = [
  'Hackathon',
  'Workshop',
  'Bootcamp',
  'Game Jam',
  'Meetup',
  'Tech Talk',
  'Happy Hour',
  'Conferência',
  'Summit',
  'Feira Tech',
  'Webinar',
  'Fórum',
] as const;

export const CATEGORIAS_FILTRO = ['Todos', ...CATEGORIAS_EVENTO] as const;