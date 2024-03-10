/*
For the document with item equal to "MNO2", use the $set operator 
to update the category field and the details field to the specified 
values and the $currentDate operator to update the field lastModified with the current date.
 */

db.inventory.update(
  { item: "MNO2" },
  {
    $set: {
      category: "apparel",
      details: { model: "14Q3", manufacturer: "XYZ Company" }
    },
    $currentDate: { lastModified: true }
  }
)

//Update an embedded field.
db.inventory.update(
  { item: "ABC1" },
  { $set: { "details.model": "14Q2" } }
)


//UPDATE users SET status = "C" WHERE age > 25
db.users.update(
  { age: { $gt: 25 } },
  { $set: { status: "C" } },
  { multi: true }
)

//UPDATE users SET age = age + 3 WHERE status = "A"
db.users.update(
  { status: "A" },
  { $inc: { age: 3 } },
  { multi: true }
)



//Update multiple documents.¶
db.inventory.update(
  { category: "clothing" },
  {
    $set: { category: "apparel" },
    $currentDate: { lastModified: true }
  },
  { multi: true }
)

//Replace a document.replaces the document with item equal to "BE10"
db.inventory.update(
  { item: "BE10" },
  {
    item: "BE05",
    stock: [{ size: "S", qty: 20 }, { size: "M", qty: 5 }],
    category: "apparel"
  }
)
//Specify upsert: true for the update replacement operation.¶
//The following operation either updates a matching document by replacing it 
//with a new document or adds a new document if no matching document exists.

db.inventory.update(
  { item: "TBD1" },
  {
    item: "TBD1",
    details: { "model": "14Q4", "manufacturer": "ABC Company" },
    stock: [{ "size": "S", "qty": 25 }],
    category: "houseware"
  },
  { upsert: true }
)

//Specify upsert: true for the update specific fields operation.¶
db.inventory.update(
  { item: "TBD2" },
  {
    $set: {
      details: { "model": "14Q3", "manufacturer": "IJK Co." },
      category: "houseware"
    }
  },
  { upsert: true }
)

//--------------------------------------------
//ALTER TABLE users ADD join_date DATETIME
db.users.update(
  {},
  { $set: { join_date: new Date() } },
  { multi: true }
)

//ALTER TABLE users DROP COLUMN join_date
db.users.update(
  {},
  { $unset: { join_date: "" } },
  { multi: true }
)

//CREATE INDEX idx_user_id_asc ON users(user_id)
db.users.createIndex({ user_id: 1 })

//CREATE INDEX idx_user_id_asc_age_desc ON users(user_id, age DESC)
db.users.createIndex({ user_id: 1, age: -1 })

//DROP TABLE users
db.users.drop()










