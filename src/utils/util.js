export const pagination = function (data,callback) {
  return{
    onChange:(current)=>{
      callback(current)
    },
    current:parseInt(data.data.page),
    pageSize:data.data.page_size,
    total:data.data.total_count,
    showTotal:()=>{
      return `共${data.data.total_count}条`
    },
    showQuickJumper:true
  }
}
