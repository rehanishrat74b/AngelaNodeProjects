const mongoose = require('mongoose');
const dbName = "fruits";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";

//const uri = "mongodb+srv://rehanishrat74:CiGrTSUnp1pdfyut@clusterrehan.ftufvvt.mongodb.net/test?retryWrites=true&w=majority&appName=ClusterRehan";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";

mongoose.connect(uri)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error on connection'));
db.on('close', function () {
  console.log('db.Mongoose connection closed successfully.');
});
mongoose.connection.on('close', function () {
  console.log('In Mongoose connection closed successfully.');

});
/*-----------------------------error handling on connect-------------------------*/
/*db.on('error', function (error) {
  console.error('Error on connection:', error);
});*/

/*try {
  await mongoose.connect(uri);
} catch (error) {
  //handleError(error);
  console.log(error);
}*/
/*--------------------------------------------------------------------------- */

db.once('open', async function () {
  console.log('connected to fruits');
  const fruitSchema = mongoose.Schema({
    name: { type: String, required: [true, 'why not name.'] },
    score: { type: Number, min: [1, 'Too low rating, got {VALUE}'], max: 5 },
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema); //creating table
  const orange = new Fruit({ name: "Orange", score: 4, review: "Too sour for me" }); //creating rows
  const banana = new Fruit({ name: "banana", score: 5, review: "weird" });
  const apple = new Fruit({ name: "apple", score: 2, review: "best" });

  /*----------------------------uncomment to insert fruits---------------------------*/
  try {
    await Fruit.insertMany([orange, banana, apple]); // populating rows
    console.log("saved");
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await Fruit.updateOne({ name: 'apple' }, { name: 'apple-updated' });
  } catch (error) {
    console.log(error);
  }
  //await Fruit.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec();
  /*--------------------Creating 1-1 relationships---------------------------------------*/

  const personSchema = mongoose.Schema(
    {
      name: { type: String, required: [true, 'name is mandatory'] },
      age: { type: Number, min: [1, 'age must be greater than 1 year'], max: 100 },
      favouriteFruit: fruitSchema
    }
  );

  const Person = mongoose.model("Person", personSchema);
  const rehan = new Person({ name: "rehan", age: 49, favouriteFruit: orange });
  try {
    await rehan.save();
  } catch (error) {
    console.log(error);
  }


  try {
    const fruits = await Fruit.find();
    console.log(fruits);

    fruits.forEach(singleFruit => {
      console.log(singleFruit.name);
    });

    console.log(rehan); //logging person
  } catch (errors) {
    console.log(errors);
  }

  //  db.connection.close();
  db.close();


});