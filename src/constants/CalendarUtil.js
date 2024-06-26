import moment from 'moment';

export const CalendarUtil = {
  date: moment().utc().format('YYYY-MM-DD'),
  currentYear: moment().utc().format('YYYY'),
  prayerDate: moment().utc().format('MM/DD/YYYY'),
  timestamp: moment().utc().valueOf(),
  dataYear: moment.utc('2024').format('YYYY-MM-DD'),

  month: 'MMMM DD',
  monthFormat: 'MM',
  format: 'YYYY-MM-DD',
  prayerDateFormat: 'MM/DD/YYYY',
  calendarModalFormat: 'DD MMM YYYY',
  audioDateFormat: 'MM-DD',

  minDate: '2024-01-01',
  maxDate: '2024-12-31',
};
// import moment from 'moment';

// export const CalendarUtil = {
//   date: moment().format('YYYY-MM-DD'),
//   currentYear: moment().format('YYYY'),
//   prayerDate: moment().format('MM/DD/YYYY'),
//   timestamp: moment().valueOf(),
//   dataYear: moment('2024').format('YYYY-MM-DD'),

//   month: 'MMMM DD',
//   monthFormat: 'MM',
//   format: 'YYYY-MM-DD',
//   prayerDateFormat: 'MM/DD/YYYY',
//   calendarModalFormat: 'DD MMM YYYY',
//   audioDateFormat: 'MM-DD',

//   minDate: '2024-01-01',
//   maxDate: '2024-12-31',
// };
