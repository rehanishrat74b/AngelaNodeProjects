//https://www.mongodb.com/docs/v3.0/tutorial/aggregation-with-user-preference-data/
//a users collection that tracks the user’s join dates, sport preferences, 
//and stores these data in document

/*{
  _id: "jane",
  joined : ISODate("2011-03-02"),
  likes : ["golf", "racquetball"]
}
{
  _id: "joe",
  joined : ISODate("2012-07-02"),
  likes : ["tennis", "golf", "swimming"]
}*/

//ex1:The following operation returns user names in upper case and in alphabetical order
db.users.aggregate(
  [
    { $project: { name: { $toUpper: "$_id" }, _id: 0 } },
    /*The $project operator: creates a new field called name. converts the value of the _id to upper case, 
    with the $toUpper operator.Then the $project creates a new field, named name to hold this value.*/
    { $sort: { name: 1 } }
  ]
)

//ex2:returns user names sorted by the month they joined
db.users.aggregate(
  [
    {
      $project:
      {
        month_joined: { $month: "$joined" },
        //The $month operator converts the values of the joined field to integer representations of the month.
        name: "$_id",
        _id: 0
      }
    },
    { $sort: { month_joined: 1 } }
  ]
)

//ex3:how many people joined each month of the year.
db.users.aggregate(
  [
    { $project: { month_joined: { $month: "$joined" } } },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    //group by monthid, sum of users
    { $sort: { "_id.month_joined": 1 } } // order by monthid
  ]
)

//ex:4 Return the Five Most Common “Likes”¶
db.users.aggregate(
  [
    { $unwind: "$likes" },
    { $group: { _id: "$likes", number: { $sum: 1 } } },
    { $sort: { number: -1 } },
    { $limit: 5 }
  ]
)
/*
The $unwind operator separates each value in the likes array, and creates a new version
{
  _id : "jane",
  joined : ISODate("2011-03-02"),
  likes : "golf"
}
{
  _id : "jane",
  joined : ISODate("2011-03-02"),
  likes : "racquetball"
}
*/

//--------------------------------



