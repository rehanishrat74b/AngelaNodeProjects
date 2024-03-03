const mongoose = require('mongoose');
const dbName = "houses1_1";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error on connection'));
db.on('close', function () {
  console.log("db closed successfully");
});

mongoose.connection.on('close', function () {
  console.log("mongoose closed successfully");
});

db.once('open', async function () {
  console.log('connection open');

  const OwnerSchema = mongoose.Schema({
    name: { type: String }
  });

  const houseSchema = mongoose.Schema({
    city: { type: String, required: [true, 'why not city'] },
    street: { type: String, required: [true, 'why not street'] },
    state: { type: String, required: [true, 'why not state'] },
    zip: { type: Number, required: [true, 'why not zip'] },
    owner: { type: OwnerSchema, required: [true, 'why not owner name'] }
  });

  const House = mongoose.model("House", houseSchema);
  try {
    House.create({
      city: "karachi",
      street: "kaechs",
      state: "sindh",
      zip: 7500,
      owner: { name: "Rehan" }
    });
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await House.find({}));
    await db.close();
  } catch (error) {
    console.log(error);
  }

})