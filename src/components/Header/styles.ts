import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerHeader: {
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray[900],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloMarca: {
    fontSize: 28,
    color: colors.orange[500],
    letterSpacing: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontEven: {
    fontFamily: 'Alkatra_700Bold', 
    fontWeight: 'bold',
  },
  fontTuca: {
    fontFamily: 'Inter_400Regular',
    fontWeight: 'normal',
  },
  logoImage: {
    width: 36,
    height: 36,
    marginLeft: 8,
  },
  subtituloMarca: {
    fontSize: 11,
    color: colors.gray[400],
    marginTop: 2,
  },
});