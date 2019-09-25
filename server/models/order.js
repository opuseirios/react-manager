const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  "id": Number,
  "order_sn": String,
  "bike_sn": String,
  "user_id": Number,
  "user_name": String,
  "mobile": String,
  "distance": Number,
  "total_time": Number,
  "status": Number,
  "start_time": Date,
  "end_time": Date,
  "total_fee": Number,
  "user_pay": Number
})

module.exports = mongoose.model('Order',OrderSchema);
