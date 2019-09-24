import JsonP from 'jsonp'
export const jsonp = function (options) {
  return new Promise((resolve, reject) => {
    JsonP(options.url,{
      param:'callback'
    },(err,res)=>{
      if(res.status === 'success'){
        resolve(res)
      }else {
        reject(res.message);
      }
    })
  })
}
