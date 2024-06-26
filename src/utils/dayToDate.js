import moment from 'moment';

export const getDayNumber = date => {
  // Convert the date to UTC and format it to 'MM-DD'
  const convertTo2024 = moment.utc(date).format('MM-DD');
  // Create a new date in the '2024' year in UTC
  const converted = moment.utc('2024-' + convertTo2024, 'YYYY-MM-DD');
  // Return the day of the year for the converted date
  return converted.dayOfYear();
};

export const todayDayNumber = () => {
  // Get today's date in 'MM-DD' format in UTC
  const todayDate = moment().utc().format('MM-DD');
  // Create a new date in the '2024' year in UTC
  const year2024 = moment.utc('2024-' + todayDate, 'YYYY-MM-DD');
  // Return the day of the year for today's date in '2024'
  return year2024.dayOfYear();
};

export const getDateFromDay = dayNumber => {
  // Get the date from the day number in '2024' in UTC
  return moment.utc('2024').dayOfYear(dayNumber);
};

// import moment from 'moment';

// export const getDayNumber = date => {
//   const convertTo2024 = moment(date).format('MM-DD');
//   const converted = new Date('2024-' + convertTo2024);

//   return moment(converted).dayOfYear();
// };

// export const todayDayNumber = () => {
//   const todayDate = moment().format('MM-DD');
//   const year2024 = new Date('2024-' + todayDate);
//   return moment(year2024).dayOfYear();
// };

// export const getDateFromDay = dayNumber => {
//   return moment('2024').dayOfYear(dayNumber);
// };
