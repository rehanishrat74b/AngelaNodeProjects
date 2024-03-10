//create a database
use myNewDB


//-----------------------------------------------------
//creating index
db.inventory.createIndex({ type: 1, item: 1 })
db.inventory.find(
  { type: "food", item: /^c/ },
  { item: 1, _id: 0 }
)
//----------------------------------------------------
//update
//update users set status="A" where age > 18
db.users.update(
  { age: { $gt: 18 } },
  { $set: { status: "A" } },
  { multi: true }
)

//---------------------------
//delete
//delete from users wehre status="D"
db.users.remove(
  { status: "D" }
)

db.inventory.remove({}) //remove all elements
db.inventory.remove({ type: "food" })

//The following example removes one document from the inventory collection where the type field equals food:
db.inventory.remove({ type: "food" }, 1)

//------------------------------

//--------------------------------









