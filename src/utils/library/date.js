/**
 * @param length 时间长度 最近几个月
 */
export const getRecentlyMonth = function(length){
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  return Array.from({ length: length },  (k, v) => {
    let delta = month - length + v;
    return delta  > 0 ?  ('' + year +  delta.toString().padStart(2,'0')) : ( '' + ( year - 1) +  (delta + 12).toString().padStart(2,'0'));
  });
};


/**
 * @param year 获取当年所有月份
 */
export const getFullYearMonth = function(year) {
  let thisYear = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  return Array.from({ length: thisYear === year ?  month : 12 },  (k, v) => {
    return  year +  (v+1).toString().padStart(2,'0');
  });
}

/**
 * @param num 获取最近几年的所有月份
 */
export const getAllMonths = function(num) {
  let thisYear = new Date().getFullYear();
  let arr = [];
  for (let i = 0; i < num; i++) {
    for (let j = 1; j < 13; j++) {
      arr.push(thisYear - i + j.toString().padStart(2, 0));
    }
  }
  return arr.join(',');
}
