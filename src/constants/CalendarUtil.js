import moment from 'moment';

export const CalendarUtil = {
  date: moment().format('YYYY-MM-DD'),
  currentYear: moment().format('YYYY'),
  prayerDate: moment().format('MM/DD/YYYY'),
  timestamp: moment().valueOf(),
  dataYear: moment('2021').format('YYYY-MM-DD'),

  month: 'MMMM DD',
  monthFormat: 'MM',
  format: 'YYYY-MM-DD',
  prayerDateFormat: 'MM/DD/YYYY',
  calendarModalFormat: 'DD MMM YYYY',
  audioDateFormat: 'MM-DD',

  minDate: '2021-01-01',
  maxDate: '2021-12-31',
};
