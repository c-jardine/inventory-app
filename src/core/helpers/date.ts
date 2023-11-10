import { intervalToDuration } from 'date-fns';

export function isMoreThanXDaysAway(daysAway = 7, date: Date) {
  const interval = intervalToDuration({
    start: date,
    end: new Date(),
  });

  return interval.days && interval.days > daysAway;
}
