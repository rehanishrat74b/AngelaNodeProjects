const express = require('express');
const bodyParser = require('body-parser');
const moduleDate = require('./modules/datev2.js');
var items = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');  //here using ejs. 

app.get('/', function (req, res) {


  let mDate = moduleDate.getDate(); //custom module
  let formatedDate = moduleDate.getFormatedDate();


  res.render('list', { kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: items });

});

app.post('/', (req, res) => {
  items.push(req.body.item);
  res.redirect('/')
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is up on port 3000");
});

