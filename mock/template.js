const res = (req, res) => {
  const body = req.body;



  console.log(11111111);
  console.log(body);


  let data = null;

  if(body === 1){
    data = 1
  }
  else if(body === 2){
    data = 2
  }

  return res.json([
    {
      Response: {
        Data: {
          NWErrMsg: '操作成功',
          NWRespCode: '0000',
          Record: data
        },
        Head: {
          NWCode: 'Target_getPresidentTarget',
          NWExID: '123',
          NWGUID: '201109090001',
          NWVersion: '1',
        },
      },
    },
  ]);
};


module.exports = {
  'POST /ns-face-target/rest/target': res, //退出登录
};
