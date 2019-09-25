const router = require('express').Router();

const City = require('./../models/city')

//获取城市数据
router.get('/list', (req, res) => {
  const {page} = req.query || 0;
  const limit = 10;
  let sum = 0;
  City.count({}).then(count => {
    sum = count;
  })
  City.find({}).skip(page * limit).limit(limit).then(result => {
    if (result.length > 0) {
      return res.json({
        code: 0,
        data: {
          list: result,
          total_count: sum,
          page,
          pageSize: limit,
        }
      })
    } else {
      return res.json({
        code: 1,
        msg: '没有数据'
      })
    }
  })
})

//开通城市
router.post('/open', (req, res) => {
  const {city_id, op_mode, use_mode} = req.body;
  if (!city_id || !op_mode || !use_mode) {
    return res.json({
      code: 1,
      msg: '缺少参数'
    })
  }
  const name = city_id == '1' ? '北京市':'天津市'
  City.create({name,mode:use_mode,op_mode}).then(result=>{
    if(result){
      return res.json({
        code:0,
        msg:'添加成功'
      })
    }else {
      return res.json({
        code:1,
        msg:'添加失败，请稍后再试'
      })
    }
  })
})

module.exports = router;
