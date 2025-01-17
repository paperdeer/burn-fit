import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native';

const Library = () => {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <ThemedText>Library</ThemedText>
    </SafeAreaView>
  );
};

export default Library;
