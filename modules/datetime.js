const time = () => {
  const dateTimeNow = DateTime.now();
  document.querySelector('.date').innerHTML = dateTimeNow.toLocaleString(DateTime.DATETIME_MED);
}

setInterval(time, 1000);