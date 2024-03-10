//https://www.mongodb.com/docs/v3.0/reference/operator/update/push/#up._S_push
//Append a Value to an Array¶
db.students.update(
  { _id: 1 },
  { $push: { scores: 89 } }
)

//Append Multiple Values to an Array¶
//The following example appends each element of[90, 92, 85] to the scores array 
//for the document where the name field equals joe:
db.students.update(
  { name: "joe" },
  { $push: { scores: { $each: [90, 92, 85] } } }
)

//Use $push Operator with Multiple Modifiers¶
/*
A collection students has the following document:
{
   "_id" : 5,
   "quizzes" : [
      { "wk": 1, "score" : 10 },
      { "wk": 2, "score" : 8 },
      { "wk": 3, "score" : 5 },
      { "wk": 4, "score" : 6 }
   ]
}
*/

//The following $push operation uses:
//the $each modifier to add multiple documents to the quizzes array,
//the $sort modifier to sort all the elements of the modified quizzes array by the score field in descending order, and
//the $slice modifier to keep only the first three sorted elements of the quizzes array.

db.students.update(
  { _id: 5 },
  {
    $push: {
      quizzes: {
        $each: [{ wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 }], //appending
        $sort: { score: -1 },
        $slice: 3
      }
    }
  }
)


