import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cartaoEvento: {
    backgroundColor: colors.gray[800],
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  etiquetaCartao: {
    alignSelf: 'flex-start',
    backgroundColor: colors.orange[500],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  textoEtiqueta: { 
    color: colors.white, 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  tituloEvento: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colors.white 
  },
  descricaoEvento: { 
    color: colors.gray[400], 
    marginVertical: 8, 
    fontSize: 13 
  },
  rodapeLinha: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },
  textoData: {
    color: colors.gray[400],
  },
  etiquetaPreco: { 
    color: colors.green[500], 
    fontWeight: 'bold' 
  },
});