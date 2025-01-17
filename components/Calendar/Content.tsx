import { CalendarDate, weekArray } from '@/hooks/useCalendar';
import { ThemedView } from '../ThemedView';
import { useMemo, useState } from 'react';
import { createCalendarCell } from '@/utils/calendar';
import { ThemedText } from '../ThemedText';
import { FlatList, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import CalendarCells, { CalendarType } from './Cells';
import CalendarRecordSection from './RecordSection';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CalendarContentProps {
  selectedDate: CalendarDate;
  calendarDate: CalendarDate;
  onChangeSelectedDate: (date: Date) => void;
  onChangeCalendarDate: (date: Date) => void;
}
const NUM_OF_COLUMS = 7;

const CalendarContent = ({
  selectedDate,
  calendarDate,
  onChangeSelectedDate,
  onChangeCalendarDate,
}: CalendarContentProps) => {
  const color = useThemeColor({}, 'text');
  const calendarCell = useMemo(() => createCalendarCell(calendarDate), [calendarDate.year, calendarDate.month]);

  const [calendarType, setCalendarType] = useState<CalendarType>('MONTH');

  const recordSectionHeight = useSharedValue(400);
  const startTranslateY = useSharedValue(100);

  const gesture = Gesture.Fling()
    .direction(Directions.UP | Directions.DOWN)
    .onBegin((event) => {
      startTranslateY.value = event.y;
    })
    .onEnd((event) => {
      if (startTranslateY.value > event.y) {
        setCalendarType('WEEK');
        recordSectionHeight.value = withSpring(680, { damping: 100 });
      } else {
        setCalendarType('MONTH');
        recordSectionHeight.value = withSpring(400, { damping: 100 });
      }
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    height: recordSectionHeight.value,
  }));

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={{ maxHeight: 20 }}
        data={weekArray}
        renderItem={({ item }) => (
          <ThemedView style={styles.week} key={item}>
            <ThemedText
              style={{
                color: item === '일' ? 'red' : item === '토' ? 'skyblue' : color,
              }}
            >
              {item}
            </ThemedText>
          </ThemedView>
        )}
        numColumns={NUM_OF_COLUMS}
        scrollEnabled={false}
        columnWrapperStyle={{
          gap: 4,
        }}
      />
      <CalendarCells
        calendarCell={calendarCell}
        selectedDate={selectedDate}
        calendarType={calendarType}
        calendarDate={calendarDate}
        onChangeSelectedDate={onChangeSelectedDate}
        onChangeCalendarDate={onChangeCalendarDate}
      />
      <ThemedView style={[styles.calendarContentWrapper, { borderTopColor: color }]}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[{ height: '100%' }, boxAnimatedStyles]}>
            <CalendarRecordSection />
          </Animated.View>
        </GestureDetector>
      </ThemedView>
    </ThemedView>
  );
};

export default CalendarContent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    height: '100%',
  },
  week: {
    width: 45,
    alignItems: 'center',
  },
  calendarContentWrapper: {
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    width: '100%',
    marginTop: 10,
    padding: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});
