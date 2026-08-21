import { useSQLiteContext } from "expo-sqlite";

export type EventoRegistro = {
  id: number;
  titulo:string;
  descricao?: string;
  data: string;
  categorias: string;
  presencial: number;
  online: number;
  certificado: number;
  gratuito: number;
  preco?: string;
  linkOficial?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  imagemUri?: string;
  usuario_id?: number;
};

export type EventoCriacao = Omit<EventoRegistro, 'id'>;

export function useEventoDatabase(){
  const database = useSQLiteContext();

  // Inserir novo evento
  async function criarEvento(evento: EventoCriacao) {
    const statement = await database.prepareAsync(`
      INSERT INTO eventos (
        titulo, descricao, data, categorias, presencial, online,
        certificado, gratuito, preco, linkOficial, facebook, instagram,
        linkedin, imagemUri, usuario_id
      ) VALUES ($titulo, $descricao, $data, $categorias, $presencial, $online,
        $certificado, $gratuito, $preco, $linkOficial, $facebook, $instagram,
        $linkedin, $imagemUri, $usuario_id)
    `);

    try {
      const resultado = await statement.executeAsync({
        $titulo: evento.titulo,
        $descricao: evento.descricao ?? '',
        $data: evento.data,
        $categorias: evento.categorias,
        $presencial: evento.presencial,
        $online: evento.online,
        $certificado: evento.certificado,
        $gratuito: evento.gratuito,
        $preco: evento.preco ?? '',
        $linkOficial: evento.linkOficial ?? '',
        $facebook: evento.facebook ?? '',
        $instagram: evento.instagram ?? '',
        $linkedin: evento.linkedin ?? '',
        $imagemUri: evento.imagemUri ?? '',
        $usuario_id: evento.usuario_id ?? null,
      });

      return { inseridoId: resultado.lastInsertRowId };
    } finally {
      await statement.finalizeAsync();
    }
  }

  // Listar todos os eventos (usado na Tela Inicial)
  async function listarTodos() {
    try {
      const consulta = 'SELECT * FROM eventos ORDER BY id DESC';
      return await database.getAllAsync<EventoRegistro>(consulta);
    } catch (erro) {
      throw erro;
    }
  }

  // Buscar evento por ID (usado na Tela de Detalhes [id].tsx)
  async function buscarPorId(id: number) {
    try {
      const consulta = 'SELECT * FROM eventos WHERE id = ?';
      return await database.getFirstAsync<EventoRegistro>(consulta, [id]);
    } catch (erro) {
      throw erro;
    }
  }

  return {
    criarEvento,
    listarTodos,
    buscarPorId,
  };
}