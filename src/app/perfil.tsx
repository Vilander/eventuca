import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TelaPerfil() {
  // Estados para controlar qual tela exibir: 'perfil', 'login', 'cadastro'
  const [tipoTela, setTipoTela] = useState<'perfil' | 'login' | 'cadastro'>('perfil');

  // Estados do Cadastro de Perfil
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

  // Estados de Login
  const [loginInput, setLoginInput] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const [carregando, setCarregando] = useState(false);

  function handleSalvarPerfil() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setTipoTela('perfil'); // Vai para a tela de perfil logado após cadastrar
    }, 1500);
  }

  function handleLogin() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setTipoTela('perfil'); // Vai para o perfil após logar
    }, 1500);
  }

  // --- TELA 1: CADASTRAR PERFIL ---
  if (tipoTela === 'cadastro') {
    return (
      <View style={globalStyles.container}>
        <Header />
        <ScrollView contentContainerStyle={localStyles.scroll}>
          <View style={localStyles.badgeTitulo}>
            <Text style={localStyles.textoBadgeTitulo}>Cadastrar perfil</Text>
          </View>

          <Text style={localStyles.rotulo}>Nome Completo</Text>
          <TextInput style={localStyles.input} placeholder="Preencher com nome completo..." placeholderTextColor={colors.gray[600]} value={nome} onChangeText={setNome} />

          <Text style={localStyles.rotulo}>E-mail</Text>
          <TextInput style={localStyles.input} placeholder="Use seu melhor e-mail..." placeholderTextColor={colors.gray[600]} value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={localStyles.rotulo}>Endereço</Text>
          <TextInput style={localStyles.input} placeholder="Rua, avenida, etc..." placeholderTextColor={colors.gray[600]} value={endereco} onChangeText={setEndereco} />

          <View style={localStyles.linhaDupla}>
            <View style={{ flex: 1 }}>
              <Text style={localStyles.rotulo}>Número</Text>
              <TextInput style={localStyles.input} placeholder="123..." placeholderTextColor={colors.gray[600]} value={numero} onChangeText={setNumero} />
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={localStyles.rotulo}>Complemento</Text>
              <TextInput style={localStyles.input} placeholder="Casa, Apto..." placeholderTextColor={colors.gray[600]} value={complemento} onChangeText={setComplemento} />
            </View>
          </View>

          <View style={localStyles.linhaDupla}>
            <View style={{ flex: 1 }}>
              <Text style={localStyles.rotulo}>Estado</Text>
              <TextInput style={localStyles.input} placeholder="Selecione..." placeholderTextColor={colors.gray[600]} value={estado} onChangeText={setEstado} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={localStyles.rotulo}>Cidade</Text>
              <TextInput style={localStyles.input} placeholder="Selecione..." placeholderTextColor={colors.gray[600]} value={cidade} onChangeText={setCidade} />
            </View>
          </View>

          <Text style={localStyles.rotulo}>Senha (8 caracteres)</Text>
          <TextInput style={localStyles.input} placeholder="********" placeholderTextColor={colors.gray[600]} secureTextEntry value={senha} onChangeText={setSenha} />

          <Text style={localStyles.rotulo}>Repita a senha</Text>
          <TextInput style={localStyles.input} placeholder="********" placeholderTextColor={colors.gray[600]} secureTextEntry value={repitaSenha} onChangeText={setRepitaSenha} />

          <TouchableOpacity style={localStyles.checkboxContainer} onPress={() => setReceberNotificacoes(!receberNotificacoes)}>
            <View style={[localStyles.checkbox, receberNotificacoes && localStyles.checkboxAtivo]} />
            <Text style={localStyles.textoCheckbox}>Desejo receber notificações do Eventuca?</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 16 }}>
            <Botao titulo="Salvar Perfil" isLoading={carregando} onPress={handleSalvarPerfil} />
          </View>

          <TouchableOpacity onPress={() => setTipoTela('login')} style={{ marginTop: 16, alignItems: 'center' }}>
            <Text style={{ color: colors.orange[500], fontSize: 12 }}>Já tem uma conta? Faça login</Text>
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
        <ScrollView contentContainerStyle={localStyles.scroll}>
          <View style={localStyles.badgeTitulo}>
            <Text style={localStyles.textoBadgeTitulo}>Fazer Login</Text>
          </View>

          <Text style={localStyles.rotulo}>Login</Text>
          <TextInput style={localStyles.input} placeholder="Preencher com nome completo ou email..." placeholderTextColor={colors.gray[600]} value={loginInput} onChangeText={setLoginInput} />

          <Text style={localStyles.rotulo}>Senha (8 caracteres)</Text>
          <TextInput style={localStyles.input} placeholder="********" placeholderTextColor={colors.gray[600]} secureTextEntry value={loginSenha} onChangeText={setLoginSenha} />

          <View style={{ marginTop: 16 }}>
            <Botao titulo="Login" isLoading={carregando} onPress={handleLogin} />
          </View>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={{ color: colors.orange[400], fontSize: 12, marginBottom: 8 }}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTipoTela('cadastro')} style={{ alignItems: 'center' }}>
            <Text style={{ color: colors.orange[400], fontSize: 12 }}>Não tenho senha, quero cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // --- TELA 3: PERFIL LOGADO ---
  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={localStyles.scroll}>
        <Text style={[globalStyles.textoTitulo, { fontSize: 22, marginBottom: 20 }]}>Olá, Fulano!</Text>

        {/* Card Seus Dados */}
        <View style={localStyles.cardPerfil}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 14 }}>Seus dados</Text>
          </View>

          <Text style={localStyles.textoDado}>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> fulano@email.com
          </Text>
          <Text style={localStyles.textoDado}>
            <Text style={{ fontWeight: 'bold' }}>Endereço:</Text> Rua andorinhas, 500 - JD America - Americana/SP
          </Text>

          <TouchableOpacity onPress={() => setTipoTela('cadastro')} style={{ alignSelf: 'flex-end', marginTop: 8 }}>
            <Text style={{ color: colors.orange[400], fontSize: 11 }}>Alterar Dados</Text>
          </TouchableOpacity>
        </View>

        {/* Linha Eventos Criados */}
        <TouchableOpacity style={localStyles.linhaOpcaoPerfil} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={localStyles.textoOpcaoPerfil}>Eventos criados</Text>
          </View>
          <View style={localStyles.badgeContador}>
            <Text style={localStyles.textoContador}>2</Text>
          </View>
        </TouchableOpacity>

        {/* Linha Meus Eventos Salvos */}
        <TouchableOpacity style={localStyles.linhaOpcaoPerfil} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="clipboard-outline" size={16} color={colors.white} />
            <Text style={localStyles.textoOpcaoPerfil}>Meus eventos salvos</Text>
          </View>
          <View style={localStyles.badgeContador}>
            <Text style={localStyles.textoContador}>9</Text>
          </View>
        </TouchableOpacity>

        {/* Botão Logout */}
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity style={localStyles.botaoLogout} onPress={() => setTipoTela('login')} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={16} color={colors.white} />
            <Text style={localStyles.textoLogout}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos específicos integrados para corresponder perfeitamente às imagens
import { StyleSheet } from 'react-native';

const localStyles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 12,
  },
  badgeTitulo: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textoBadgeTitulo: {
    color: colors.orange[500],
    fontSize: 15,
    fontWeight: 'bold',
  },
  rotulo: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white,
    fontSize: 12,
  },
  linhaDupla: {
    flexDirection: 'row',
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 2,
  },
  checkboxAtivo: {
    backgroundColor: colors.orange[500],
  },
  textoCheckbox: {
    color: colors.white,
    fontSize: 11,
  },
  cardPerfil: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.gray[800],
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  textoDado: {
    color: colors.gray[300],
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 18,
  },
  linhaOpcaoPerfil: {
    backgroundColor: colors.gray[900],
    borderWidth: 1,
    borderColor: colors.gray[800],
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textoOpcaoPerfil: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  badgeContador: {
    backgroundColor: colors.red[600],
    borderRadius: 12,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoContador: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  botaoLogout: {
    backgroundColor: colors.orange[600],
    borderRadius: 6,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    alignSelf: 'center',
    width: 140,
  },
  textoLogout: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});