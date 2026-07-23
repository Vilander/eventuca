import { SafeAreaView } from 'react-native-safe-area-context';
import TelaInicio from './src/screens/TelaInicio';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TelaInicio />
    </SafeAreaView>
  );
}
