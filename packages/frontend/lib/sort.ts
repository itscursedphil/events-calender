import dayjs from 'dayjs';

export type EventWithDate<E = {}> = E & { startDate: string };

export type EventsByDay<E = {}> = {
  date: string;
  events: EventWithDate<E>[];
}[];

export const sortEventsByDay: <E = {}>(
  events: EventWithDate<E>[]
) => EventsByDay<E> = (events) => {
  type EV = typeof events;

  return events
    .map((event) => dayjs(event.startDate).startOf('day').valueOf())
    .reduce<number[]>((reduced, date) => {
      if (reduced.includes(date)) return reduced;
      return [...reduced, date];
    }, [])
    .sort((a, b) => a - b)
    .map((date) => dayjs(date).toISOString())
    .reduce<{ date: string; events: EV }[]>((reduced, date) => {
      const eventsForDay = events.filter(
        (event) => dayjs(event.startDate).startOf('day').toISOString() === date
      );

      return [...reduced, { date, events: eventsForDay }];
    }, []);
};
