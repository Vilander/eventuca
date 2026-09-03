import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { UsuarioRegistro, useEventoDatabase } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

export default function TelaPerfil() {
  const eventoDb = useEventoDatabase();

  const [tipoTela, setTipoTela] = useState<'perfil' | 'login' | 'cadastro'>('perfil');
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioRegistro | null>(null);
  const [metricas, setMetricas] = useState({ totalCriados: 0, totalSalvos: 0 });

  // Campos de Cadastro / Edição
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [senha, setSenha] = useState('');
  const [repitaSenha, setRepitaSenha] = useState('');
  const [receberNotificacoes, setReceberNotificacoes] = useState(false);

  // Campos de Login
  const [loginInput, setLoginInput] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Carrega e sincroniza o usuário que possui a sessão ativa no SQLite
  const carregarDadosPerfil = useCallback(async () => {
    try {
      const usuario = await eventoDb.obterUsuarioLogado();
      if (usuario) {
        setUsuarioLogado(usuario);
        const dadosMetricas = await eventoDb.obterMetricasUsuario();
        setMetricas(dadosMetricas);
        setTipoTela('perfil');
      } else {
        setUsuarioLogado(null);
        setTipoTela('login');
      }
    } catch (erro) {
      console.error('Erro ao carregar dados do usuário:', erro);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDadosPerfil();
    }, [carregarDadosPerfil])
  );

  // Abre edição preenchendo os dados do usuário autenticado
  function handleAbrirEdicao() {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome || '');
      setEmail(usuarioLogado.email || '');
      setEndereco(usuarioLogado.endereco || '');
      setNumero(usuarioLogado.numero || '');
      setComplemento(usuarioLogado.complemento || '');
      setEstado(usuarioLogado.estado || '');
      setCidade(usuarioLogado.cidade || '');
      setSenha(usuarioLogado.senha || '');
      setRepitaSenha(usuarioLogado.senha || '');
      setReceberNotificacoes(Boolean(usuarioLogado.receberNotificacoes));
    }
    setTipoTela('cadastro');
  }

  // Abre tela de cadastro limpando todos os campos
  function handleAbrirNovoCadastro() {
    setNome('');
    setEmail('');
    setEndereco('');
    setNumero('');
    setComplemento('');
    setEstado('');
    setCidade('');
    setSenha('');
    setRepitaSenha('');
    setReceberNotificacoes(false);
    setTipoTela('cadastro');
  }

  // Cadastrar nova conta
  async function handleSalvarPerfil() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha ao menos Nome, E-mail e Senha.');
      return;
    }

    if (senha !== repitaSenha) {
      Alert.alert('Erro', 'As senhas digitadas não coincidem.');
      return;
    }

    try {
      setCarregando(true);
      await eventoDb.cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        endereco: endereco.trim(),
        numero: numero.trim(),
        complemento: complemento.trim(),
        estado: estado.trim().toUpperCase(),
        cidade: cidade.trim(),
        senha,
        receberNotificacoes: receberNotificacoes ? 1 : 0,
      });

      await carregarDadosPerfil();
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      setTipoTela('perfil');
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível cadastrar a conta. Verifique se o e-mail já existe.');
    } finally {
      setCarregando(false);
    }
  }

  // Efetuar login e vincular sessão ativa
  async function handleLogin() {
    if (!loginInput.trim() || !loginSenha.trim()) {
      Alert.alert('Atenção', 'Informe usuário/email e senha.');
      return;
    }

    try {
      setCarregando(true);
      const usuario = await eventoDb.autenticarUsuario(loginInput.trim(), loginSenha.trim());

      if (!usuario) {
        Alert.alert('Atenção', 'Credenciais inválidas. Verifique seu login e senha.');
        return;
      }

      setUsuarioLogado(usuario);
      const dadosMetricas = await eventoDb.obterMetricasUsuario();
      setMetricas(dadosMetricas);
      setLoginInput('');
      setLoginSenha('');
      setTipoTela('perfil');
    } catch (erro) {
      Alert.alert('Erro', 'Erro ao realizar login.');
    } finally {
      setCarregando(false);
    }
  }

  // Logout real: limpa a sessão no SQLite e volta para login
  async function handleLogout() {
    try {
      await eventoDb.encerrarSessao();
      setUsuarioLogado(null);
      setLoginInput('');
      setLoginSenha('');
      setMetricas({ totalCriados: 0, totalSalvos: 0 });
      setTipoTela('login');
    } catch (erro) {
      console.error('Erro ao realizar logout:', erro);
    }
  }

  // --- TELA 1: CADASTRAR / ALTERAR PERFIL ---
  if (tipoTela === 'cadastro') {
    return (
      <View style={globalStyles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.badgeTitulo}>
            <Text style={styles.textoBadgeTitulo}>
              {usuarioLogado ? 'Alterar dados' : 'Cadastrar perfil'}
            </Text>
          </View>

          <Text style={styles.rotulo}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Preencher com nome completo..."
            placeholderTextColor={colors.gray[600]}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.rotulo}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Use seu melhor e-mail..."
            placeholderTextColor={colors.gray[600]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.rotulo}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, avenida, etc..."
            placeholderTextColor={colors.gray[600]}
            value={endereco}
            onChangeText={setEndereco}
          />

          <View style={styles.linhaDupla}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rotulo}>Número</Text>
              <TextInput
                style={styles.input}
                placeholder="123..."
                placeholderTextColor={colors.gray[600]}
                value={numero}
                onChangeText={setNumero}
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.rotulo}>Complemento</Text>
              <TextInput
                style={styles.input}
                placeholder="Casa, Apto..."
                placeholderTextColor={colors.gray[600]}
                value={complemento}
                onChangeText={setComplemento}
              />
            </View>
          </View>

          <View style={styles.linhaDupla}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rotulo}>Estado</Text>
              <TextInput
                style={styles.input}
                placeholder="SP..."
                placeholderTextColor={colors.gray[600]}
                value={estado}
                onChangeText={setEstado}
                maxLength={2}
                autoCapitalize="characters"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rotulo}>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Americana..."
                placeholderTextColor={colors.gray[600]}
                value={cidade}
                onChangeText={setCidade}
              />
            </View>
          </View>

          <Text style={styles.rotulo}>Senha (8 caracteres)</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={colors.gray[600]}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style={styles.rotulo}>Repita a senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={colors.gray[600]}
            secureTextEntry
            value={repitaSenha}
            onChangeText={setRepitaSenha}
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.8}
            onPress={() => setReceberNotificacoes(!receberNotificacoes)}
          >
            <View style={[styles.checkbox, receberNotificacoes && styles.checkboxAtivo]} />
            <Text style={styles.textoCheckbox}>Desejo receber notificações do Eventuca?</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 16 }}>
            <Botao titulo="Salvar Perfil" isLoading={carregando} onPress={handleSalvarPerfil} />
          </View>

          <TouchableOpacity
            onPress={() => setTipoTela(usuarioLogado ? 'perfil' : 'login')}
            style={{ marginTop: 16, alignItems: 'center' }}
          >
            <Text style={{ color: colors.orange[500], fontSize: 12 }}>
              {usuarioLogado ? 'Cancelar e voltar ao perfil' : 'Já tem uma conta? Faça login'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // --- TELA 2: FAZER LOGIN ---
  if (tipoTela === 'login') {
    return (
      <View style={globalStyles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.badgeTitulo}>
            <Text style={styles.textoBadgeTitulo}>Fazer Login</Text>
          </View>

          <Text style={styles.rotulo}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Preencher com nome completo ou email..."
            placeholderTextColor={colors.gray[600]}
            value={loginInput}
            onChangeText={setLoginInput}
            autoCapitalize="none"
          />

          <Text style={styles.rotulo}>Senha (8 caracteres)</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={colors.gray[600]}
            secureTextEntry
            value={loginSenha}
            onChangeText={setLoginSenha}
          />

          <View style={{ marginTop: 16 }}>
            <Botao titulo="Login" isLoading={carregando} onPress={handleLogin} />
          </View>

          <TouchableOpacity
            onPress={handleAbrirNovoCadastro}
            style={{ alignItems: 'center', marginTop: 16 }}
          >
            <Text style={{ color: colors.orange[400], fontSize: 12 }}>
              Não tenho conta, quero cadastrar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // --- TELA 3: PERFIL LOGADO ---
  const primeiroNome = usuarioLogado?.nome ? usuarioLogado.nome.trim().split(' ')[0] : 'Usuário';
  const emailFormatado = usuarioLogado?.email || 'Não informado';
  const enderecoFormatado = usuarioLogado?.endereco
    ? `${usuarioLogado.endereco}, ${usuarioLogado.numero || 'S/N'}${usuarioLogado.complemento ? ` - ${usuarioLogado.complemento}` : ''} - ${usuarioLogado.cidade || ''}/${usuarioLogado.estado || ''}`
    : 'Endereço não informado';

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[globalStyles.textoTitulo, { fontSize: 22, marginBottom: 20 }]}>
          Olá, {primeiroNome}!
        </Text>

        <View style={styles.cardPerfil}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 14 }}>Seus dados</Text>
          </View>

          <Text style={styles.textoDado}>
            <Text style={{ fontWeight: 'bold' }}>Email: </Text>
            {emailFormatado}
          </Text>
          <Text style={styles.textoDado}>
            <Text style={{ fontWeight: 'bold' }}>Endereço: </Text>
            {enderecoFormatado}
          </Text>

          <TouchableOpacity
            onPress={handleAbrirEdicao}
            style={{ alignSelf: 'flex-end', marginTop: 8 }}
          >
            <Text style={{ color: colors.orange[400], fontSize: 11 }}>Alterar Dados</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linhaOpcaoPerfil}
          activeOpacity={0.7}
          onPress={() => router.push('/adicionar-evento' as any)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={styles.textoOpcaoPerfil}>Eventos criados</Text>
          </View>
          <View style={styles.badgeContador}>
            <Text style={styles.textoContador}>{metricas.totalCriados}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linhaOpcaoPerfil}
          activeOpacity={0.7}
          onPress={() => router.push('/salvos' as any)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={styles.textoOpcaoPerfil}>Meus eventos salvos</Text>
          </View>
          <View style={styles.badgeContador}>
            <Text style={styles.textoContador}>{metricas.totalSalvos}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}>
          <TouchableOpacity style={styles.botaoLogout} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={16} color={colors.white} />
            <Text style={styles.textoLogout}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}