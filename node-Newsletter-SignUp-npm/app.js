const express = require('express');
const https = require('https');
const app = express();


const client = require("@mailchimp/mailchimp_marketing");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName);
  console.log(lastName);
  console.log(email);

  client.setConfig({
    apiKey: "583ccdb3482d5f7d7761bc1d8f0cbd49-us21",
    server: "us21",
  });



  const run = async () => {
    try {
      return response = await client.lists.addListMember("0de35fd08a", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      });
      //console.log(response); // this line will not execute because of return above
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };


  (async () => {
    try {
      const response = await run();
      console.log("Response Body:", response);
      //res.send(response);
      res.sendFile(__dirname + "/success.html");

    } catch (error) {
      console.error("An error occurred:", error.message);
      res.sendFile(__dirname + "/failure.html");
    }
  })();

});

app.post("/home", (req, res) => {
  res.redirect("/");
});


/* for heroku port number:
process.env.PORT
*/
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});
