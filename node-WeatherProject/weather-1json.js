const express = require('express');
const app = express();
const port = 3000;

const https = require('node:https');

app.get('/', (req, res) => {
  //api key = 05d99c01a7d56ca6fff3e855e11d888b
  //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=05d99c01a7d56ca6fff3e855e11d888b
  //https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=05d99c01a7d56ca6fff3e855e11d888b
  const url = "https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=05d99c01a7d56ca6fff3e855e11d888b";

  https.get(url, (response) => {
    //console.log(response);
    //response.statusCode ,response.headers
    console.log(response.statusCode);
    response.on("data", (data) => {
      console.log(data); //data is in hexadecimal format
      const weatherdata = JSON.parse(data);
      console.log(weatherdata); //printing in json format
      console.log(JSON.stringify(weatherdata)); // coverting json in a string.

      //accessing json values:
      console.log("Temperature: " + weatherdata.main.temp);
      console.log("Description: " + weatherdata.weather[0].description);

    })


  });


  res.send("Server is up and running");


});


app.listen(port, function () {
  console.log("server started on port " + port);
});