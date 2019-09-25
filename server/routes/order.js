const router = require('express').Router();
const Order = require('./../models/order')

//获取订单列表
router.get('/list',(req,res)=>{
  const {page} = req.query || 0;
  const limit = 10;
  let sum = 0;
  Order.count({}).then(count => {
    sum = count;
  })
  Order.find({}).skip(page * limit).limit(limit).then(result => {
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


module.exports = router;
