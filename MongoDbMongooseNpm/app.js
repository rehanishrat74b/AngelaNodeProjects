const mongoose = require('mongoose');
const uri = "mongodb+srv://rehanishrat74:CiGrTSUnp1pdfyut@clusterrehan.ftufvvt.mongodb.net/test?retryWrites=true&w=majority&appName=ClusterRehan";

//main().catch(err => console.log(err));

/*async function main() {
  await mongoose.connect('mongodb+srv://rehanishrat74:CiGrTSUnp1pdfyut@clusterrehan.ftufvvt.mongodb.net/test?retryWrites=true&w=majority&appName=ClusterRehan');


  //table schema with field name of datatype string
  const kittySchema = new mongoose.Schema({
    name: String
  });

  //to create a document/row a model is needed
  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' }); //document or row is created
  console.log(silence.name); // 'Silence'

}*/

// Connect to MongoDB database
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('Connected to MongoDB');

  /*--------------------Adding , inserting in mongo db with mongoose ------------------------*/

  //table schema with field name of datatype string
  const kittySchema = new mongoose.Schema({
    name: String
  });
  //other datatypes are e.g Number

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };

  //to create a document/row a model is needed
  const Kitten = mongoose.model('Kitten', kittySchema); //table or collection
  const silence = new Kitten({ name: 'Silence' }); //document or row is created
  console.log(silence.name); // 'Silence'

  try {
    await silence.save(); //saving document row
    silence.speak();
  } catch (error) {
    console.error(error);
  }

  try {
    const kittens = await Kitten.find(); //listing all the kittens
    console.log("listing all the kittens");
    console.log(kittens);
  } catch (error) {
    console.error(error)
  }

  try {
    const mykitten = await Kitten.find({ name: /^sil/ }); //search all kittens with name like sil%
    console.log("finding silence");
    console.log(mykitten);
  } catch (error) {
    console.log(error);
  }

  try {
    await Kitten.insertMany([
      { name: 'fluffy' },
      { name: 'duffy' }
    ]);
    console.log("successfully saved insert many");
  } catch (err) {
    console.error(err);
  }

});

