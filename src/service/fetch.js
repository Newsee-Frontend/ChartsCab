import qs from 'querystring';
import fetch from '../utils/fetch/fetch';

/**
 * query package
 * @param query
 * @returns {*[]}
 */
let queryPackage = query => [
  {
    Request: {
      Head: {
        NWVersion: '1',
        NWCode: 'Target_getPresidentTarget',
        NWGUID: '201109090001',
        NWExID: '123',
      },
      Data: {
        targetList: query,
      },
    },
  },
]

/**
 * 参数拼接
 * @param arr
 * @returns {any[]}
 */
let createParams = (arr) => {
  return Array.from({length: arr.length}, () => ({
    departmentID: '',
    targetItemID: '',
    targetLevel: 2, //1、2、4、7：子公司、集团、项目、组团
    repotyType: 0, //0、2、3、4：年、季、月、周
    date: '', //all、yyyy、yyyymm
    childTargetName: '', //all、xxx
    sort: '', //0、1：升序、降序
    compared: '', //0、1：同比(去年同期)、环比(上个月)
  })).map((item, index) => {
    return Object.assign(item, arr[index]);
  });
};


/**
 * 获取数据
 * @param query
 */
export const getData = query => {

  const params = queryPackage(createParams(query));

  return fetch({
    url: '/ns-face-target/rest/target',
    method: 'post',
    data: params,
    transformRequest: [
      function (data) {
        console.log(data);
        data = qs.stringify({
          request: JSON.stringify(data)
        });

        return data;
      },
    ],
  });
};

// var paramsArea1 = createParams(12, [
//   { targetItemID: "" },
//   { targetItemID: "", compared: "0" },
//   { targetItemID: "207" },
//   { targetItemID: "207", compared: "1" },
//   { targetItemID: "80" },
//   { targetItemID: "80", compared: "1" },
//   { targetItemID: "307" },
//   { targetItemID: "307", compared: "1" },
//   { targetItemID: "14" },
//   { targetItemID: "14", compared: "1" },
//   { targetItemID: "337" },
//   { targetItemID: "337", compared: "0" }
// ]);
