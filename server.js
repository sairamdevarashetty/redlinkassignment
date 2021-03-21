var express = require ('express');

(async function(){
  console.log("running func");
  await require('./dbconfig.js').DBConfig();
  await require('./model.js');
  await require('./api.js');
})();

var app = express()
app.listen(3000)
app.use(express.json());
module.exports = {
  app
}
