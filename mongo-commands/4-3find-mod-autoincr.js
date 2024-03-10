db.counters.insert(
  {
    _id: "userid",
    seq: 0
  }
)
//------------create auto increament function----------------------------------
function getNextSequence(name) {
  //name: "userid for user collection" , "customerid for customer collectioin", 
  //"product id for product collection"
  var ret = db.counters.findAndModify(
    {
      query: { _id: name },     //finding
      update: { $inc: { seq: 1 } }, //updating
      new: true
    }
  );

  return ret.seq;
}

//now use the above function for autoincreament
db.users.insert(
  {
    _id: getNextSequence("userid"),
    name: "Sarah C."
  }
)

db.users.insert(
  {
    _id: getNextSequence("userid"),
    name: "Bob D."
  }
)