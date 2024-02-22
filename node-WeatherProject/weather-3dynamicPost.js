const express = require('express');
const app = express();
const port = 3000;
const https = require('node:https');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");

});


app.post('/', (req, res) => {

  //api key = 05d99c01a7d56ca6fff3e855e11d888b
  //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=05d99c01a7d56ca6fff3e855e11d888b
  //https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=05d99c01a7d56ca6fff3e855e11d888b
  const apiKey = "05d99c01a7d56ca6fff3e855e11d888b";
  const cityName = req.body.cityName;
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey + "";

  https.get(url, (apiResponse) => {
    //console.log(apiResponse);
    //apiResponse.statusCode ,apiResponse.headers
    console.log(apiResponse.statusCode);
    apiResponse.on("data", (data) => {
      console.log(data); //data is in hexadecimal format
      const weatherdata = JSON.parse(data);
      console.log(weatherdata); //printing in json format
      console.log(JSON.stringify(weatherdata)); // coverting json in a string.

      //accessing json values:
      console.log("Temperature: " + weatherdata.main.temp);
      console.log("Description: " + weatherdata.weather[0].description);


      const temperature = weatherdata.main.temp;
      const description = weatherdata.weather[0].description;
      const iconName = weatherdata.weather[0].icon;
      //http://openweathermap.org/img/wn/10d@2x.png
      //http://openweathermap.org/img/wn/04d@2x.png
      const iconURL = "http://openweathermap.org/img/wn/" + iconName + "@2x.png";

      res.write("<p></p>The weather is currently " + description + "</p>");
      res.write("<h1>The temperature in " + cityName + " is " + temperature + " </h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    })


  });


  //res.send("Server is up and running"); //cannot use send twice for send
});





app.listen(port, function () {
  console.log("server started on port " + port);
});