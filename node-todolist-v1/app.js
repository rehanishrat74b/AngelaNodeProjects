const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  var today = new Date();
  if (today.getDay() == 0 || today.getDay() == 6) {
    // if saturday or sunday
    res.send("Its Holiday");
  } else {
    res.send("Oops! you have to work");
  }
});

// for heroku server process.env.PORT
app.listen(process.env.PORT || 3000, function () {
  console.log("server is listening on port 3000");
});