db.getCollection("customers").aggregate(

  // Pipeline
  [
    // Stage 1
    {
      $match: { "dob": { "$lt": ISODate("1970-01-01T00:00:00.000Z") } }
    },

    // Stage 2
    {
      $group: { "_id": "$address.state", "total": { "$sum": "$transactions" } }
    },

    // Stage 3
    {
      $project: {
        _id: 0, //exclude the _id field
        state: "$_id", // rename field _id in stage2 : "_id": "$address.state"
        total: 1  // include the total field

      }
    },

    // Stage 4
    {
      $replaceRoot: {
        newRoot: { state: "$state", total: "$total" }
      }// $replaceRoot replaces input documents with output documents.
    },

    // Stage 5
    {
      $sort: //{ "total": -1 }
        { "state": 1 } // order by state
    }
  ],

  // Options
  {
    allowDiskUse: true,

    collation: {
      locale: "en_US"
    }
  }

  // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
//https://studio3t.com/academy/lessons/working-with-arrays-in-the-aggregation-pipeline/