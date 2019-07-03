var express = require('express');
var app = express();
var router = express.Router();
app.use('/', router);
/* var n = require("neo4j-driver"); */
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "mygraph"));

/* GET home page. */
router.get('/', function (req, res, next) {

var session = driver.session();
const cypher = "MATCH (ee:Person {name: {name} }) RETURN ee";
const params = { name: "Emil" };
session.run(cypher, params) .then(result => {
    console.log(result);
    res.send(result);
}).then(() => session.close());

});

app.post('/newrecord', function (req, res, next) {

    var session = driver.session();
    const cypher = "CREATE (ee:Person { name: 'Emily', from: 'Denmark', klout: 99 })";
    session.run(cypher) .then(result => {
        console.log(result);
        res.send(result);
    }).then(() => session.close());
    
    });

    app.post('/updaterecord', function (req, res, next) {

        var session = driver.session();
        const cypher = "MATCH (ee:Person { name: 'Emily' }) SET ee.from = 'Sweeden' RETURN ee.name, ee.from";
        session.run(cypher) .then(result => {
            console.log(result);
            res.send(result);
        }).then(() => session.close());
        
        });

        app.delete('/deleterecord', function (req, res, next) {

            var session = driver.session();
            const cypher = "MATCH (ee:Person { name: 'Emily' }) DELETE ee";
            session.run(cypher) .then(result => {
                console.log(result);
                res.send(result);
            }).then(() => session.close());
            
            });

module.exports = router;
console.log("listening on port : 5000 ");
app.listen(process.env.port || 5000);

/* 
  session.run(
      'match (k:`Person`) where id(k) = {idparam}\
    match p=(k)-[:ACTED_IN]-(m)\
    optional match p2= (k)-[:DIRECTED]-(c)\
  optional match p4= (m)-[:ACTED_IN]-()\
  optional match p5= (m)-[:DIRECTED]-() \
  return p,p2,p4,p5', {idparam: n.v1.int(71)}).subscribe({
    onNext     : function (record) {
      console.log(record);
    },
    onCompleted: function () {
      // Completed!
      session.close();
    },
    onError    : function (error) {
      console.log(error);
      res.send(error);
    }
  }); */


