import { useSQLiteContext } from 'expo-sqlite';

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
  const database = useSQLiteContext();

  // --- GERENCIAMENTO DE SESSÃO ATIVA ---

  async function iniciarSessao(usuarioId: number) {
    await database.runAsync(
      'INSERT OR REPLACE INTO sessao (id, usuario_id) VALUES (1, ?)',
      [usuarioId]
    );
  }

  async function encerrarSessao() {
    await database.runAsync('DELETE FROM sessao WHERE id = 1');
  }

  async function obterSessaoAtiva(): Promise<number | null> {
    try {
      const registro = await database.getFirstAsync<{ usuario_id: number }>(
        'SELECT usuario_id FROM sessao WHERE id = 1'
      );
      return registro?.usuario_id ?? null;
    } catch {
      return null;
    }
  }

  async function obterUsuarioLogado(): Promise<UsuarioRegistro | null> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return null;
    return await buscarUsuarioPorId(usuarioId);
  }

  // --- OPERAÇÕES DE EVENTOS ---

  async function criarEvento(evento: EventoCriacao) {
    // Se nenhum usuario_id foi passado manualmente, usa a sessão ativa
    const usuarioIdFinal = evento.usuario_id ?? (await obterSessaoAtiva());

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
        $usuario_id: usuarioIdFinal,
      });

      return { inseridoId: resultado.lastInsertRowId };
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function listarTodos() {
    return await database.getAllAsync<EventoRegistro>(
      'SELECT * FROM eventos ORDER BY id DESC'
    );
  }

  async function buscarPorId(id: number) {
    return await database.getFirstAsync<EventoRegistro>(
      'SELECT * FROM eventos WHERE id = ?',
      [id]
    );
  }

  // --- OPERAÇÕES DE FAVORITOS MULTIUSUÁRIO ---

  async function isFavorito(eventoId: number): Promise<boolean> {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return false;

    try {
      const registro = await database.getFirstAsync<{ id: number }>(
        'SELECT id FROM favoritos WHERE evento_id = ? AND usuario_id = ?',
        [eventoId, usuarioId]
      );
      return !!registro;
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
      await database.runAsync(
        'DELETE FROM favoritos WHERE evento_id = ? AND usuario_id = ?',
        [eventoId, usuarioId]
      );
      return false;
    } else {
      await database.runAsync(
        'INSERT INTO favoritos (evento_id, usuario_id) VALUES (?, ?)',
        [eventoId, usuarioId]
      );
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
      return await database.getAllAsync<EventoRegistro>(consulta, [usuarioId]);
    } catch {
      return [];
    }
  }

  // --- OPERAÇÕES DE USUÁRIO E AUTENTICAÇÃO ---

async function cadastrarUsuario(usuario: UsuarioCriacao) {
    try {
      // Garante que a tabela sessao existe caso o banco seja antigo
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS sessao (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          usuario_id INTEGER,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `);

      const statement = await database.prepareAsync(`
        INSERT INTO usuarios (
          nome, email, endereco, numero, complemento, estado, cidade, senha, receberNotificacoes
        ) VALUES ($nome, $email, $endereco, $numero, $complemento, $estado, $cidade, $senha, $receberNotificacoes)
      `);

      try {
        const resultado = await statement.executeAsync({
          $nome: usuario.nome,
          $email: usuario.email,
          $endereco: usuario.endereco ?? '',
          $numero: usuario.numero ?? '',
          $complemento: usuario.complemento ?? '',
          $estado: usuario.estado ?? '',
          $cidade: usuario.cidade ?? '',
          $senha: usuario.senha ?? '',
          $receberNotificacoes: usuario.receberNotificacoes ?? 0,
        });

        const novoId = Number(resultado.lastInsertRowId);
        await iniciarSessao(novoId);
        return { inseridoId: novoId };
      } finally {
        await statement.finalizeAsync();
      }
    } catch (erro) {
      console.error('ERRO DETALHADO NO CADASTRO SQLite:', erro);
      throw erro;
    }
  }

  async function autenticarUsuario(loginIdentificador: string, senhaDigitada: string) {
    const consulta = `
      SELECT * FROM usuarios 
      WHERE (email = ? OR nome = ?) AND senha = ?
    `;
    const usuario = await database.getFirstAsync<UsuarioRegistro>(consulta, [
      loginIdentificador,
      loginIdentificador,
      senhaDigitada,
    ]);

    if (usuario) {
      await iniciarSessao(usuario.id);
    }

    return usuario;
  }

  async function buscarUsuarioPorId(id: number) {
    return await database.getFirstAsync<UsuarioRegistro>(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
  }

  async function obterMetricasUsuario() {
    const usuarioId = await obterSessaoAtiva();
    if (!usuarioId) return { totalCriados: 0, totalSalvos: 0 };

    try {
      const criados = await database.getFirstAsync<{ total: number }>(
        'SELECT COUNT(*) as total FROM eventos WHERE usuario_id = ?',
        [usuarioId]
      );

      const consultaSalvos = `
        SELECT e.data
        FROM eventos e
        INNER JOIN favoritos f ON f.evento_id = e.id
        WHERE f.usuario_id = ?
      `;
      const salvos = await database.getAllAsync<{ data: string }>(consultaSalvos, [usuarioId]);

      const hoje = new Date();
      const salvosAtivos = salvos.filter((item) => {
        const dataEvento = converterDataString(item.data);
        if (!dataEvento) return true;
        return dataEvento >= hoje;
      });

      return {
        totalCriados: criados?.total ?? 0,
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