const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // to read posted form data



app.get('/', (req, res) => {
  //res.send("hello");
  res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
  console.log(req.body); // retrieving the controls posted from index.html->form.submit.
  var num1 = Number(req.body.firstNumber); //from index.html
  var num2 = Number(req.body.secondNumber);
  var result = num1 + num2;
  res.send("The result of sum is " + result);
});

app.get('/bmi', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});
app.post('/bmi', (req, res) => {
  console.log(req.body);
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = Number(weight / height * height);
  res.send("Your BMI is " + bmi);

});

app.listen(port, () => {
  console.log(`application started at port ${port}`);
})