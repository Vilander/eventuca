import { colors } from '@/styles/colors';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type MesItem = {
  chave: string;       // Formato 'ago 2026'
  rotulo: string;      // 'AGO'
  anoRotulo: string;   // '26'
  temEvento: boolean;  // Se existe evento cadastrado neste mês
};

type FiltroMesesProps = {
  meses: MesItem[];
  mesSelecionado: string | null;
  onSelecionarMes: (chave: string) => void;
};

export function FiltroMeses({ meses, mesSelecionado, onSelecionarMes }: FiltroMesesProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {meses.map((item) => {
          const isAtivo = mesSelecionado === item.chave;

          return (
            <TouchableOpacity
              key={item.chave}
              activeOpacity={0.7}
              onPress={() => onSelecionarMes(item.chave)}
              style={[
                styles.botaoMes,
                isAtivo && styles.botaoMesAtivo,
                !item.temEvento && !isAtivo && styles.botaoMesSemEvento,
              ]}
            >
              <Text
                style={[
                  styles.textoMes,
                  isAtivo && styles.textoMesAtivo,
                  !item.temEvento && !isAtivo && styles.textoMesSemEvento,
                ]}
              >
                {item.rotulo}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  botaoMes: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  botaoMesAtivo: {
    backgroundColor: colors.orange[500],
    borderColor: colors.orange[500],
  },
  botaoMesSemEvento: {
    opacity: 0.4,
  },
  textoMes: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textoMesAtivo: {
    color: colors.white,
  },
  textoMesSemEvento: {
    color: colors.gray[400],
  },
});