const express = require('express');
const bodyParser = require('body-parser');
const moduleDate = require('./modules/datev2.js');
const mongoose = require('mongoose');
const dbName = "todoListv3";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";

const _ = require('lodash');
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
//--------------------------------------
const listSchema = mongoose.Schema({
  name: { type: String, required: [true, 'why not name'] },
  items: [itemsSchema]
});
const List = mongoose.model("List", listSchema);

const item1 = new Item({ name: "Welcome to your todo list" });
const item2 = new Item({ name: "Hit a + button to off an item" });
const item3 = new Item({ name: "<-- Hit this to delete an item" });
defaultItems = [item1, item2, item3];

db.on('error', console.error.bind(console, 'Error in connection'));
db.on('close', function () { console.log("db close") });
db.once('open', async function () {


});

let mDate = moduleDate.getDate(); //custom module
let formatedDate = moduleDate.getFormatedDate();

app.get('/', async function (req, res) {

  //res.redirect("/Home");
  await List.find({ name: "Home" })
    .then(foundList => {
      if (!foundList || foundList.length == 0) {
        const nList = new List({
          name: "Home",
          items: [...defaultItems] //avoiding arrays within array by ...
          // the other way is items: [item1,item2,item3]
        });
        nList.save()
          .then(saved => {
            console.log("new List saved:" + saved);
            console.log("home not found and created");
            res.render('list', { keyListName: "Home", kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: saved.items });
          })
          .catch(errnList => { console.log("err in new list: " + errnList) });
        ;
      } else {
        console.log("home list found");
        console.log(foundList);
        res.render('list', { keyListName: "Home", kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: foundList.items });
      }

    })
    .catch(err => { console.log(err); });

});


app.get("/:customListName", async (req, res) => {
  console.log(req.params.customListName);
  const customListName = _.capitalize(req.params.customListName);

  await List.findOne({ name: customListName })
    .then(foundList => {
      if (foundList) {
        console.log("found list:", foundList);
        res.render('list', { keyListName: customListName, kindOfDay: mDate, keyFormatedDate: formatedDate, keyFoods: foundList.items });
      } else {
        console.log("No list found with the specified customListName." + customListName);
        // create a new list
        const list = new List({ name: customListName, items: defaultItems });
        list.save()
          .then(saved => {
            console.log(saved);
            res.redirect("/" + customListName); //local host redirected too many times
          })
          .catch(err => { console.log(err); });
      }
    })
    .catch(err => {
      console.log('error in finding:', err);
    });


});

app.post('/', async (req, res) => {
  //items.push(req.body.item);
  const postedItem = new Item({ name: req.body.item });
  const listName = req.body.list;

  await List.findOne({ name: listName })
    .then(foundList => {
      if (foundList) {
        // Check if the item already exists in the array
        const itemExists = foundList.items.some(item => item.name.toString() == postedItem.name.toString());

        if (!itemExists) {
          // If the item doesn't exist, push it to the array
          foundList.items.push(postedItem); // saving in the corresponding list. localhost:3000/home or work
          foundList.save();
        }
        // Redirect regardless of whether the item was added or not
        res.redirect("/" + listName);
      } else {
        // Handle the case where the list was not found
        res.status(404).send("List not found");
      }
    })
    .catch(err => {
      console.log("Posted error: " + err); // Corrected the logging statement
      res.status(500).send("Error while posting item"); // Handle the error properly
    });


});


app.post('/deleteItem', async (req, res) => {
  console.log(req.body.checkbox);
  const itemId = req.body.checkbox;
  const listName = req.body.listName;

  await List.updateOne(
    { name: listName }, // Assuming listId is the ID of the list you want to update
    { $pull: { items: { _id: itemId } } }, // Assuming itemId is the ID of the item you want to remove
  )
    .then(result => {
      console.log(result);
      res.redirect("/" + listName);
    })
    .catch(err => { console.log(err); });

});


app.listen(process.env.PORT || 3000, function () {
  console.log("server is up on port 3000");
});

