import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export function FiltroMeses() {
  const [mesSelecionado, setMesSelecionado] = useState('ABR');

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
    >
      {MESES.map((mes) => {
        const ativo = mes === mesSelecionado;
        return (
          <TouchableOpacity
            key={mes}
            style={[styles.itemMes, ativo && styles.itemMesAtivo]}
            onPress={() => setMesSelecionado(mes)}
          >
            <Text style={[styles.textoMes, ativo && styles.textoMesAtivo]}>
              {mes}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}