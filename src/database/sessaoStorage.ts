import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_SESSAO = '@eventuca:usuario_id';

export const sessaoStorage = {
  // Salva o ID do usuário ao logar ou cadastrar
  async salvarUsuarioId(id: number): Promise<void> {
    await AsyncStorage.setItem(CHAVE_SESSAO, String(id));
  },

  // Obtém o ID do usuário autenticado no aparelho atual
  async obterUsuarioId(): Promise<number | null> {
    const valor = await AsyncStorage.getItem(CHAVE_SESSAO);
    return valor ? Number(valor) : null;
  },

  // Limpa a sessão ao clicar em LogOut
  async removerSessao(): Promise<void> {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
  },
};