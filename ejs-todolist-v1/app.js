const express = require('express');
const bodyParser = require('body-parser');
var items = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');  //here using ejs. 

app.get('/', function (req, res) {
  var today = new Date();
  var day = "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (today.getDay() == 0 || today.getDay() == 6) {
    day = "weekend-" + days[today.getDay()];
  }
  else {
    day = "weekday-" + days[today.getDay()];
  }

  //another example
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formatedDate = today.toLocaleDateString("en-US", options);

  res.render('list', { kindOfDay: day, keyFormatedDate: formatedDate, keyFoods: items });

});

app.post('/', (req, res) => {
  items.push(req.body.item);
  res.redirect('/')
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is up on port 3000");
});

