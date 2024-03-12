// for inserting
//https://www.mongodb.com/docs/manual/reference/method/db.getCollection/
db = db.getSiblingDB("DemoDB");
var user = db.getCollection("users");

user.insertOne(
  {
    name: "haroon",
    age: 26,
    status: "C",
    groups: ["Sales", "Customers"]
  }
)


// for selecting all
db = db.getSiblingDB("DemoDB");
db.getCollection("users").find({});