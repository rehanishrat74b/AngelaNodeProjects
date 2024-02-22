const express = require('express');
const https = require('https');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/0de35fd08a"; // Update with correct Mailchimp API endpoint
  const options = {
    method: "POST",
    auth: "rehan:583ccdb3482d5f7d7761bc1d8f0cbd49-us21"
  }

  const request = https.request(url, options, function (apiResponse) {
    let responseData = '';
    apiResponse.on("data", function (data) {
      responseData += data;
    });

    apiResponse.on("end", function () {
      console.log(JSON.parse(responseData));
      res.send("Subscription successful!"); // Send response to client
    });
  });

  request.on('error', (error) => {
    console.error('Error occurred:', error);
    res.status(500).send("Subscription failed"); // Send error response to client
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
