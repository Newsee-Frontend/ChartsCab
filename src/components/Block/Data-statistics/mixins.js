import create from '../../../utils/core/create-basic';
import {Col, Row, Icon} from 'vant';
import BlockHead from '../Block-head/Block-head';
import dataBox from '../Data-box/Data-box';
import yearPicker from '../../yearPicker/yearPicker';

import {palette} from '../../../config';

import {getTime} from '../../../utils/library/time';
import {singleBoxDataHandle} from '../../../utils/data';

export default create({
  data() {
    return {
      palette,
    };
  },
  props: {
    departmentId: [Number, String]
  },
  components: {
    BlockHead,
    dataBox,
    yearPicker,
    Col,
    Row,
    Icon,
  },
  methods: {
    getTime,
    singleBoxDataHandle,
    currentTimeTitle() {
      return `统计数据截止: ${this.getTime()}`
    },
  },
})
