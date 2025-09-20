// app.js
const connectDB = require('../src/db/db.js'); // Adjust the path accordingly
const product = require('./models/productModel.js');
const cors = require('cors');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 5050
  app.use(cors());


User = require('./models/userModel.js'),
bodyParser = require('body-parser'),
jsonwebtoken = require("jsonwebtoken");

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('./routes/routes.js');
routes(app);


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../frontend/grocery/public/assets'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = file.originalname.split('.').pop(); // Get the original file extension
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + originalExtension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Example usage in a route
app.post('/upload', upload.single('image') ,(req, res,next) => {
  
  const uploadedFile = req.file;

  // upload.single('image')(req,res,next);
  const filename = uploadedFile.filename;
  res.send(`${filename}`);
});


app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;
