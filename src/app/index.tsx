import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CartaoEventoPrincipal } from '@/components/CartaoEventoPrincipal';
import { CartaoRecomendado } from '@/components/CartaoRecomendado';
import { FiltroMeses, MesItem } from '@/components/FiltroMeses';
import Header from '@/components/Header';
import { EventoRegistro, useEventoDatabase } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { styles } from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44 + 12;

const CATEGORIAS = ['Todos', 'Meetup', 'Conferência', 'Hackathon', 'Bootcamp', 'Webinar', 'Fórum'];
const MESES_NOMES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export default function TelaInicio() {
  const eventoDb = useEventoDatabase();

  const [eventos, setEventos] = useState<EventoRegistro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [mesSelecionado, setMesSelecionado] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [paginaAtiva, setPaginaAtiva] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const isAutoScrolling = useRef(false);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        try {
          setCarregando(true);
          const dados = await eventoDb.listarTodos();
          setEventos(dados);
        } catch (erro) {
          console.error('Erro ao carregar eventos:', erro);
        } finally {
          setCarregando(false);
        }
      }
      carregar();
    }, [])
  );

  // Gera os próximos 12 meses a partir da data atual (oculta os meses passados)
  const listaProximosMeses = useMemo<MesItem[]>(() => {
    const agora = new Date();
    const resultado: MesItem[] = [];

    for (let i = 0; i < 12; i++) {
      const dataRef = new Date(agora.getFullYear(), agora.getMonth() + i, 1);
      const mesNome = MESES_NOMES[dataRef.getMonth()];
      const ano = dataRef.getFullYear();
      const chave = `${mesNome} ${ano}`; // Ex: "ago 2026"

      // Verifica se existe algum evento com esse mês/ano na string de data
      const temEvento = eventos.some((evt) =>
        evt.data.toLowerCase().includes(mesNome) && evt.data.includes(String(ano))
      );

      resultado.push({
        chave,
        rotulo: mesNome.toUpperCase(),
        anoRotulo: String(ano).slice(-2),
        temEvento,
      });
    }

    return resultado;
  }, [eventos]);

  // Alterna a seleção de mês (se clicar no mesmo, desmarca)
  function handleSelecionarMes(chave: string) {
    setMesSelecionado((atual) => (atual === chave ? null : chave));
    setPaginaAtiva(0);
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }

  // 1. Filtragem dos Cards Principais (Busca + Mês Selecionado)
  const eventosPrincipaisFiltrados = useMemo(() => {
    return eventos.filter((item) => {
      const matchBusca =
        item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        (item.descricao && item.descricao.toLowerCase().includes(busca.toLowerCase()));

      if (!mesSelecionado) return matchBusca;

      const [mes, ano] = mesSelecionado.split(' ');
      const dataFormatada = item.data.toLowerCase();
      const matchMes = dataFormatada.includes(mes) && dataFormatada.includes(ano);

      return matchBusca && matchMes;
    });
  }, [eventos, busca, mesSelecionado]);

  // 2. Filtragem dos Cards de Recomendação (Busca + Categoria)
  const eventosRecomendadosFiltrados = useMemo(() => {
    return eventos.filter((item) => {
      const matchBusca =
        item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        (item.descricao && item.descricao.toLowerCase().includes(busca.toLowerCase()));

      if (categoriaSelecionada === 'Todos') return matchBusca;

      try {
        const tags: string[] = JSON.parse(item.categorias);
        return matchBusca && tags.includes(categoriaSelecionada);
      } catch {
        return matchBusca && item.categorias.includes(categoriaSelecionada);
      }
    });
  }, [eventos, busca, categoriaSelecionada]);

  const handleScroll = (event: any) => {
    if (isAutoScrolling.current) return;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    setPaginaAtiva(index);
  };

  const rolarPara = (direcao: 'esquerda' | 'direita') => {
    const total = eventosPrincipaisFiltrados.length;
    if (total === 0) return;

    const novaPagina =
      direcao === 'esquerda'
        ? Math.max(paginaAtiva - 1, 0)
        : Math.min(paginaAtiva + 1, total - 1);

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
        {/* Campo de Busca */}
        <View style={styles.containerBusca}>
          <TextInput
            style={styles.inputBusca}
            placeholder="Pesquisar evento..."
            placeholderTextColor={colors.gray[500]}
            value={busca}
            onChangeText={setBusca}
          />
          <Ionicons name="search" size={20} color={colors.gray[400]} style={styles.iconeBusca} />
        </View>

        {/* Filtro Dinâmico de Meses */}
        <FiltroMeses
          meses={listaProximosMeses}
          mesSelecionado={mesSelecionado}
          onSelecionarMes={handleSelecionarMes}
        />

        {carregando ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.orange[500]} />
          </View>
        ) : (
          <>
            {/* 1. CARROSSEL PRINCIPAL (POR MÊS) */}
            {eventosPrincipaisFiltrados.length === 0 ? (
              <View style={{ alignItems: 'center', marginVertical: 24 }}>
                <Ionicons name="calendar-outline" size={32} color={colors.gray[600]} />
                <Text style={{ color: colors.gray[400], marginTop: 8, fontSize: 13 }}>
                  Nenhum evento encontrado para este período.
                </Text>
              </View>
            ) : (
              <>
                <ScrollView
                  ref={scrollRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
                  style={{ marginVertical: 8 }}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                >
                  {eventosPrincipaisFiltrados.map((item) => (
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

                {/* Dots de Paginação */}
                <View style={styles.paginationContainer}>
                  <TouchableOpacity onPress={() => rolarPara('esquerda')}>
                    <Ionicons name="chevron-back" size={18} color={colors.gray[400]} />
                  </TouchableOpacity>

                  <View style={styles.dotsContainer}>
                    {eventosPrincipaisFiltrados.map((_, index) => (
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
              </>
            )}

            <View style={styles.linhaDivisoria} />

            {/* 2. RECOMENDADOS (POR CATEGORIA) */}
            <Text style={styles.tituloSecao}>Recomendados para você:</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {CATEGORIAS.map((cat) => {
                const isAtivo = categoriaSelecionada === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.7}
                    onPress={() => setCategoriaSelecionada(cat === categoriaSelecionada ? 'Todos' : cat)}
                    style={[styles.chipCategoria, isAtivo && styles.chipCategoriaAtivo]}
                  >
                    <Text style={[styles.textoChip, isAtivo && styles.textoChipAtivo]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {eventosRecomendadosFiltrados.map((item) => (
                <CartaoRecomendado
                  key={item.id}
                  titulo={item.titulo}
                  data={item.data}
                  preco={item.gratuito ? 'GRATUITO' : item.preco || 'Sob consulta'}
                  gratuito={!!item.gratuito}
                  imagem={item.imagemUri || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop'}
                  onPress={() => router.navigate(`/evento/${item.id}` as any)}
                />
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
}