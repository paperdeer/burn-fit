import useCalendar from '@/hooks/useCalendar';
import { ThemedView } from '../ThemedView';
import CalendarHeader from './Header';
import CalendarContent from './Content';

const Calendar = () => {
  const { calendarDate, selectedDate, onChangeCalendarDate, onChangeSelectedDate } = useCalendar();

  return (
    <ThemedView>
      <CalendarHeader calendarDate={calendarDate} onChangeCalendarMonth={onChangeCalendarDate} />
      <CalendarContent
        calendarDate={calendarDate}
        selectedDate={selectedDate}
        onChangeSelectedDate={onChangeSelectedDate}
        onChangeCalendarDate={onChangeCalendarDate}
      />
    </ThemedView>
  );
};

export default Calendar;
