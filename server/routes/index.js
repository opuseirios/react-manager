module.exports = function (app) {

  app.use('/city',require('./city'))
  app.use('/order',require('./order'))
}
