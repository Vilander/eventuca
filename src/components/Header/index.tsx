import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export default function Header() {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.tituloMarca}>EVENtuca</Text>
      <Text style={styles.subtituloMarca}>
        Tecnologia Unindo Comunidades e Admiradores
      </Text>
    </View>
  );
}