import { FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { CalendarCell } from '@/utils/calendar';
import { ThemedText } from '../ThemedText';
import { CalendarDate } from '@/hooks/useCalendar';
import { useThemeColor } from '@/hooks/useThemeColor';

export type CalendarType = 'MONTH' | 'WEEK';

interface CalendarCellsProps {
  calendarCell: CalendarCell[];
  selectedDate: CalendarDate;
  onChangeSelectedDate: (date: Date) => void;
  calendarType: CalendarType;
}

const NUM_OF_COLUMS = 7;

const CalendarCells = ({ calendarCell, selectedDate, onChangeSelectedDate }: CalendarCellsProps) => {
  const color = useThemeColor({}, 'text');

  const isToday = (date: Date) =>
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toString() === date.toString();

  return (
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
  );
};

export default CalendarCells;

const styles = StyleSheet.create({
  cell: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'skyblue',
  },
});
