import { DateTime } from './luxon.js';

const date = document.querySelector('.date-now');

const time = () => {
  const dateTimeNow = DateTime.now();
  date.textContent = dateTimeNow.toLocaleString(DateTime.DATETIME_MED);
};

setInterval(time, 1000);
