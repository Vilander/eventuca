import { type SQLiteDatabase } from 'expo-sqlite';

export async function iniciarBancoDados(database: SQLiteDatabase) {
  // 1. Criação das tabelas
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

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

    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      evento_id INTEGER NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY (evento_id) REFERENCES eventos(id)
    );
  `);

  // 2. Rotina de Seed (Popula se a tabela estiver vazia)
  // const total = await database.getFirstAsync<{ total: number }>(
  //   'SELECT COUNT(*) as total FROM eventos'
  // );

  // if (total && total.total === 0) {
  //   const statement = await database.prepareAsync(`
  //     INSERT INTO eventos (
  //       titulo, descricao, data, categorias, presencial, online,
  //       certificado, gratuito, preco, linkOficial, facebook, instagram,
  //       linkedin, imagemUri
  //     ) VALUES ($titulo, $descricao, $data, $categorias, $presencial, $online,
  //       $certificado, $gratuito, $preco, $linkOficial, $facebook, $instagram,
  //       $linkedin, $imagemUri)
  //   `);

  //   try {
  //     // Evento 1
  //     await statement.executeAsync({
  //       $titulo: 'DevFest Americana 2026',
  //       $descricao: 'Maior conferência de tecnologia e desenvolvimento da região com palestras sobre IA, Cloud e Mobile.',
  //       $data: '22 nov 2026',
  //       $categorias: JSON.stringify(['Conferência', 'Workshop', 'Feira Tech']),
  //       $presencial: 1,
  //       $online: 0,
  //       $certificado: 1,
  //       $gratuito: 1,
  //       $preco: 'GRATUITO',
  //       $linkOficial: 'https://gdgamericana.dev',
  //       $facebook: '',
  //       $instagram: 'https://instagram.com/gdgamericana',
  //       $linkedin: 'https://linkedin.com/company/gdgamericana',
  //       $imagemUri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop',
  //     });

  //     // Evento 2
  //     await statement.executeAsync({
  //       $titulo: 'AWS Community Day Campinas',
  //       $descricao: 'Encontro técnico focado em computação em nuvem, arquitetura serverless e DevOps promovido pela comunidade AWS.',
  //       $data: '27 set 2026',
  //       $categorias: JSON.stringify(['Meetup', 'Conferência']),
  //       $presencial: 1,
  //       $online: 0,
  //       $certificado: 1,
  //       $gratuito: 0,
  //       $preco: 'R$ 45,00',
  //       $linkOficial: 'https://awscommunitycampinas.com',
  //       $facebook: '',
  //       $instagram: 'https://instagram.com/awsugcampinas',
  //       $linkedin: '',
  //       $imagemUri: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop',
  //     });

  //     // Evento 3
  //     await statement.executeAsync({
  //       $titulo: 'Hackathon Inovação Aberta',
  //       $descricao: 'Maratona de 48 horas de programação com desafios reais, mentoria especializada e premiações em dinheiro.',
  //       $data: '15 out 2026',
  //       $categorias: JSON.stringify(['Hackathon', 'Bootcamp']),
  //       $presencial: 0,
  //       $online: 1,
  //       $certificado: 1,
  //       $gratuito: 1,
  //       $preco: 'GRATUITO',
  //       $linkOficial: 'https://hackathon.tech',
  //       $facebook: '',
  //       $instagram: '',
  //       $linkedin: '',
  //       $imagemUri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop',
  //     });
  //   } finally {
  //     await statement.finalizeAsync();
  //   }
  // }
}