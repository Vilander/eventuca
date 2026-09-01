import { colors } from '@/styles/colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type BannerPadraoProps = {
  altura?: number | string;
  exibirTexto?: boolean;
};

export function BannerPadrao({ altura = '100%', exibirTexto = false }: BannerPadraoProps) {
  return (
    <View style={[styles.container, typeof altura === 'number' ? { height: altura } : { height: '100%' }]}>
      {/* Brilho circular responsivo no fundo */}
      <View style={styles.brilhoFundo} />

      {/* Imagem do Logo contida proporcionalmente */}
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Texto opcional exibido apenas se explicitamente solicitado */}
      {exibirTexto && (
        <Text style={styles.textoMarca}>
          EVEN<Text style={{ color: colors.orange[500] }}>Tuca</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.gray[800],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  brilhoFundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.orange[500] + '12',
  },
  logo: {
    width: '75%',
    height: '70%',
  },
  textoMarca: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 2,
  },
});