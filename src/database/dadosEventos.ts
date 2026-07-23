export type Evento = {
  id: string;
  titulo: string;
  data: string;
  local: string;
  categoria: string;
};

const dadosEventos: Evento[] = [
  {
    id: '1',
    titulo: 'Feira de Tecnologia',
    data: '25/07/2026',
    local: 'Centro de Convenções',
    categoria: 'Tecnologia',
  },
  {
    id: '2',
    titulo: 'Festival de Música',
    data: '01/08/2026',
    local: 'Parque Central',
    categoria: 'Música',
  },
];

export default dadosEventos;
