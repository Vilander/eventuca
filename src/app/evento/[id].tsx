import { BannerPadrao } from '@/components/BannerPadrao';
import Header from '@/components/Header';
import { EventoRegistro, useEventoDatabase } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/eventoStyles';

export default function TelaDetalhesEvento() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const eventoDb = useEventoDatabase();

  const [evento, setEvento] = useState<EventoRegistro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [favorito, setFavorito] = useState(false);

  const [usuarioLogadoId, setUsuarioLogadoId] = useState<number | null>(null);

  // Busca dados do evento e o status de favorito no SQLite
  useFocusEffect(
    useCallback(() => {
      async function carregarDados() {
        if (!id) return;
        try {
          setCarregando(true);
          const eventoId = Number(id);
          const [registro, statusFavorito, idSessao] = await Promise.all([
            eventoDb.buscarPorId(eventoId),
            eventoDb.isFavorito(eventoId),
            eventoDb.obterSessaoAtiva(),
          ]);
          setEvento(registro ?? null);
          setFavorito(statusFavorito);
          setUsuarioLogadoId(idSessao);
        } catch (erro) {
          console.error('Erro ao carregar detalhes do evento:', erro);
        } finally {
          setCarregando(false);
        }
      }

      carregarDados();
    }, [id])
  );

  async function handleToggleFavorito() {
    if (!id) return;
    try {
      const novoStatus = await eventoDb.toggleFavorito(Number(id));
      setFavorito(novoStatus);
    } catch (erro) {
      console.error('Erro ao alternar favorito:', erro);
    }
  }

  const abrirLink = (url?: string) => {
    if (url && url.trim().length > 0) {
      Linking.openURL(url);
    }
  };

  if (carregando) {
    return (
      <View style={globalStyles.container}>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.orange[500]} />
        </View>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={globalStyles.container}>
        <Header />
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.gray[600]} />
          <Text style={{ color: colors.gray[400], marginTop: 12, fontSize: 14 }}>
            Evento não encontrado no banco de dados.
          </Text>
        </View>
      </View>
    );
  }

  let listaCategorias: string[] = [];
  try {
    listaCategorias = JSON.parse(evento.categorias);
  } catch {
    listaCategorias = evento.categorias ? [evento.categorias] : [];
  }

  const ehDonoDoEvento = usuarioLogadoId !== null && usuarioLogadoId === evento.usuario_id;

  function handleConfirmarExclusao() {
    if (!evento) return;

    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o evento "${evento.titulo}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setCarregando(true);
              await eventoDb.excluirEvento(evento.id);
              Alert.alert('Sucesso', 'Evento excluído com sucesso!', [
                {
                  text: 'OK',
                  onPress: () => router.replace('/'),
                },
              ]);
            } catch (error: any) {
              Alert.alert('Erro', error?.message || 'Não foi possível excluir o evento.');
              setCarregando(false);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={globalStyles.container}>
      <Header />

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardDetalhes}>
          {/* Header do Card: Badge EVENTO + Botão de Favorito Persistente */}
          <View style={styles.headerCard}>
            <View style={styles.badgeEvento}>
              <Text style={styles.textoBadgeEvento}>EVENTO</Text>
            </View>

            <TouchableOpacity onPress={handleToggleFavorito} activeOpacity={0.7}>
              <Ionicons
                name={favorito ? 'heart' : 'heart-outline'}
                size={24}
                color={colors.red[500]}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.tituloEvento}>{evento.titulo}</Text>
          <View style={styles.linhaData}>
            <Ionicons name="calendar-outline" size={16} color={colors.orange[500]} />
            <Text style={styles.textoData}>{evento.data}</Text>
          </View>

          <View style={styles.linhaCategorias}>
            {listaCategorias.map((cat, index) => (
              <View key={index} style={styles.chipCategoria}>
                <Text style={styles.textoChipCategoria}>{cat}</Text>
              </View>
            ))}
          </View>

          <View style={styles.linhaBadges}>
            {!!evento.presencial && (
              <View style={styles.badgePresencial}>
                <Text style={styles.textoBadgePresencial}>PRESENCIAL</Text>
              </View>
            )}

            {!!evento.online && (
              <View style={styles.badgePresencial}>
                <Text style={styles.textoBadgePresencial}>ONLINE</Text>
              </View>
            )}

            {!!evento.gratuito ? (
              <View style={styles.badgeGratuito}>
                <MaterialIcons name="money-off" size={12} color={colors.pink[400]} />
                <Text style={styles.textoBadgeGratuito}>GRATUITO</Text>
              </View>
            ) : evento.preco ? (
              <View style={[styles.badgeGratuito, { borderColor: colors.green[500] }]}>
                <Text style={[styles.textoBadgeGratuito, { color: colors.green[500] }]}>
                  {evento.preco}
                </Text>
              </View>
            ) : null}

            {!!evento.certificado && (
              <View style={styles.badgeCertificado}>
                <Ionicons name="checkbox-outline" size={12} color={colors.gray[300]} />
                <Text style={styles.textoBadgeCertificado}>CERTIFICADO</Text>
              </View>
            )}
          </View>

          {/* Imagem do Evento ou Fallback */}
          {evento.imagemUri && evento.imagemUri.trim().length > 0 ? (
            <View style={styles.containerImagem}>
              <Image
                source={{ uri: evento.imagemUri }}
                style={styles.imagemBanner}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={[styles.containerImagem, { height: 180 }]}>
              <BannerPadrao exibirTexto />
            </View>
          )}

          {evento.descricao ? (
            <Text style={styles.textoDescricao}>{evento.descricao}</Text>
          ) : null}

          <View style={styles.rodapeAcoes}>
            <TouchableOpacity
              style={[
                styles.botaoAcessar,
                !evento.linkOficial && { opacity: 0.5 },
              ]}
              activeOpacity={0.8}
              disabled={!evento.linkOficial}
              onPress={() => abrirLink(evento.linkOficial)}
            >
              <Text style={styles.textoBotaoAcessar}>Acessar página do evento</Text>
              <Ionicons name="open-outline" size={18} color={colors.gray[900]} />
            </TouchableOpacity>

            <View style={styles.containerRedes}>
              {!!evento.facebook && (
                <TouchableOpacity onPress={() => abrirLink(evento.facebook)}>
                  <Ionicons name="logo-facebook" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
              {!!evento.instagram && (
                <TouchableOpacity onPress={() => abrirLink(evento.instagram)}>
                  <Ionicons name="logo-instagram" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
              {!!evento.linkedin && (
                <TouchableOpacity onPress={() => abrirLink(evento.linkedin)}>
                  <Ionicons name="logo-linkedin" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {/* verificando se o usuário logado é o dono do evento para exibir os botões de edição e exclusão */}
        {ehDonoDoEvento && (
          <View style={styles.linhaAcoesAutor}>
            <TouchableOpacity
              style={[styles.botaoGestao, styles.botaoEditar]}
              activeOpacity={0.7}
              onPress={() => console.log('Editar evento:', evento.id)}
            >
              <Ionicons name="create-outline" size={16} color={colors.white} />
              <Text style={styles.textoBotaoGestao}>Editar Evento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoGestao, styles.botaoExcluir]}
              activeOpacity={0.7}
              onPress={handleConfirmarExclusao}
            >
              <Ionicons name="trash-outline" size={16} color={colors.red[500]} />
              <Text style={[styles.textoBotaoGestao, { color: colors.red[500] }]}>
                Excluir Evento
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}