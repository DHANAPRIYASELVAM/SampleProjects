// main app
const workerFarm = require('worker-farm')
const service = workerFarm(require.resolve('./script'))
const service1 = workerFarm(require.resolve('./script1'))
var ret = 0
 
for (var i = 0; i < 5; i++) {
  service(i,function (out) {
    console.log(out);
  })
  service1(i,function (out) {
    console.log(out);
  })
}