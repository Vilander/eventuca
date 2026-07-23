// App.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import TelaAdicionarEvento from '@/app/TelaAdicionarEvento';
import TelaDetalhesEvento from '@/app/TelaDetalhesEvento';
import TelaEventosSalvos from '@/app/TelaEventosSalvos';
import TelaInicio from '@/app/TelaInicio';
import TelaPerfil from '@/app/TelaPerfil';
import { colors } from '@/styles/colors';


export type PilhaInicioParametros = {
  InicioPrincipal: undefined;
  DetalhesEvento: undefined;
};

export type AbasNavegacaoParametros = {
  Início: undefined;
  'Add Evento': undefined;
  Salvos: undefined;
  Perfil: undefined;
};

const Aba = createBottomTabNavigator<AbasNavegacaoParametros>();
const Pilha = createNativeStackNavigator<PilhaInicioParametros>();

function NavegacaoInicio() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      <Pilha.Screen name="InicioPrincipal" component={TelaInicio} />
      <Pilha.Screen name="DetalhesEvento" component={TelaDetalhesEvento} />
    </Pilha.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Aba.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.orange[500],
          tabBarInactiveTintColor: colors.gray[500],
          tabBarStyle: {
            backgroundColor: colors.gray[900],
            borderTopColor: colors.gray[800],
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            let nomeIcone: keyof typeof Ionicons.glyphMap = 'home-outline';

            if (route.name === 'Início') nomeIcone = 'home-outline';
            else if (route.name === 'Add Evento') nomeIcone = 'add-circle-outline';
            else if (route.name === 'Salvos') nomeIcone = 'bookmark-outline';
            else if (route.name === 'Perfil') nomeIcone = 'person-outline';

            return <Ionicons name={nomeIcone} size={size} color={color} />;
          },
        })}
      >
        <Aba.Screen name="Início" component={NavegacaoInicio} />
        <Aba.Screen name="Add Evento" component={TelaAdicionarEvento} />
        <Aba.Screen name="Salvos" component={TelaEventosSalvos} />
        <Aba.Screen name="Perfil" component={TelaPerfil} />
      </Aba.Navigator>
    </NavigationContainer>
  );
}