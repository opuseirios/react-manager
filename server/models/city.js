const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  mode: String,
  op_mode: String,
  franchisee_id: String,
  franchisee_name: String,
  city_admins: [
    {
      user_name: String,
      user_id: Number
    }
  ],
  open_time: String,
  sys_user_name: String,
  update_time: Date
})

module.exports = mongoose.model('City', CitySchema);
