import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { getWordDeclension } from '@/helpers/getWordDeclension';

dayjs.extend(duration);
dayjs.extend(relativeTime);

// @ts-ignore
function getText({ minutes, totalHours, hours, targetDate }): string {
  if (totalHours < 1) {
    return `${minutes} ${getWordDeclension(minutes, ['минута', 'минуты', 'минут'])} назад`;
  } else if (totalHours < 24) {
    return `${hours} ${getWordDeclension(hours, ['час', 'часа', 'часов'])} назад`;
  } else {
    return targetDate.format('DD.MM.YYYY HH:mm');
  }
}

export const getTimeHasPassed = (date: string): string => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diff = now.diff(targetDate);

  const minutes = dayjs.duration(diff).minutes();
  const hours = dayjs.duration(diff).hours();
  const totalHours = Math.floor(dayjs.duration(diff).asHours());

  return getText({ totalHours, minutes, hours, targetDate });
};
