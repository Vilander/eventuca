import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ================= ESTRUTURA E CONTAINERS =================
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: colors.gray[800],
    marginTop: 24,
    marginBottom: 16,
    width: '100%',
  },
  tituloSecao: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  badgeTitulo: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoBadgeTitulo: {
    color: colors.orange[500],
    fontSize: 15,
    fontWeight: 'bold',
  },

  // ================= BUSCA =================
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

  // ================= PAGINAÇÃO (DOTS) =================
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

  // ================= FILTROS E CHIPS =================
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

  // ================= CARTÃO DE EVENTO (LISTAGEM) =================
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
    fontWeight: 'bold',
  },
  tituloEvento: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  descricaoEvento: {
    color: colors.gray[400],
    marginVertical: 8,
    fontSize: 13,
  },
  rodapeLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textoData: {
    color: colors.gray[400],
  },
  etiquetaPreco: {
    color: colors.green[500],
    fontWeight: 'bold',
  },

  // ================= FORMULÁRIOS E INPUTS =================
  rotulo: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  rotuloSecao: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white,
    fontSize: 12,
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
    height: 100,
    textAlignVertical: 'top',
  },
  linhaDupla: {
    flexDirection: 'row',
    gap: 10,
  },

  // ================= SELETORES DE DATA =================
  btnData: {
    backgroundColor: colors.orange[600],
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  textoBtnData: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
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
    backgroundColor: colors.orange[500] + '20',
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ================= CHECKBOXES E CATEGORIAS =================
  gridCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  itemCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
  },
  boxCheck: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  boxCheckAtivo: {
    backgroundColor: colors.orange[500],
  },
  textoCheck: {
    color: colors.white,
    fontSize: 11,
  },
  linhaCheck: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  checkboxAtivo: {
    backgroundColor: colors.orange[500],
  },
  textoCheckbox: {
    color: colors.white,
    fontSize: 11,
  },

  // ================= PREÇO E IMAGEM (CADASTRO) =================
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
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
  },
  containerBotaoSalvar: {
    marginTop: 8,
  },

  // ================= PERFIL E LOGIN =================
  cardPerfil: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.gray[800],
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  textoDado: {
    color: colors.gray[300],
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 18,
  },
  linhaOpcaoPerfil: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.gray[800],
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textoOpcaoPerfil: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  badgeContador: {
    backgroundColor: colors.red[600],
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoContador: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  botaoLogout: {
    backgroundColor: colors.orange[600],
    borderRadius: 6,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    width: 140,
  },
  textoLogout: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});