/*
 * Type of data handle for axios-api
 * You can use those fun in help js
 * created: 2020/03/25.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2020 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/
import axios from 'axios';
import { deadline } from '../library/time';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000,
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    try {
      const resData = response.data[0].Response.Data;
      const resultCodeList = ['0000'];

      if (resData && resultCodeList.indexOf(resData.NWRespCode) > -1) {
        deadline.push(Math.max(...Object.values(resData.Record)
          .map(i => i.map(item => item.targetUpdateTime).filter(item => item))
          .filter(i => i.length)
          .toString().split(',')
          .map(i => Number(i))
        ));
        return Promise.resolve(resData.Record);
      } else {
        return Promise.reject(resData.NWErrMsg);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  error => {
    let errorInfo = error.data && error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  }
);

export default service;
