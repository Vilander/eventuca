import { sessaoStorage } from './sessaoStorage';
import { turso } from './tursoCliente';

// ================= TIPOS DE EVENTOS =================
export type EventoRegistro = {
  id: number;
  titulo: string;
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

// ================= TIPOS DE USUÁRIOS =================
export type UsuarioRegistro = {
  id: number;
  nome: string;
  email: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  estado?: string;
  cidade?: string;
  senha?: string;
  receberNotificacoes?: number;
};

export type UsuarioCriacao = Omit<UsuarioRegistro, 'id'>;

// ================= UTILITÁRIOS DE DATA =================
const MAPA_MESES: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

function converterDataString(dataStr: string): Date | null {
  try {
    const partes = dataStr.trim().split(' ');
    if (partes.length < 3) return null;

    const dia = parseInt(partes[0], 10);
    const mesTexto = partes[1].toLowerCase();
    const ano = parseInt(partes[2], 10);

    const mes = MAPA_MESES[mesTexto];
    if (mes === undefined || isNaN(dia) || isNaN(ano)) return null;

    return new Date(ano, mes, dia, 23, 59, 59);
  } catch {
    return null;
  }
}

// ================= HOOK DO BANCO =================
export function useEventoDatabase() {
  // --- GERENCIAMENTO DE SESSÃO LOCAL (ASYNCSTORAGE) ---

  async function iniciarSessao(usuarioId: number) {
    await sessaoStorage.salvarUsuarioId(usuarioId);
  }

  async function encerrarSessao() {
    await sessaoStorage.removerSessao();
  }

  async function obterSessaoAtiva(): Promise<number | null> {
    return await sessaoStorage.obterUsuarioId();
  }

  async function obterUsuarioLogado(): Promise<UsuarioRegistro | null> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return null;
    return await buscarUsuarioPorId(usuarioId);
  }

  // --- OPERAÇÕES DE EVENTOS (TURSO) ---

  async function criarEvento(evento: EventoCriacao) {
    const usuarioIdFinal = evento.usuario_id ?? (await obterSessaoAtiva());
    if (!usuarioIdFinal) {
      throw new Error('É necessário estar logado para criar um evento.');
    }
    const resultado = await turso.execute({
      sql: `
        INSERT INTO eventos (
          titulo, descricao, data, categorias, presencial, online,
          certificado, gratuito, preco, linkOficial, facebook, instagram,
          linkedin, imagemUri, usuario_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id
      `,
      args: [
        evento.titulo,
        evento.descricao ?? '',
        evento.data,
        evento.categorias,
        evento.presencial,
        evento.online,
        evento.certificado,
        evento.gratuito,
        evento.preco ?? '',
        evento.linkOficial ?? '',
        evento.facebook ?? '',
        evento.instagram ?? '',
        evento.linkedin ?? '',
        evento.imagemUri ?? '',
        usuarioIdFinal,
      ],
    });

    const inseridoId = Number(resultado.rows[0]?.id ?? resultado.lastInsertRowid);
    return { inseridoId };
  }

  async function listarTodos(): Promise<EventoRegistro[]> {
    const resultado = await turso.execute('SELECT * FROM eventos ORDER BY id DESC');
    return resultado.rows as unknown as EventoRegistro[];
  }

  async function buscarPorId(id: number): Promise<EventoRegistro | null> {
    const resultado = await turso.execute({
      sql: 'SELECT * FROM eventos WHERE id = ?',
      args: [id],
    });

    if (resultado.rows.length === 0) return null;
    return resultado.rows[0] as unknown as EventoRegistro;
  }

  // --- OPERAÇÕES DE FAVORITOS MULTIUSUÁRIO (TURSO) ---

  async function isFavorito(eventoId: number): Promise<boolean> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return false;

    try {
      const resultado = await turso.execute({
        sql: 'SELECT id FROM favoritos WHERE evento_id = ? AND usuario_id = ?',
        args: [eventoId, usuarioId],
      });
      return resultado.rows.length > 0;
    } catch {
      return false;
    }
  }

  async function toggleFavorito(eventoId: number): Promise<boolean> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) {
      throw new Error('Nenhum usuário autenticado.');
    }

    const jaFavorito = await isFavorito(eventoId);

    if (jaFavorito) {
      await turso.execute({
        sql: 'DELETE FROM favoritos WHERE evento_id = ? AND usuario_id = ?',
        args: [eventoId, usuarioId],
      });
      return false;
    } else {
      await turso.execute({
        sql: 'INSERT INTO favoritos (evento_id, usuario_id) VALUES (?, ?)',
        args: [eventoId, usuarioId],
      });
      return true;
    }
  }

  async function listarFavoritos(): Promise<EventoRegistro[]> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return [];

    try {
      const consulta = `
        SELECT e.* 
        FROM eventos e
        INNER JOIN favoritos f ON f.evento_id = e.id
        WHERE f.usuario_id = ?
        ORDER BY f.id DESC
      `;
      const resultado = await turso.execute({
        sql: consulta,
        args: [usuarioId],
      });
      return resultado.rows as unknown as EventoRegistro[];
    } catch {
      return [];
    }
  }

  // --- OPERAÇÕES DE USUÁRIO E AUTENTICAÇÃO (TURSO) ---

  async function cadastrarUsuario(usuario: UsuarioCriacao) {
    try {
      const resultado = await turso.execute({
        sql: `
          INSERT INTO usuarios (
            nome, email, endereco, numero, complemento, estado, cidade, senha, receberNotificacoes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          RETURNING id
        `,
        args: [
          usuario.nome,
          usuario.email,
          usuario.endereco ?? '',
          usuario.numero ?? '',
          usuario.complemento ?? '',
          usuario.estado ?? '',
          usuario.cidade ?? '',
          usuario.senha ?? '',
          usuario.receberNotificacoes ?? 0,
        ],
      });

      const novoId = Number(resultado.rows[0]?.id ?? resultado.lastInsertRowid);
      await iniciarSessao(novoId);
      return { inseridoId: novoId };
    } catch (erro) {
      console.error('ERRO DETALHADO NO CADASTRO TURSO:', erro);
      throw erro;
    }
  }

  async function autenticarUsuario(loginIdentificador: string, senhaDigitada: string) {
    const consulta = `
      SELECT * FROM usuarios 
      WHERE (email = ? OR nome = ?) AND senha = ?
    `;
    const resultado = await turso.execute({
      sql: consulta,
      args: [loginIdentificador, loginIdentificador, senhaDigitada],
    });

    if (resultado.rows.length === 0) return null;

    const usuario = resultado.rows[0] as unknown as UsuarioRegistro;
    await iniciarSessao(usuario.id);
    return usuario;
  }

  async function buscarUsuarioPorId(id: number): Promise<UsuarioRegistro | null> {
    const resultado = await turso.execute({
      sql: 'SELECT * FROM usuarios WHERE id = ?',
      args: [id],
    });

    if (resultado.rows.length === 0) return null;
    return resultado.rows[0] as unknown as UsuarioRegistro;
  }

  async function obterMetricasUsuario() {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return { totalCriados: 0, totalSalvos: 0 };

    try {
      const resCriados = await turso.execute({
        sql: 'SELECT COUNT(*) as total FROM eventos WHERE usuario_id = ?',
        args: [usuarioId],
      });
      const totalCriados = Number(resCriados.rows[0]?.total ?? 0);

      const consultaSalvos = `
        SELECT e.data
        FROM eventos e
        INNER JOIN favoritos f ON f.evento_id = e.id
        WHERE f.usuario_id = ?
      `;
      const resSalvos = await turso.execute({
        sql: consultaSalvos,
        args: [usuarioId],
      });

      const salvos = resSalvos.rows as unknown as { data: string }[];
      const hoje = new Date();
      const salvosAtivos = salvos.filter((item) => {
        const dataEvento = converterDataString(item.data);
        if (!dataEvento) return true;
        return dataEvento >= hoje;
      });

      return {
        totalCriados,
        totalSalvos: salvosAtivos.length,
      };
    } catch {
      return { totalCriados: 0, totalSalvos: 0 };
    }
  }

  return {
    iniciarSessao,
    encerrarSessao,
    obterSessaoAtiva,
    obterUsuarioLogado,
    criarEvento,
    listarTodos,
    buscarPorId,
    isFavorito,
    toggleFavorito,
    listarFavoritos,
    cadastrarUsuario,
    autenticarUsuario,
    buscarUsuarioPorId,
    obterMetricasUsuario,
  };
}