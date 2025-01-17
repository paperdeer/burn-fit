import { FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { CalendarCell } from '@/utils/calendar';
import { ThemedText } from '../ThemedText';
import { CalendarDate } from '@/hooks/useCalendar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useMemo } from 'react';

export type CalendarType = 'MONTH' | 'WEEK';

interface CalendarCellsProps {
  calendarCell: CalendarCell[];
  selectedDate: CalendarDate;
  calendarDate: CalendarDate;
  calendarType: CalendarType;
  onChangeSelectedDate: (date: Date) => void;
  onChangeCalendarDate: (date: Date) => void;
}

const NUM_OF_COLUMS = 7;

const CalendarCells = ({
  calendarCell,
  selectedDate,
  calendarDate,
  calendarType,
  onChangeSelectedDate,
  onChangeCalendarDate,
}: CalendarCellsProps) => {
  const color = useThemeColor({}, 'text');

  const isToday = (date: Date) =>
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day).toString() === date.toString();

  const isHorizonalMode = calendarType === 'WEEK';

  const selectedWeek = useMemo(() => {
    if (!isHorizonalMode) return calendarCell;

    const selectedDateIndex = calendarCell.findIndex(
      ({ date }) =>
        new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day).toString() === date.toString(),
    );
    const startSlicingIndex = selectedDateIndex - calendarDate.date.getDay();
    return calendarCell.slice(startSlicingIndex, startSlicingIndex + 7);
  }, [calendarType, calendarDate, calendarCell]);

  const onScrollEndDrag = (isPrev: boolean) => {
    const newDate = new Date(calendarDate.date);
    const shouldAddValue = isPrev ? -7 : 7;
    newDate.setDate(newDate.getDate() + shouldAddValue);
    onChangeCalendarDate(newDate);
  };

  return (
    <FlatList
      data={selectedWeek}
      onScrollEndDrag={(e) => {
        const isPrev = e.nativeEvent.contentOffset.x < 0;
        onScrollEndDrag(isPrev);
      }}
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
      scrollEnabled={isHorizonalMode}
      horizontal={isHorizonalMode}
      numColumns={!isHorizonalMode ? NUM_OF_COLUMS : undefined}
      key={`${isHorizonalMode}-${calendarCell.toString()}`}
      style={{
        marginTop: 4,
        maxHeight: calendarType === 'WEEK' ? 50 : 'auto',
        flexDirection: 'row',
        overflowX: 'scroll',
      }}
      columnWrapperStyle={
        !isHorizonalMode && {
          gap: 4,
        }
      }
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
