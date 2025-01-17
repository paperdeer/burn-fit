import { CalendarDate } from '@/hooks/useCalendar';

interface Cell {
  type: 'prev' | 'current' | 'next';
  day: number;
  date: Date;
}

export const createCalendarCell = (currentDate: CalendarDate) => {
  const cells: Cell[] = [];
  const firstWeekOfTheMonth = new Date(currentDate.year, currentDate.month - 1, 1).getDay();
  // 이번달의 1일이 일요일이 아닌 경우
  if (firstWeekOfTheMonth > 0) {
    const prevMonthDate = new Date(currentDate.date);
    prevMonthDate.setDate(0);
    const lastWeekOfThePrevMonth = prevMonthDate.getDate();

    for (let i = firstWeekOfTheMonth - 1; i >= 0; i--) {
      cells.push({
        type: 'prev',
        day: lastWeekOfThePrevMonth - i,
        date: new Date(currentDate.year, currentDate.month - 2, lastWeekOfThePrevMonth - i),
      });
    }
  }

  const lastDayOfCurrentMonth = new Date(currentDate.year, currentDate.month, 0).getDate();
  for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
    cells.push({
      day: i,
      type: 'current',
      date: new Date(currentDate.year, currentDate.month - 1, i),
    });
  }

  const NumOfPreviewDays = 42 - cells.length;

  for (let i = 1; i <= NumOfPreviewDays; i++) {
    cells.push({
      day: i,
      type: 'next',
      date: new Date(currentDate.year, currentDate.month, i),
    });
  }

  return cells;
};
