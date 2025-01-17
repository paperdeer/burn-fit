import { SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';

export default function CalendarPage() {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <SafeAreaView
      style={{
        backgroundColor,
      }}
    >
      <ThemedText>Calendar</ThemedText>
    </SafeAreaView>
  );
}
