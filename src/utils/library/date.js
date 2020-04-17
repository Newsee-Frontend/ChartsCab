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
 * 获取某几年的所有月份
 * @param num 年数
 * @param startYear 开始年份
 */
export const getAllMonths = function(num, startYear) {
  let thisMonth = new Date().getMonth() + 1;
  let arr = [];
  for (let i = 0; i < num; i++) {
    let lastMonth = (startYear === new Date().getFullYear() && i === 0) ? thisMonth : 12;
    for (let j = 1; j <= lastMonth; j++) {
      arr.push(startYear - i + j.toString().padStart(2, 0));
    }
  }
  return arr.join(',');
}
