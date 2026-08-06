import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';

// Certifique-se de ajustar o caminho da imagem conforme a estrutura do seu projeto
import logoImg from '../../../assets/images/logo.png';

export default function Header() {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.brandContainer}>
        <Text style={styles.tituloMarca}>
          <Text style={styles.fontEven}>Even</Text>
          <Text style={styles.fontTuca}>tuca</Text>
        </Text>
        <Image source={logoImg} style={styles.logoImage} resizeMode="contain" />
      </View>
      <Text style={styles.subtituloMarca}>
        Tecnologia Unindo Comunidades e Admiradores
      </Text>
    </View>
  );
}


