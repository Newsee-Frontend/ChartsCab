export default {
  14: {
    actualTarget: {
      sub: '项目面积',
      main: {
        unit: 'area',
      },
      notes: {
        compare: '较上年',
        unit: 'area',
      },
    },
  },
  20: {
    actualTarget: {
      sub: '业主满意率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '',
        unit: 'percent',
      },
    },
  },
  80: {
    actualDenominator: {
      sub: '计划总营收',
      main: {
        unit: 'num',
      },
      notes: {
        compare: '较上年',
        unit: 'num',
      },
    },
    actualNumerator: {
      sub: '实际总营收',
      main: {
        unit: 'num',
      },
      notes: {
        compare: '较上月',
        unit: 'num',
      },
    },
    actualTarget: {
      sub: '总营收完成率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '较上月',
        unit: 'percent',
      },
    },
  },
  205: {
    actualTarget: {
      sub: '客户投诉数量',
      main: {
        unit: 'num',
      },
      notes: {
        compare: '',
        unit: 'num',
      },
    },
  },
  206: {
    actualTarget: {
      sub: '投诉完成率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '',
        unit: 'percent',
      },
    },
  },
  256: {
    actualDenominator: {
      sub: '物业费应收',
      main: {
        unit: 'num',
      },
    },
    actualNumerator: {
      sub: '物业费实收',
      main: {
        unit: 'num',
      },
      notes: {
        compare: '较上年',
        unit: 'num',
      },
    },
    actualTarget: {
      sub: '物业费收缴率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '较上月',
        unit: 'percent',
      },
    },
  },
  266: {
    actualDenominator: {
      sub: '往年欠费',
      main: {
        unit: 'num',
      },
    },
    actualNumerator: {
      sub: '往年欠收收缴',
      main: {
        unit: 'num',
      },
      notes: {
        compare: '较上月',
        unit: 'num',
      },
    },
    actualTarget: {
      sub: '往年欠费收缴率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '较上月',
        unit: 'percent',
      },
    },
  },
  275: {
    actualTarget: {
      sub: '本年欠收',
      main: {
        unit: 'num',
      },
    },
  },
  285: {
    actualDenominator: {
      sub: '全部工单数量',
      main: {
        unit: 'count',
      },
      notes: {
        compare: '',
        unit: 'count',
      },
    },
    actualNumerator: {
      sub: '完成总数量',
      main: {
        unit: 'count',
      },
      notes: {
        compare: '',
        unit: 'count',
      },
    },
    actualTarget: {
      sub: '完成率',
      main: {
        unit: 'percent',
      },
      notes: {
        compare: '',
        unit: 'percent',
      },
    },
  },
  307: {
    actualTarget: {
      sub: '储备面积',
      main: {
        unit: 'count',
      },
      notes: {
        compare: '较上年',
        unit: 'count',
      },
    },
  },
  337: {
    actualTarget: {
      sub: '计划总营收',
      main: {
        unit: 'area',
      },
      notes: {
        compare: '较上年',
        unit: 'area',
      },
    },
  },
};

/**
 * 数据块 - 数据联动关系
 * 多个数据块来源于同一个id，从数据块组件渲染层面考虑，联动的几个对象是相邻的，不可以
 * 例如：计划总营收/实际总营收/总营收完成率 - 数据信息均可从id = 80 入参中获取
 */
