import { colors } from '@/styles/colors';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  titulo: string;
  isLoading?: boolean;
};

export function Botao({ titulo, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={styles.titulo}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}