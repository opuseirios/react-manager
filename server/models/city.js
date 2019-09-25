const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  mode: String,
  op_mode: String,
  franchisee_id: {type: String, default: '1'},
  franchisee_name: {type: String, default: '松果自营'},
  city_admins: [
    {
      user_name: String,
      user_id: Number
    }
  ],
  open_time: {type: Date, default: Date.now()},
  sys_user_name: String,
  update_time: Date
})

module.exports = mongoose.model('City', CitySchema);
