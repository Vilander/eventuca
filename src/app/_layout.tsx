import { iniciarBancoDados } from '@/database/iniciarBancoDados';
import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

export default function Layout() {
  return (
    <SQLiteProvider databaseName ="eventuca.db" onInit ={iniciarBancoDados}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.orange[500],
          tabBarInactiveTintColor: colors.gray[500],
          tabBarStyle: {
            backgroundColor: colors.gray[900],
            borderTopColor: colors.gray[800],
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="adicionar-evento"
          options={{
            title: 'Add Evento',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="salvos"
          options={{
            title: 'Salvos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        
        {/* Oculta as telas de Login e Detalhes do menu inferior */}
        <Tabs.Screen
          name="login"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="evento/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}