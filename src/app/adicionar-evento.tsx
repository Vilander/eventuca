import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const LISTA_CATEGORIAS = [
  'Hackathon', 'Workshop', 'Bootcamp', 'Game Jam',
  'Meetup', 'Tech Talk', 'Happy Hour', 'Conferência',
  'Summit', 'Feira Tech', 'Webinar', 'Fórum'
];

export default function TelaAdicionarEvento() {
  const [nomeEvento, setNomeEvento] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  
  // Estados para seleção
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [modeloPresencial, setModeloPresencial] = useState(false);
  const [modeloOnline, setModeloOnline] = useState(false);
  const [forneceCertificado, setForneceCertificado] = useState<boolean | null>(null);
  const [isGratuito, setIsGratuito] = useState(false);
  const [valorBase, setValorBase] = useState('');

  // Redes / Links
  const [site, setSite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [carregando, setCarregando] = useState(false);

  const toggleCategoria = (cat: string) => {
    if (categoriasSelecionadas.includes(cat)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter(item => item !== cat));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, cat]);
    }
  };

  function handleSalvarEvento() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título com Borda Laranja */}
        <View style={styles.badgeTitulo}>
          <Text style={styles.textoBadgeTitulo}>Cadastrar novo evento</Text>
        </View>

        {/* Nome do Evento */}
        <Text style={styles.rotulo}>Nome do Evento</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="Cadastrar novo evento"
          placeholderTextColor={colors.gray[600]}
          value={nomeEvento}
          onChangeText={setNomeEvento}
        />

        {/* Descrição do Evento */}
        <Text style={styles.rotulo}>Descrição do evento</Text>
        <TextInput
          style={[styles.campoTexto, styles.campoMultilinha]}
          placeholder="Faça uma breve descrição do evento..."
          placeholderTextColor={colors.gray[600]}
          value={descricaoEvento}
          onChangeText={setDescricaoEvento}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Botão de Data */}
        <TouchableOpacity style={styles.botaoData} activeOpacity={0.8}>
          <Ionicons name="calendar" size={18} color={colors.orange[500]} />
          <Text style={styles.textoBotaoData}>Selecione a data do evento</Text>
        </TouchableOpacity>

        {/* Categorias em Grid */}
        <Text style={styles.rotulo}>Selecione a(s) categoria(s) do evento</Text>
        <View style={styles.gridCategorias}>
          {LISTA_CATEGORIAS.map((cat) => {
            const selecionado = categoriasSelecionadas.includes(cat);
            return (
              <TouchableOpacity
                key={cat}
                style={styles.opcaoCheckbox}
                onPress={() => toggleCategoria(cat)}
                activeOpacity={0.7}
              >
                <View style={[styles.boxCheckbox, selecionado && styles.boxCheckboxAtivo]} />
                <Text style={styles.textoOpcao}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Modelo de Evento */}
        <Text style={styles.rotulo}>Modelo de evento</Text>
        <View style={styles.linhaOpcoes}>
          <TouchableOpacity
            style={styles.opcaoCheckbox}
            onPress={() => setModeloPresencial(!modeloPresencial)}
            activeOpacity={0.7}
          >
            <View style={[styles.boxCheckbox, modeloPresencial && styles.boxCheckboxAtivo]} />
            <Text style={styles.textoOpcao}>Presencial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcaoCheckbox}
            onPress={() => setModeloOnline(!modeloOnline)}
            activeOpacity={0.7}
          >
            <View style={[styles.boxCheckbox, modeloOnline && styles.boxCheckboxAtivo]} />
            <Text style={styles.textoOpcao}>Online</Text>
          </TouchableOpacity>
        </View>

        {/* Fornece Certificado */}
        <Text style={styles.rotulo}>Fornece certificado?</Text>
        <View style={styles.linhaOpcoes}>
          <TouchableOpacity
            style={styles.opcaoCheckbox}
            onPress={() => setForneceCertificado(true)}
            activeOpacity={0.7}
          >
            <View style={[styles.boxCheckbox, forneceCertificado === true && styles.boxCheckboxAtivo]} />
            <Text style={styles.textoOpcao}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcaoCheckbox}
            onPress={() => setForneceCertificado(false)}
            activeOpacity={0.7}
          >
            <View style={[styles.boxCheckbox, forneceCertificado === false && styles.boxCheckboxAtivo]} />
            <Text style={styles.textoOpcao}>Não</Text>
          </TouchableOpacity>
        </View>

        {/* Valor Base e Gratuito */}
        <Text style={styles.rotulo}>Valor base do evento</Text>
        <View style={styles.linhaValor}>
          <TextInput
            style={[styles.campoTexto, styles.inputValor]}
            placeholder="R$ 00,00"
            placeholderTextColor={colors.gray[600]}
            value={valorBase}
            onChangeText={setValorBase}
            keyboardType="numeric"
            editable={!isGratuito}
          />
          <TouchableOpacity
            style={styles.opcaoCheckbox}
            onPress={() => setIsGratuito(!isGratuito)}
            activeOpacity={0.7}
          >
            <View style={[styles.boxCheckbox, isGratuito && styles.boxCheckboxAtivo]} />
            <Text style={styles.textoOpcao}>Gratuito</Text>
          </TouchableOpacity>
        </View>

        {/* Links do Evento */}
        <Text style={styles.rotulo}>Site do evento</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="Site oficial do evento"
          placeholderTextColor={colors.gray[600]}
          value={site}
          onChangeText={setSite}
        />

        <Text style={styles.rotulo}>Facebook</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="https://www.facebook.com/profile"
          placeholderTextColor={colors.gray[600]}
          value={facebook}
          onChangeText={setFacebook}
        />

        <Text style={styles.rotulo}>Instagram</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="https://www.instagram.com/"
          placeholderTextColor={colors.gray[600]}
          value={instagram}
          onChangeText={setInstagram}
        />

        <Text style={styles.rotulo}>Linkedin</Text>
        <TextInput
          style={styles.campoTexto}
          placeholder="https://www.linkedin.com/"
          placeholderTextColor={colors.gray[600]}
          value={linkedin}
          onChangeText={setLinkedin}
        />

        {/* Botão de Adicionar Imagem */}
        <TouchableOpacity style={styles.botaoAdicionarImagem} activeOpacity={0.8}>
          <Text style={styles.textoBotaoImagem}>+ Adicionar Imagem</Text>
        </TouchableOpacity>

        {/* Botão Principal de Salvar */}
        <View style={styles.containerBotaoSalvar}>
          <Botao
            titulo="Salvar evento"
            isLoading={carregando}
            onPress={handleSalvarEvento}
          />
        </View>
      </ScrollView>
    </View>
  );
}