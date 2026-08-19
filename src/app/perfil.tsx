import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

export default function TelaPerfil() {
  // Simulando dados que já estariam salvos (vindo do banco ou storage)
  // Se estiverem vazios, significa que o usuário ainda não se cadastrou.
  const [nome, setNome] = useState('João da Silva');
  const [email, setEmail] = useState('joao.silva@email.com');
  const [telefone, setTelefone] = useState('(19) 99999-9999');
  const [cidade, setCidade] = useState('Americana, SP');
  
  const [carregando, setCarregando] = useState(false);

  function handleSalvarPerfil() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      alert('Perfil atualizado com sucesso!');
    }, 1500);
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        <Text style={globalStyles.textoTitulo}>Meu Perfil</Text>
        <Text style={globalStyles.textoSubtitulo}>Visualize ou atualize suas informações pessoais.</Text>

        <View style={{ marginTop: 20, gap: 12 }}>
          <Text style={{ color: colors.white, fontSize: 13, fontWeight: 'bold' }}>Nome Completo</Text>
          <TextInput
            style={globalStyles.campoTexto}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.gray[500]}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={{ color: colors.white, fontSize: 13, fontWeight: 'bold' }}>E-mail</Text>
          <TextInput
            style={globalStyles.campoTexto}
            placeholder="seu@email.com"
            placeholderTextColor={colors.gray[500]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={{ color: colors.white, fontSize: 13, fontWeight: 'bold' }}>Telefone / WhatsApp</Text>
          <TextInput
            style={globalStyles.campoTexto}
            placeholder="(00) 00000-0000"
            placeholderTextColor={colors.gray[500]}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={{ color: colors.white, fontSize: 13, fontWeight: 'bold' }}>Cidade / Estado</Text>
          <TextInput
            style={globalStyles.campoTexto}
            placeholder="Ex: Americana, SP"
            placeholderTextColor={colors.gray[500]}
            value={cidade}
            onChangeText={setCidade}
          />

          <View style={{ marginTop: 16 }}>
            <Botao
              titulo="Salvar Alterações"
              isLoading={carregando}
              onPress={handleSalvarPerfil}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}