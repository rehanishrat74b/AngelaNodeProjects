const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbName = "houses1_M";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in Open connection'));
db.on('close', function () { console.log('db closed successfully') });
mongoose.connection.on('close', function () { console.log('mongoose closed successfully') });

db.once('open', async function () {

  const ownerSchema = mongoose.Schema({
    name: { type: String, required: [true, 'why not name'] }
  });
  const Owner = mongoose.model('Owner', ownerSchema);
  const haroon = new Owner({ name: "haroon" });
  await haroon.save(); //first owner created here

  const houseSchema = mongoose.Schema({
    street: { type: String, required: [true, 'why not street'] },
    city: { type: String, required: [true, 'why not city'] },
    state: { type: String, required: [true, 'why not state'] },
    zip: { type: Number, required: [true, 'why not zip'] },
    owner: { type: Schema.Types.ObjectId, ref: Owner }  //1-many
  });

  const Houses = mongoose.model("Houses", houseSchema);
  const house1 = new Houses({ street: "r40", city: "lahore", state: "punjab", zip: 2333, owner: haroon });
  const house2 = new Houses({ street: "r50", city: "ibd", state: "capital", zip: 1212, owner: haroon });


  // Saving the houses
  await Promise.all([house1.save(), house2.save()])
    .then(savedHouses => {
      console.log('Houses saved successfully:', savedHouses);
    })
    .catch(err => {
      console.error('Error saving houses:', err);
    });

  // Finding houses and populating owner
  await Houses.find({}).populate('owner')
    .then(houses => {
      console.log('Houses found and populated with owner:', houses);
    })
    .catch(err => {
      console.error('Error finding houses:', err);
    });

  try {
    await db.close();
  } catch (error) {
    console.log("dbclose" + error);
  }
});
