import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[900],
  },
  espacamentoConteudo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  textoSubtitulo: {
    fontSize: 14,
    color: colors.gray[400],
    marginBottom: 16,
  },
  campoTexto: {
    backgroundColor: colors.gray[800],
    color: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
});