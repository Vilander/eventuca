import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rotulo: {
    color: colors.white,
    marginBottom: 4,
    fontWeight: '500',
  },
  campoMultilinha: {
    height: 80,
    textAlignVertical: 'top',
  },
});