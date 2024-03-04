const express = require('express');
const bodyParser = require('body-parser');
const moduleDate = require('./modules/datev2.js');
const mongoose = require('mongoose');
const dbName = "todoListv3";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";

var items = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');  //here using ejs. 

mongoose.connect(uri);
const db = mongoose.connection;

const itemsSchema = mongoose.Schema({
  name: { type: String, required: [true, 'why not item name'] }
});
const Item = mongoose.model("Item", itemsSchema); //model
let defaultItems = [];

db.on('error', console.error.bind(console, 'Error in connection'));
db.on('close', function () { console.log("db close") });
db.once('open', async function () {

  const item1 = new Item({ name: "Welcome to your todo list" });
  const item2 = new Item({ name: "Hit a + button to off an item" });
  const item3 = new Item({ name: "<-- Hit this to delete an item" });
  defaultItems = [item1, item2, item3];

});



app.get('/', async function (req, res) {

  let mDate = moduleDate.getDate(); //custom module
  let formatedDate = moduleDate.getFormatedDate();

  await Item.find({})
    .then(mitems => {
      if (mitems.length == 0) {
        Item.insertMany(defaultItems)
          .then(saved => {
            console.log('saved items:', saved);
            res.render('list', { kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: saved });
          })
          .catch(err => { console.log(err) });
      } else {
        res.render('list', { kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: mitems });
      }

    })
    .catch(err => { console.log(err) });


});



app.post('/', (req, res) => {
  items.push(req.body.item);
  res.redirect('/')
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is up on port 3000");
});

