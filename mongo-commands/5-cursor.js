//ex1
var myCursor = db.inventory.find({ type: 'food' });

while (myCursor.hasNext()) {
  print(tojson(myCursor.next()));
}


//ex2
var myCursor = db.inventory.find({ type: 'food' });

while (myCursor.hasNext()) {
  printjson(myCursor.next());
}

//ex3
var myCursor = db.inventory.find({ type: 'food' });

myCursor.forEach(printjson);

//----------------------------------------

//In the mongo shell, you can use the toArray() method to iterate the cursor 
//and return the documents in an array, as in the following:

var myCursor = db.inventory.find({ type: 'food' });
var documentArray = myCursor.toArray();
var myDocument = documentArray[3];

