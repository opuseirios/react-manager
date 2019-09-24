const router = require('express').Router();

const City = require('./../models/city')

//获取城市数据
router.get('/list', (req, res) => {
  const {page} = req.query || 0;
  const limit = 10;
  City.find({}).skip(page * limit).limit(limit).then(result => {
    if(result.length>0){
      return res.json({
        code: 0,
        data: result
      })
    }else {
      return res.json({
        code:1,
        msg:'没有数据'
      })
    }
  })
})



module.exports = router;
