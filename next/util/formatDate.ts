/* eslint-disable */
const weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

export const getFullDate = (date: Date) => {
  if (!date) return ""
  date = new Date(date);
  return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} ${weekday[date.getDay()]
    } ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}