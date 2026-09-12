import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { useEventoDatabase } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles/appStyles';

import { CATEGORIAS_EVENTO } from '@/constants/categorias';

const OPCOES_CATEGORIAS = CATEGORIAS_EVENTO;

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export default function TelaAdicionarEvento() {
  const eventoDb = useEventoDatabase();

  const { id } = useLocalSearchParams<{ id?: string }>();
  const modoEdicao = Boolean(id);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [dataObjeto, setDataObjeto] = useState(new Date());
  const [textoDataFormatada, setTextoDataFormatada] = useState('Selecione a data de inicio do evento');
  const [mostrarDatePickerIOS, setMostrarDatePickerIOS] = useState(false);

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [presencial, setPresencial] = useState(false);
  const [online, setOnline] = useState(false);
  const [certificado, setCertificado] = useState<boolean | null>(null);
  const [gratuito, setGratuito] = useState(false);
  const [preco, setPreco] = useState('');
  const [site, setSite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSelecionarImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      const asset = resultado.assets[0];
      const formatoMime = asset.mimeType || 'image/jpeg';
      const imagemBase64 = `data:${formatoMime};base64,${asset.base64}`;
      setImagemUri(imagemBase64);
    }
  }

  const limparFormulario = useCallback(() => {
    setNome('');
    setDescricao('');
    setImagemUri(null);
    setDataObjeto(new Date());
    setTextoDataFormatada('Selecione a data de inicio do evento');
    setCategoriasSelecionadas([]);
    setPresencial(false);
    setOnline(false);
    setCertificado(null);
    setGratuito(false);
    setPreco('');
    setSite('');
    setFacebook('');
    setInstagram('');
    setLinkedin('');
    setMostrarDatePickerIOS(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function carregarDadosEdicao() {
        if (modoEdicao && id) {
          try {
            setCarregando(true);
            const eventoExistente = await eventoDb.buscarPorId(Number(id));
            if (eventoExistente) {
              setNome(eventoExistente.titulo);
              setDescricao(eventoExistente.descricao || '');
              setTextoDataFormatada(eventoExistente.data);
              setImagemUri(eventoExistente.imagemUri || null);
              setPresencial(Boolean(eventoExistente.presencial));
              setOnline(Boolean(eventoExistente.online));
              setCertificado(
                eventoExistente.certificado !== undefined
                  ? Boolean(eventoExistente.certificado)
                  : null
              );
              setGratuito(Boolean(eventoExistente.gratuito));
              setPreco(eventoExistente.preco === 'GRATUITO' ? '' : eventoExistente.preco || '');
              setSite(eventoExistente.linkOficial || '');
              setFacebook(eventoExistente.facebook || '');
              setInstagram(eventoExistente.instagram || '');
              setLinkedin(eventoExistente.linkedin || '');

              try {
                setCategoriasSelecionadas(JSON.parse(eventoExistente.categorias));
              } catch {
                setCategoriasSelecionadas(
                  eventoExistente.categorias ? [eventoExistente.categorias] : []
                );
              }
            }
          } catch (erro) {
            console.error('Erro ao buscar dados para edição:', erro);
          } finally {
            setCarregando(false);
          }
        }
      }

      carregarDadosEdicao();

      return () => {
        limparFormulario();
      };
    }, [id, modoEdicao, limparFormulario])
  );

  function formatarDataTexto(date: Date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = MESES[date.getMonth()];
    const ano = date.getFullYear();
    return `${dia} ${mes} ${ano}`;
  }

  function abrirCalendario() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: dataObjeto,
        onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
          if (event.type === 'set' && selectedDate) {
            setDataObjeto(selectedDate);
            setTextoDataFormatada(formatarDataTexto(selectedDate));
          }
        },
        mode: 'date',
        is24Hour: true,
      });
    } else {
      setMostrarDatePickerIOS(true);
    }
  }

  function onChangeDataIOS(event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDataObjeto(selectedDate);
      setTextoDataFormatada(formatarDataTexto(selectedDate));
    }
  }

  function toggleCategoria(cat: string) {
    if (categoriasSelecionadas.includes(cat)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter((c) => c !== cat));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, cat]);
    }
  }

  async function handleSalvarEvento() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do evento.');
      return;
    }

    if (textoDataFormatada === 'Selecione a data de inicio do evento') {
      Alert.alert('Atenção', 'Por favor, selecione a data do evento.');
      return;
    }

    if (categoriasSelecionadas.length === 0) {
      Alert.alert('Atenção', 'Selecione ao menos uma categoria.');
      return;
    }

    try {
      setCarregando(true);

      const payload = {
        titulo: nome,
        descricao,
        data: textoDataFormatada,
        categorias: JSON.stringify(categoriasSelecionadas),
        presencial: presencial ? 1 : 0,
        online: online ? 1 : 0,
        certificado: certificado ? 1 : 0,
        gratuito: gratuito ? 1 : 0,
        preco: gratuito ? 'GRATUITO' : preco,
        linkOficial: site,
        facebook,
        instagram,
        linkedin,
        imagemUri: imagemUri || '',
      };

      if (modoEdicao && id) {
        await eventoDb.atualizarEvento(Number(id), payload);
        limparFormulario();
        Alert.alert('Sucesso', 'Evento atualizado com sucesso!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        await eventoDb.criarEvento(payload);
        limparFormulario();
        Alert.alert('Sucesso', 'Evento cadastrado com sucesso!', [
          {
            text: 'OK',
            onPress: () => router.navigate('/' as any),
          },
        ]);
      }
    } catch (error: any) {
      const mensagem = error?.message || 'Não foi possível salvar o evento.';

      Alert.alert('Atenção', mensagem, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Fazer Login',
          onPress: () => router.push('/perfil' as any),
        },
      ]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.rotulo}>Nome do Evento</Text>
        <TextInput
          style={styles.input}
          placeholder={modoEdicao ? 'Editar título do evento' : 'Cadastrar novo evento'}
          placeholderTextColor={colors.gray[600]}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.rotulo}>Descrição do evento</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Faça uma breve descrição do evento..."
          placeholderTextColor={colors.gray[600]}
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Seletor e Pré-visualização de Imagem */}
        <Text style={styles.rotuloSecao}>Banner do Evento (Opcional)</Text>
        {imagemUri ? (
          <View style={{ position: 'relative', marginTop: 6 }}>
            <Image
              source={{ uri: imagemUri }}
              style={{ width: '100%', height: 160, borderRadius: 8, borderWidth: 1, borderColor: colors.orange[500] }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 6,
                borderRadius: 20,
              }}
              onPress={() => setImagemUri(null)}
            >
              <Ionicons name="trash-outline" size={18} color={colors.red[500]} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.botaoAdicionarImagem}
            activeOpacity={0.7}
            onPress={handleSelecionarImagem}
          >
            <Ionicons name="image-outline" size={20} color={colors.orange[400]} style={{ marginBottom: 4 }} />
            <Text style={styles.textoBotaoImagem}>Selecionar imagem da galeria</Text>
          </TouchableOpacity>
        )}

        {/* Botão de Data */}
        <TouchableOpacity style={styles.btnData} onPress={abrirCalendario}>
          <Ionicons name="calendar-outline" size={16} color={colors.white} />
          <Text style={styles.textoBtnData}>{textoDataFormatada}</Text>
        </TouchableOpacity>

        {Platform.OS === 'ios' && mostrarDatePickerIOS && (
          <View style={{ backgroundColor: colors.gray[800], borderRadius: 8, marginTop: 8 }}>
            <DateTimePicker
              value={dataObjeto}
              mode="date"
              display="spinner"
              textColor={colors.white}
              onChange={onChangeDataIOS}
            />
            <TouchableOpacity
              onPress={() => setMostrarDatePickerIOS(false)}
              style={{ padding: 8, alignItems: 'center' }}
            >
              <Text style={{ color: colors.orange[500], fontWeight: 'bold' }}>Confirmar Data</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.rotuloSecao}>Selecione a(s) categoria(s) do evento</Text>
        <View style={styles.gridCategorias}>
          {OPCOES_CATEGORIAS.map((cat) => {
            const ativa = categoriasSelecionadas.includes(cat);
            return (
              <TouchableOpacity
                key={cat}
                style={styles.itemCheck}
                onPress={() => toggleCategoria(cat)}
              >
                <View style={[styles.boxCheck, ativa && styles.boxCheckAtivo]} />
                <Text style={styles.textoCheck}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.rotuloSecao}>Modelo de evento</Text>
        <View style={styles.linhaCheck}>
          <TouchableOpacity style={styles.itemCheck} onPress={() => setPresencial(!presencial)}>
            <View style={[styles.boxCheck, presencial && styles.boxCheckAtivo]} />
            <Text style={styles.textoCheck}>Presencial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCheck} onPress={() => setOnline(!online)}>
            <View style={[styles.boxCheck, online && styles.boxCheckAtivo]} />
            <Text style={styles.textoCheck}>Online</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rotuloSecao}>Fornece certificado?</Text>
        <View style={styles.linhaCheck}>
          <TouchableOpacity style={styles.itemCheck} onPress={() => setCertificado(true)}>
            <View style={[styles.boxCheck, certificado === true && styles.boxCheckAtivo]} />
            <Text style={styles.textoCheck}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCheck} onPress={() => setCertificado(false)}>
            <View style={[styles.boxCheck, certificado === false && styles.boxCheckAtivo]} />
            <Text style={styles.textoCheck}>Não</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rotuloSecao}>Valor base do evento</Text>
        <View style={styles.linhaValor}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="R$ 00,00"
            placeholderTextColor={colors.gray[600]}
            editable={!gratuito}
            value={gratuito ? 'GRATUITO' : preco}
            onChangeText={setPreco}
          />
          <TouchableOpacity style={styles.itemCheck} onPress={() => setGratuito(!gratuito)}>
            <View style={[styles.boxCheck, gratuito && styles.boxCheckAtivo]} />
            <Text style={styles.textoCheck}>Gratuito</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rotulo}>Site do evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Site oficial do evento"
          placeholderTextColor={colors.gray[600]}
          value={site}
          onChangeText={setSite}
        />

        <Text style={styles.rotulo}>Facebook</Text>
        <TextInput
          style={styles.input}
          placeholder="https://www.facebook.com/profile"
          placeholderTextColor={colors.gray[600]}
          value={facebook}
          onChangeText={setFacebook}
        />

        <Text style={styles.rotulo}>Instagram</Text>
        <TextInput
          style={styles.input}
          placeholder="https://www.instagram.com/"
          placeholderTextColor={colors.gray[600]}
          value={instagram}
          onChangeText={setInstagram}
        />

        <Text style={styles.rotulo}>Linkedin</Text>
        <TextInput
          style={styles.input}
          placeholder="https://www.linkedin.com/"
          placeholderTextColor={colors.gray[600]}
          value={linkedin}
          onChangeText={setLinkedin}
        />

        <View style={{ marginTop: 24 }}>
          <Botao
            titulo={modoEdicao ? 'Atualizar Evento' : 'Salvar Evento'}
            isLoading={carregando}
            onPress={handleSalvarEvento}
          />
        </View>
      </ScrollView>
    </View>
  );
}