function timeCover(num) {
  if (parseInt(num) < 10) {
    return '0' + num;
  }
  return num
}

/**
 * 获取时间
 * @returns {string}
 */
export const getTime = () => {

  const timestamp = new Date().getTime();

  const newDate = new Date(timestamp);

  const fullYear = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();


  return timeCover(fullYear) + "." + timeCover(month) + "." + timeCover(date) + "  " + timeCover(hour) + ":"
    + timeCover(minutes) + ":" + timeCover(seconds);

};
