db.users.insert({ x: 1 })

//inserts documents
//ex:1
db.users.insert(
  {
    name: "sue",
    age: 26,
    status: "A"
	  groups: ["news", "sports"]  //array
  }
)
//ex:2
db.inventory.insert(
  {
    item: "ABC1",
    details: {
      model: "14Q3",
      manufacturer: "XYZ Company"
    },
    stock: [{ size: "S", qty: 25 }, { size: "M", qty: 50 }],
    category: "clothing"
  }
)
//ex3:
//bulk insert in collection items
var bulk = db.items.initializeUnorderedBulkOp();
bulk.insert({ _id: 1, item: "abc123", status: "A", soldQty: 5000 });
bulk.insert({ _id: 2, item: "abc456", status: "A", soldQty: 150 });
bulk.insert({ _id: 3, item: "abc789", status: "P", soldQty: 0 });
bulk.execute({ w: "majority", wtimeout: 5000 });
