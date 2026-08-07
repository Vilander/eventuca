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
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[600],
  },
  dotAtivo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
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
  containerBusca: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputBusca: {
    backgroundColor: colors.gray[800],
    color: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  iconeBusca: {
    position: 'absolute',
    right: 14,
  },
  tituloSecao: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: colors.gray[800], 
    marginVertical: 16,   
    marginTop: 24,        
    width: '100%',
  },
  chipCategoria: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: 'transparent',
  },
  chipCategoriaAtivo: {
    backgroundColor: colors.orange[500],
  },
  textoChip: {
    color: colors.orange[400],
    fontSize: 11,
  },
  textoChipAtivo: {
    color: colors.gray[900], 
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  badgeTitulo: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoBadgeTitulo: {
    color: colors.orange[500],
    fontSize: 16,
    fontWeight: 'bold',
  },
  rotulo: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  campoTexto: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.white,
    fontSize: 13,
  },
  campoMultilinha: {
    height: 120,
  },
  botaoData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  textoBotaoData: {
    color: colors.orange[500],
    backgroundColor: colors.orange[500] + '20', // fundo com transparência
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  gridCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  opcaoCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '33%',
    gap: 8,
  },
  boxCheckbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  boxCheckboxAtivo: {
    backgroundColor: colors.orange[500],
  },
  textoOpcao: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  linhaOpcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 1,
  },
  linhaValor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  inputValor: {
    width: 130,
  },
  botaoAdicionarImagem: {
    backgroundColor: colors.orange[600] + '40',
    borderWidth: 1,
    borderColor: colors.orange[600],
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  textoBotaoImagem: {
    color: colors.orange[400],
    fontSize: 13,
    fontWeight: 'bold',
  },
  containerBotaoSalvar: {
    marginTop: 8,
  },
});