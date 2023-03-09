import moment from 'moment';

export const getDayNumber = date => {
  const convertTo2020 = moment(date).format('MM-DD');
  const converted = new Date('2020-' + convertTo2020);

  return moment(converted).dayOfYear();
};

export const todayDayNumber = () => {
  const todayDate = moment().format('MM-DD');
  const year2020 = new Date('2020-' + todayDate);
  return moment(year2020).dayOfYear();
};

export const getDateFromDay = dayNumber => {
  return moment('2020').dayOfYear(dayNumber);
};
