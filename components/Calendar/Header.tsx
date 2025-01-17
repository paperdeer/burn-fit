import { StyleSheet } from 'react-native';
import { HapticTab } from '../HapticTab';
import { ThemedView } from '../ThemedView';
import { IconSymbol } from '../ui/IconSymbol';
import { ThemedText } from '../ThemedText';
import { CalendarDate } from '@/hooks/useCalendar';

interface CalendarHeaderProps {
  calendarDate: CalendarDate;
  onChangeCalendarMonth: (date: Date) => void;
}

const CalendarHeader = ({ calendarDate, onChangeCalendarMonth }: CalendarHeaderProps) => {
  const { month, year, day } = calendarDate;
  const onClick = (type: 'prev' | 'next') => {
    const changedMonth = type === 'next' ? month + 1 : month - 1;
    onChangeCalendarMonth(new Date(`${year}-${changedMonth}-${day}`));
  };

  return (
    <ThemedView style={styles.container}>
      <HapticTab onPress={() => onClick('prev')}>
        <IconSymbol name="arrow.backward" color="skyblue" size={24} />
      </HapticTab>
      <ThemedText type="subtitle">
        {year}년 {month}월
      </ThemedText>
      <HapticTab onPress={() => onClick('next')}>
        <IconSymbol name="arrow.forward" color="skyblue" size={24} />
      </HapticTab>
    </ThemedView>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
