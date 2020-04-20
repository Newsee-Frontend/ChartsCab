export default {
  14: {
    actualTarget: {
      sub: '项目面积',
      unit: 'area',
    },
  },
  20: {
    actualTarget: {
      sub: '业主满意率',
      unit: 'percent',
    },
  },
  22: {
    actualTarget: {
      sub: '督导完成合格率',
      unit: 'percent',
    },
  },
  28: {
    actualDenominator: {
      sub: '计划巡检数量',
      unit: 'count',
    },
    actualNumerator: {
      sub: '实际完成数量',
      unit: 'count',
    },
    actualTarget: {
      sub: '完成率',
      unit: 'percent',
    },
  },
  32: {
    actualDenominator: {
      sub: '计划巡检数量',
      unit: 'count',
    },
    actualNumerator: {
      sub: '实际完成数量',
      unit: 'count',
    },
    actualTarget: {
      sub: '完成率',
      unit: 'percent',
    },
  },
  80: {
    actualDenominator: {
      sub: '计划总营收',
      unit: 'num',
    },
    actualNumerator: {
      sub: '实际总营收',
      unit: 'num',
    },
    actualTarget: {
      sub: '总营收完成率',
      unit: 'percent',
    },
  },
  205: {
    actualTarget: {
      sub: '客户投诉数量',
      unit: 'count',
    },
  },
  206: {
    actualTarget: {
      sub: '投诉完成率',
      unit: 'percent',
    },
  },
  256: {
    actualDenominator: {
      sub: '物业费应收',
      unit: 'num',
    },
    actualNumerator: {
      sub: '物业费实收',
      unit: 'num',
    },
    actualTarget: {
      sub: '物业费收缴率',
      unit: 'percent',
    },
  },
  266: {
    actualDenominator: {
      sub: '往年欠费',
      unit: 'num',
    },
    actualNumerator: {
      sub: '往年欠收收缴',
      unit: 'num',
    },
    actualTarget: {
      sub: '往年欠费收缴率',
      unit: 'percent',
    },
  },
  275: {
    actualTarget: {
      sub: '本年欠收',
      unit: 'num',
    },
  },
  283: {
    actualDenominator: {
      sub: '总员工数',
      unit: 'person',
    },
    actualNumerator: {
      sub: '薪酬总支出',
      unit: 'num',
    },
    actualTarget: {
      sub: '薪酬平均支出',
      unit: 'num',
    },
  },
  285: {
    actualDenominator: {
      sub: '全部工单数',
      unit: 'count',
    },
    actualNumerator: {
      sub: '完成总数',
      unit: 'count',
    },
    actualTarget: {
      sub: '完成率',
      unit: 'percent',
    },
  },
  307: {
    actualTarget: {
      sub: '储备面积',
      unit: 'count',
    },
  },
  337: {
    actualTarget: {
      sub: '计划总营收',
      unit: 'area',
    },
  },
};

/**
 * 数据块 - 数据联动关系
 * 多个数据块来源于同一个id，从数据块组件渲染层面考虑，联动的几个对象是相邻的，不可以
 * 例如：计划总营收/实际总营收/总营收完成率 - 数据信息均可从id = 80 入参中获取
 */
