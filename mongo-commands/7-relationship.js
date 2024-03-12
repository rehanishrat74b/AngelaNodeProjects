//Model One-to-One Relationships
/*{
  _id: "joe",
  name: "Joe Bookreader",
  address: {
            street: "123 Fake Street",
            city: "Faketon",
            state: "MA",
            zip: "12345"
          }
}

-----or------
{
   _id: "joe",
   name: "Joe Bookreader"
}

{
   patron_id: "joe",  // a ref to the patron document
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}

*/

//Model One-to-many Relationships
/*
{
   _id: "joe",
   name: "Joe Bookreader",
   addresses: [
                {
                  street: "123 Fake Street",
                  city: "Faketon",
                  state: "MA",
                  zip: "12345"
                },
                {
                  street: "1 Some Other Street",
                  city: "Boston",
                  state: "MA",
                  zip: "12345"
                }
              ]
 }
*/

//Model One-to-Many Relationships with Document References¶
/*
{
  _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA",
   books: [123456789, 234567890, ...]
}
{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher_id: "oreilly"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   publisher_id: "oreilly"
}

*/