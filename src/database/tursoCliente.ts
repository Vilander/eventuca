import { createClient } from '@libsql/client/web';

const url = process.env.EXPO_PUBLIC_TURSO_URL;
const authToken = process.env.EXPO_PUBLIC_TURSO_TOKEN;

if (!url || !authToken) {
  console.warn(
    'Atenção: As variáveis de ambiene (EXPO_PUBLIC_TURSO_URL ou EXPO_PUBLIC_TURSO_TOKEN) não foram configurados no .env'
  );
}

// O prefixo libsql:// ou https:// é obrigatório para conexões web/HTTP
const urlFormatada = url?.startsWith('http') || url?.startsWith('libsql://')
  ? url
  : `https://${url}`;

export const turso = createClient({
  url: urlFormatada,
  authToken: authToken ?? '',
});