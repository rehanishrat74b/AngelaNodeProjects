//Consider an inventory collection that contains the following documents:
{ _id: 5, type: "food", item: "aaa", ratings: [5, 8, 9] }
{ _id: 6, type: "food", item: "bbb", ratings: [5, 9] }
{ _id: 7, type: "food", item: "ccc", ratings: [9, 5, 8] }

//exact match
db.inventory.find({ ratings: [5, 8, 9] })
https://www.mongodb.com/docs/v3.0/tutorial/query-documents/

//Match an Array Element
db.inventory.find({ ratings: 5 })

// matches for an element at a particular index or position of the array using the dot notation.
db.inventory.find({ 'ratings.0': 5 })

//Specify Multiple Criteria for Array Elements¶
db.inventory.find({ ratings: { $elemMatch: { $gt: 5, $lt: 9 } } })
db.inventory.find({ ratings: { $gt: 5, $lt: 9 } })

//Arrays with embedded documents
//-----Consider that the inventory collection includes the following documents:---------------
/*{
  _id: 100,
  type: "food",
  item: "xyz",
  qty: 25,
  price: 2.5,
  ratings: [5, 8, 9],
  memos: [{ memo: "on time", by: "shipping" }, { memo: "approved", by: "billing" }]
}

{
  _id: 101,
  type: "fruit",
  item: "jkl",
  qty: 10,
  price: 4.25,
  ratings: [5, 9],
   memos: [{ memo: "on time", by: "payment" }, { memo: "delayed", by: "shipping" }]
}*/


//Match a Field in the Embedded Document Using the Array Index¶
db.inventory.find({ 'memos.0.by': 'shipping' })
db.inventory.find({ 'memos.by': 'shipping' }) //withoud index

//Single Element Satisfies the Criteria¶
db.inventory.find(
  {
    memos:
    {
      $elemMatch:
      {
        memo: 'on time',
        by: 'shipping'
      }
    }
  }
)

//Combination of Elements Satisfies the Criteria¶
db.inventory.find(
  {
    'memos.memo': 'on time',
    'memos.by': 'shipping'
  }
)


//For example, the inventory collection contains the following document:
{ "_id" : 5, "type" : "food", "item" : "aaa", "ratings" : [5, 8, 9] }

//return just the first two elements in the ratings array.
db.inventory.find({ _id: 5 }, { ratings: { $slice: 2 } })







