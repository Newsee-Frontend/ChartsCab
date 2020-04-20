import controller from '../../components/Block/controller'
import {unitConvert} from '../library/unit'


/**
 * 获取文本块状基础数据
 * @param data
 * @param id
 * @param key
 * @returns {*}
 */
export const getActualValue = (data, id, key) => {
  try {
    return data[id][0][key]
  }
  catch (e) {
    return 0;
  }
};

/**
 * 单个数据块 - 数据处理
 * @param data
 * @param idList
 * @returns {*}
 */
export const singleBoxDataHandle = (data, idList) => {
  if (!(idList && idList.length)) return [];
  return idList.map(item => {
    // console.log(item);

    const id = item.id;//取值id
    const key = item.key; //取值字段名
    const rawData = getActualValue(data, id, key);//实际取值
    const configure = controller[id][key];//获取控制器中对应的配置对象

    if (configure) {
      const unitConvertVal = unitConvert(rawData, configure.unit);//数值单位转换
      return {
        sub: configure.sub,
        num: unitConvertVal.num,
        unit: unitConvertVal.unit,
        // notes: (configure.notes || []).map(item => {
        //   let mix = unitConvert(item.num, item.unit);
        //   mix.num = 12.44;
        //   configure.notes.length > 1 && (mix.num = mix.num.toFixed(0));
        //   return {
        //     compare: item.compare,
        //     num: mix.num,
        //     unit: mix.unit,
        //   }
        // })
      };

    }
    else {
      console.error(`【管理驾驶舱】controller配置文件中缺少对应 ID:${id} ，请检查`)
    }
  }).filter(item => item)
}

