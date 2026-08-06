import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { CartaoEventoPrincipal } from '@/components/CartaoEventoPrincipal';
import { CartaoRecomendado } from '@/components/CartaoRecomendado';
import { FiltroMeses } from '@/components/FiltroMeses';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';

import { styles } from './styles';

const { width } = Dimensions.get('window');

// Largura aproximada do card (ex: 44% da tela) + o gap de 12
const CARD_WIDTH = (width * 0.44) + 12; 

export default function TelaInicio() {
  const [paginaAtiva, setPaginaAtiva] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const eventosDestaque = [
    {
      id: '1',
      titulo: "Devops Days São Paulo",
      descricao: "DevOpsDays é um evento comunitário de tecnologia focado em DevOps, cloud, automação...",
      data: "13 jun 2026",
      presencial: true,
      online: false,
      rota: '/evento/1'
    },
    {
      id: '2',
      titulo: "Meetup HackerX",
      descricao: "Ingresso para empregadores no HackerX São Paulo: evento exclusivo de recrutamento...",
      data: "27 jun 2026",
      presencial: false,
      online: true,
      rota: '/evento/2'
    },
    {
      id: '3',
      titulo: "AWS Summit",
      descricao: "O maior evento AWS da América Latina...",
      data: "07 set 2026",
      presencial: true,
      online: false,
      rota: '/evento/3'
    },
    {
      id: '4',
      titulo: "GDG Americana",
      descricao: "Evento Google plataform no interior de São Paulo...",
      data: "19 out 2026",
      presencial: true,
      online: false,
      rota: '/evento/4'
    }
  ];
  const isAutoScrolling = useRef(false);
  const handleScroll = (event: any) => {
    if (isAutoScrolling.current) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    setPaginaAtiva(index);
  };

  const rolarPara = (direcao: 'esquerda' | 'direita') => {
    const novaPagina = direcao === 'esquerda' 
      ? Math.max(paginaAtiva - 1, 0) 
      : Math.min(paginaAtiva + 1, eventosDestaque.length - 1);

    isAutoScrolling.current = true;
    setPaginaAtiva(novaPagina);

    scrollRef.current?.scrollTo({
      x: novaPagina * CARD_WIDTH,
      animated: true,
    });

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 300);
  };

  return (
    <View style={globalStyles.container}>
      <Header />

      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        {/* Campo de Pesquisa com Ícone */}
        <View style={styles.containerBusca}>
          <TextInput
            style={styles.inputBusca}
            placeholder="Pesquisar evento..."
            placeholderTextColor={colors.gray[500]}
          />
          <Ionicons name="search" size={20} color={colors.gray[400]} style={styles.iconeBusca} />
        </View>

        {/* Filtro de Meses */}
        <FiltroMeses />

        {/* Listagem de Eventos Destaque (Carrossel Horizontal) */}
        <ScrollView 
          ref={scrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 16, gap: 4 }}
          style={{ marginVertical: 8 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {eventosDestaque.map((item) => (
            <CartaoEventoPrincipal
              key={item.id}
              titulo={item.titulo}
              descricao={item.descricao}
              data={item.data}
              presencial={item.presencial}
              online={item.online}
              onPress={() => router.navigate(item.rota as any)}
            />
          ))}
        </ScrollView>

        {/* Indicadores de Página (Setas e Bolinhas) */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity onPress={() => rolarPara('esquerda')}>
            <Ionicons name="chevron-back" size={18} color={colors.gray[400]} />
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {eventosDestaque.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  paginaAtiva === index && styles.dotAtivo,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={() => rolarPara('direita')}>
            <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        {/* Seção Recomendados */}
        <Text style={styles.tituloSecao}>Recomendados para você:</Text>

        {/* Chips de Categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {['Meetup', 'Conferência', 'Hackathon', 'Bootcamp', 'Webinar', 'Fórum'].map((cat, index) => (
            <View key={index} style={styles.chipCategoria}>
              <Text style={styles.textoChip}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Lista Horizontal de Recomendados */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CartaoRecomendado
            titulo="ERP Summit"
            data="14 jul 2026"
            preco="GRATUITO"
            gratuito
          />
          <CartaoRecomendado
            titulo="AI Conference"
            data="14 jul 2026"
            preco="$ 250,00"
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}