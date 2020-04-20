import {getUrlParam} from '../../utils/library/urlhandle'

const Base = {
  state: {
    targetLevel: getUrlParam('targetLevel') || 2, //默认集团
    departmentID: getUrlParam('departmentID'),
    departmentName:  getUrlParam('departmentName') || '移动管理驾驶舱'
  }
};

export default Base;
