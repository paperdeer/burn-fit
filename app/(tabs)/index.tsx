import { SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <ThemedText>Home</ThemedText>
    </SafeAreaView>
  );
}
