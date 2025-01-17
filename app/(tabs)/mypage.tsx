import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native';

const MyPage = () => {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <ThemedText>My Page</ThemedText>
    </SafeAreaView>
  );
};

export default MyPage;
