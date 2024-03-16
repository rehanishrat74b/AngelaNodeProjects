db.customers.aggregate(
  [
    { "$match": { "dob": { "$lt": ISODate("1970-01-01T00:00:00.000Z") } } },
    { "$group": { "_id": "$address.state", "total": { "$sum": "$transactions" } } },
    { "$sort": { "total": -1 } }
  ],
      {"allowDiskUse": true, "collation": { "locale": "en_US" }}
);
