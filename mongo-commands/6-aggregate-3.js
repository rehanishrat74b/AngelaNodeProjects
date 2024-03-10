//https://www.mongodb.com/docs/v3.0/core/aggregation-introduction/

//Each document in the zipcodes collection has the following form:

/*{
  "_id": "10280",
  "city": "NEW YORK",
  "state": "NY",
  "pop": 5574,
  "loc": [
           -74.016323,
            40.710537
          ]
}*/

//Ex:1-Return States with Populations above 10 Million¶
/*
SELECT state, SUM(pop) AS totalPop
FROM zipcodes
GROUP BY state
HAVING totalPop >= (10*1000*1000)
*/
db.zipcodes.aggregate([
  { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
  { $match: { totalPop: { $gte: 10 * 1000 * 1000 } } }  //where
])

//Ex:2-Return Average City Population by State¶. nested query
/*
select state,avg(pop) as avgCityPop from
  [SELECT state,city,sum(pop) as pop
  from zipcodes
  group by state,city
  ] A
*/
db.zipcodes.aggregate([
  { $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
  { $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
])

//--------------------------------------------------------------------------------
//Return Largest and Smallest Cities by State¶

db.zipcodes.aggregate([
  {
    $group:
    {
      _id: { state: "$state", city: "$city" },
      pop: { $sum: "$pop" }
    }
  },
  { $sort: { pop: 1 } },
  {
    $group:
    {
      _id: "$_id.state",
      biggestCity: { $last: "$_id.city" },
      biggestPop: { $last: "$pop" },
      smallestCity: { $first: "$_id.city" },
      smallestPop: { $first: "$pop" }
    }
  },

  // the following $project is optional, and
  // modifies the output format.

  {
    $project:
    {
      _id: 0,
      state: "$_id",
      biggestCity: { name: "$biggestCity", pop: "$biggestPop" },
      smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
    }
  }
])