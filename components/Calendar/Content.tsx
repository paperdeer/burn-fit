import { CalendarDate, weekArray } from '@/hooks/useCalendar';
import { ThemedView } from '../ThemedView';
import { useMemo } from 'react';
import { createCalendarCell } from '@/utils/calendar';
import { ThemedText } from '../ThemedText';
import { FlatList, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CalendarContentProps {
  selectedDate: CalendarDate;
  calendarDate: CalendarDate;
  onChangeSelectedDate: (date: Date) => void;
}
const NUM_OF_COLUMS = 7;

const CalendarContent = ({ selectedDate, calendarDate, onChangeSelectedDate }: CalendarContentProps) => {
  const color = useThemeColor({}, 'text');
  const calendarCell = useMemo(() => createCalendarCell(calendarDate), [calendarDate.year, calendarDate.month]);

  const isToday = (date: Date) =>
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toString() === date.toString();

  return (
    <ThemedView style={styles.container}>
      <FlatList
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
      <FlatList
        data={calendarCell}
        renderItem={({ item }) => (
          <ThemedView
            style={{
              ...styles.cell,
              borderWidth: isToday(item.date) ? 1 : undefined,
            }}
            key={`${item.type}-${item.day}`}
          >
            <ThemedText
              onPress={() => onChangeSelectedDate(item.date)}
              style={{ color: item.type !== 'current' ? 'gray' : color }}
            >
              {item.day}
            </ThemedText>
          </ThemedView>
        )}
        numColumns={NUM_OF_COLUMS}
        scrollEnabled={false}
        style={{
          marginTop: 4,
        }}
        columnWrapperStyle={{
          gap: 4,
        }}
        contentContainerStyle={{
          gap: 4,
        }}
      />
    </ThemedView>
  );
};

export default CalendarContent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  week: {
    width: 45,
    alignItems: 'center',
  },
  cell: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'skyblue',
  },
});
