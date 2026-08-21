import { type SQLiteDatabase } from 'expo-sqlite';

export async function iniciarBancoDados(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Tabela de Usuários / Perfil
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      endereco TEXT,
      numero TEXT,
      complemento TEXT,
      estado TEXT,
      cidade TEXT,
      senha TEXT NOT NULL,
      notificacoes INTEGER DEFAULT 0
    );

    -- Tabela de Eventos
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data TEXT NOT NULL,
      categorias TEXT NOT NULL,
      presencial INTEGER DEFAULT 0,
      online INTEGER DEFAULT 0,
      certificado INTEGER DEFAULT 0,
      gratuito INTEGER DEFAULT 0,
      preco TEXT,
      linkOficial TEXT,
      facebook TEXT,
      instagram TEXT,
      linkedin TEXT,
      imagemUri TEXT,
      usuario_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );

    -- Tabela de Favoritos / Salvos
    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      evento_id INTEGER NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY (evento_id) REFERENCES eventos(id)
    );
  `);
}
