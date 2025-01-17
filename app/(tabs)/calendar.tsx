import { SafeAreaView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Calendar from '@/components/Calendar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CalendarPage() {
  const backgroundColor = useThemeColor({}, 'background');
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          backgroundColor,
          height: '100%',
        }}
      >
        <Calendar />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
