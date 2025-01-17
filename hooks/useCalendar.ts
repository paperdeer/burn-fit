import { useState } from 'react';

type Week = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  week: Week;
  date: Date;
}

export const weekArray: readonly Week[] = ['일', '월', '화', '수', '목', '금', '토'];

const getCalendarDate = (date: Date) => ({
  year: date.getFullYear(),
  day: date.getDate(),
  month: date.getMonth() + 1,
  week: weekArray[date.getDay()],
  date,
});

const useCalendar = () => {
  const [calendarDate, setCalendarDate] = useState<CalendarDate>(getCalendarDate(new Date()));
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(getCalendarDate(new Date()));

  const onChangeCalendarDate = (date: Date) => setCalendarDate(getCalendarDate(date));

  const onChangeSelectedDate = (date: Date) => {
    if (date.getMonth() !== calendarDate.date.getMonth() || date.getFullYear() !== calendarDate.date.getFullYear()) {
      setCalendarDate(getCalendarDate(date));
    }
    setSelectedDate(getCalendarDate(date));
  };

  return {
    calendarDate,
    selectedDate,
    setSelectedDate,
    onChangeSelectedDate,
    onChangeCalendarDate,
  };
};

export default useCalendar;
