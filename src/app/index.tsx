import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { CartaoEventoPrincipal } from '@/components/CartaoEventoPrincipal';
import { CartaoRecomendado } from '@/components/CartaoRecomendado';
import { FiltroMeses } from '@/components/FiltroMeses';
import Header from '@/components/Header';
import dadosEventos from '@/database/dadosEventos';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';

import { styles } from './styles';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width * 0.44) + 12;

const CATEGORIAS = ['Todos', 'Meetup', 'Conferência', 'Hackathon', 'Bootcamp', 'Webinar', 'Fórum'];

export default function TelaInicio() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [paginaAtiva, setPaginaAtiva] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // 1. Cards Principais (Puxam de dadosEventos)
  const eventosDestaque = dadosEventos;

  // 2. Cards de Recomendação (Filtrados por categoria a partir do mesmo dadosEventos)
  const eventosRecomendadosFiltrados = categoriaSelecionada === 'Todos'
    ? dadosEventos
    : dadosEventos.filter((e) => {
        if (e.categorias) {
          return e.categorias.includes(categoriaSelecionada);
        }
        return e.categoria === categoriaSelecionada;
      });

  const handleSelecionarCategoria = (cat: string) => {
    setCategoriaSelecionada(cat === categoriaSelecionada ? 'Todos' : cat);
  };

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
              descricao={item.descricao || ''}
              data={item.data}
              presencial={!!item.presencial}
              online={!!item.online}
              onPress={() => router.navigate(`/evento/${item.id}` as any)}
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

        <View style={styles.linhaDivisoria} />

        {/* Seção Recomendados */}
        <Text style={styles.tituloSecao}>Recomendados para você:</Text>

        {/* Chips de Categoria Clicáveis */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {CATEGORIAS.map((cat) => {
            const isAtivo = categoriaSelecionada === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.7}
                onPress={() => handleSelecionarCategoria(cat)}
                style={[styles.chipCategoria, isAtivo && styles.chipCategoriaAtivo]}
              >
                <Text style={[styles.textoChip, isAtivo && styles.textoChipAtivo]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista Horizontal de Recomendados Filtrados */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {eventosRecomendadosFiltrados.map((item) => (
            <CartaoRecomendado
              key={item.id}
              titulo={item.titulo}
              data={item.data}
              preco={item.gratuito ? 'GRATUITO' : (item.preco || 'Sob consulta')}
              gratuito={!!item.gratuito}
              imagem={item.imagem}
              onPress={() => router.navigate(`/evento/${item.id}` as any)}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}