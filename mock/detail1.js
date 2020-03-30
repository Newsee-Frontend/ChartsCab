//详情页 文本数据(非较上月)
export default [
  {
    Response: {
      Data: {
        NWErrMsg: '操作成功',
        NWRespCode: '0000',
        Record: {
          //总营收计划(actualDenominator)/实际(actualNumerator)/完成率(actualTarget)
          '80': [
            {
              actualDenominator: '',
              actualNumerator: '10869.56',
              actualTarget: '100',
              date: '202002',
              departmentID: '1',
              departmentName: '',
              shouldTarget: '10869.56',
              targetItem: '',
              targetUpdateTime: 1582743650000,
              unit: '%',
            },
          ],
          //物业费应收(actualDenominator)/实收(actualNumerator)/收缴率(actualTarget)
          '256': [
            {
              actualDenominator: '607.24',
              actualNumerator: '92.06',
              actualTarget: '15',
              date: '20201',
              departmentID: '1',
              departmentName: '',
              shouldTarget: '',
              targetItem: '',
              targetUpdateTime: 1582747288000,
              unit: '%',
            },
          ],
          //物业费欠费(actualDenominator)/收缴(actualNumerator)/收缴率(actualTarget)
          '266': [
            {
              actualDenominator: '2555.00',
              actualNumerator: '171.11',
              actualTarget: '6.7',
              date: '20201',
              departmentID: '1',
              departmentName: '',
              shouldTarget: '',
              targetItem: '',
              targetUpdateTime: 1582747821000,
              unit: '%',
            },
          ],
        },
      },
      Head: {
        NWCode: 'Target_getPresidentTarget',
        NWExID: '123',
        NWGUID: '201109090001',
        NWVersion: '1',
      },
    },
  },
];
