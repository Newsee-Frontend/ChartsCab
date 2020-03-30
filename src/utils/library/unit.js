/**
 * get string length
 * @param tempNum
 * @returns {number}
 */
function strNumSize(tempNum) {
  const stringNum = tempNum.toString();
  const index = stringNum.indexOf(".");
  let newNum = stringNum;
  if (index !== -1) {
    newNum = stringNum.substring(0, index)
  }
  return newNum.length
}

/**
 * 单位转换 core
 * @param num
 * @param options
 * @returns {{num: number, unit: string}}
 */
export const unitCore = (num, options = {
  units: ["万元", "亿元", "万亿"],//单位
  dividend: 10000,//各个单位的转换进制倍数
  skip: 3,//进制位数
  fixed: 2,//保留几位小数
  parseFloat: true,//去除尾部0
}) => {
  num = Number(num);
  let curentNum = num;
  //转换数字
  let curentUnit = options.units[0];
  //转换单位
  for (let i = 0; i < 3; i++) {
    curentUnit = options.units[i];
    if (strNumSize(curentNum) <= options.skip) {
      break;
    }
    curentNum = curentNum / options.dividend
  }
  let m = {num: 0, unit: ""};

  const fixNum = curentNum.toFixed(options.fixed);

  m.num = options.parseFloat ? parseFloat(fixNum) : fixNum;
  m.unit = curentUnit;
  return m;
};


/**
 * 单位转换
 * @param num
 * @param type      count-个数  num-数字  area-面积  percent-百分比
 * @returns {{num: number, unit: string}}
 */
export const unitConvert = (num, type) => {
  if (!type) return;

  let opts = {
    units: ["万元", "亿元", "万亿"],
    dividend: 10000,
    skip: 3,
    fixed: 2,
    parseFloat: true,
  };

  switch (type) {

    //个数 类型
    case 'count':
      opts.units = ["个", "万个", "亿个"];
      break;
    //数字 类型
    case 'num':
      opts.units = ["万元", "亿元", "万亿"];
      break;
    //面积 类型
    case 'area':
      opts.units = ["万方", "亿方", "万亿方"];
      break;
    //百分比 类型
    case 'percent':
      return {
        num: num,
        unit: '%'
      };

    default:
      break
  }

  return unitCore(num, opts);

};









