var express = require('express');
var app = express();
var multer  =   require('multer');
var path = require('path');
const router = express.Router();
app.use('/', router);
var publicDir = require('path').join(__dirname,'./uploads');
app.use(express.static(publicDir));
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.sendFile(path.join(__dirname+'/successUpload.html'));
    });
});

app.listen(process.env.port || 8000);

console.log('Running at Port 8000');