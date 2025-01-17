import { SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Calendar from '@/components/Calendar';

export default function CalendarPage() {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <SafeAreaView
      style={{
        backgroundColor,
      }}
    >
      <Calendar />
    </SafeAreaView>
  );
}
