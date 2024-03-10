//---------------------------------------------------
// find document
//select age from users where age >18 order by age
//ex1
db.users.find(
  {
    age: { $gt: 18 }	//where age > 18
  }
).sort({ age: 1 })   //sort by age


//SELECT * FROM users WHERE status = "A" ORDER BY user_id DESC
db.users.find({ status: "A" }).sort({ user_id: -1 })




// select top 5 name,address from users where age ?18
//ex2
db.users.find(
  { age: { $gt: 18 } },  // age > 18
  { name: 1, address: 1 } //select name, address
).limit(5)  // select top 5

//ex3
//select * from inventory where type=snacks
db.inventory.find(
  { type: "snacks" }
)

//ex4
//select from inventory where type in ('food','snacks')
db.inventory.find(
  { type: { $in: ['food', 'snacks'] } }
)

//ex5: specify AND
//select * from find where type='food' and price < 9.95
db.inventory.find(
  { type: 'food', price: { $lt: 9.95 } }
)

//ex6: specify OR
// select * from inventory where qty>100 or price < 9.95
db.inventory.find(
  {
    $or: [{ qty: { $gt: 100 } }, { price: { $lt: 9.95 } }]
  }
)

//ex7: AND and OR
//select * from inventory where type =food and (qty >100 or price < 9.95)
db.inventory.find(
  {
    type: 'food',
    $or: [{ qty: { $gt: 100 } }, { price: { $lt: 9.95 } }]
  }
)

//SELECT * FROM users WHERE age > 25 AND   age <= 50
db.users.find(
  { age: { $gt: 25, $lte: 50 } }
)

//SELECT user_id, status FROM users WHERE status = "A"
db.users.find(
  { status: "A" },
  { user_id: 1, status: 1, _id: 0 }
)

//SELECT * FROM users WHERE status != "A"
db.users.find(
  { status: { $ne: "A" } }
)


//SELECT * FROM users WHERE user_id like "%bc%"
db.users.find({ user_id: /bc/ })

//SELECT * FROM users WHERE user_id like "bc%"
db.users.find({ user_id: /^bc/ })


//SELECT COUNT(*) FROM users
db.users.count()
db.users.find().count()

//SELECT COUNT(user_id) FROM users
db.users.count({ user_id: { $exists: true } })
db.users.find({ user_id: { $exists: true } }).count()


//SELECT DISTINCT(status) FROM users
db.users.distinct("status")

//SELECT * FROM users LIMIT 1
db.users.findOne()
db.users.find().limit(1)

//SELECT * FROM users LIMIT 5 SKIP 10
db.users.find().limit(5).skip(10)

//EXPLAIN SELECT * FROM users WHERE status = "A"
db.users.find({ status: "A" }).explain()




/*
For example, the inventory collection contains the following document:
{
"_id" : 3,
"type" : "food",
"item" : "aaa",
"classification": { dept: "grocery", category: "chocolate" }
}*/

// returns only the category field in the classification document.The returned category field 
//remains inside the classification document.
db.inventory.find(
  { type: 'food', _id: 3 },
  { "classification.category": 1, _id: 0 }
)

//Suppress Specific Fields in Embedded Documents¶
//the inventory collection contains the following document:
/*{
  "_id" : 3,
  "type" : "food",
  "item" : "Super Dark Chocolate",
  "classification" : { "dept" : "grocery", "category" : "chocolate" },
  "vendor" : {
    "primary" : {
      "name" : "Marsupial Vending Co",
      "address" : "Wallaby Rd",
      "delivery" : ["M", "W", "F"]
    },
    "secondary": {
      "name" : "Intl. Chocolatiers",
      "address" : "Cocoa Plaza",
      "delivery" : ["Sa"]
    }
  }
}*/
//The following operation returns all documents where the value of the type field is food
// and the _id field is 3. The projection suppresses only the category field 
//in the classification document. The dept field remains inside the classification document.
db.inventory.find(
  { type: 'food', _id: 3 },
  { "classification.category": 0 }
)

//You can suppress nested subdocuments at any depth using dot notation. 
//The following specifies a projection to suppress the delivery array only for the secondary document.
db.inventory.find(
  { "type": "food" },
  { "vendor.secondary.delivery": 0 }
)









