const mongoose = require('mongoose');
const dbName = "housesM_M";
const user = "rehanishrat74";
const pwd = "CiGrTSUnp1pdfyut";
const uri = "mongodb+srv://" + user + ":" + pwd + "@clusterrehan.ftufvvt.mongodb.net/" + dbName + "?retryWrites=true&w=majority&appName=ClusterRehan";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error on connection'));
db.on('close', function () { console.log('db connection close'); });
db.once('open', async function () {
  console.log("connection open");

  const ownerSchema = mongoose.Schema({
    name: { type: String, required: [true, 'why not name'] }
  });
  const houseSchema = mongoose.Schema({
    street: { type: String, required: [true, 'why not street'] },
    city: { type: String, required: [true, 'why not city'] },
    province: { type: String, required: [true, 'why not province'] },
    zip: { type: Number, required: [true, 'why not zip'] },

  });
  //---------------------------------------------------------------
  const Owner = mongoose.model("Owner", ownerSchema);
  const House = mongoose.model("House", houseSchema); //now will pass models to m-m schema

  const ownerHousesSchema = mongoose.Schema({         //m-m schema
    owner: { type: mongoose.Types.ObjectId, ref: "Owner" },
    house: { type: mongoose.Types.ObjectId, ref: "House" }
  });
  const HouseOwner = mongoose.model("HouseOwner", ownerHousesSchema);  // m-m table
  //---------------------------------------------------------------
  //creating inserts
  const rehan = new Owner({ name: "rehan" });
  const khiHouse = new House({ street: "R39", city: "Karachi", province: "Sindh", zip: "7500" });
  const lhrHouse = new House({ street: "59", city: "Lahore", province: "Punjab", zip: "6758" });
  //const myHouses = new HouseOwner({ rehan, khiHouse }, { rehan, lhrHouse }); //ids must be created before inserting in M-M table

  //executing inserts
  try {
    await rehan.save();
    await khiHouse.save();
    await lhrHouse.save();
    //await myHouses.save(); //ids must be created before inserting in M-M table
  } catch (error) { console.log(error); }

  // Now create myHouses with references to existing documents. inserting in M-M table
  const myHouses = new HouseOwner([
    { owner: rehan._id, house: khiHouse._id },
    { owner: rehan._id, house: lhrHouse._id }
  ]);
  const myHouse1 = new HouseOwner({ owner: rehan._id, house: khiHouse._id });
  const myHouse2 = new HouseOwner({ owner: rehan._id, house: lhrHouse._id });
  await Promise.all([myHouse1.save(), myHouse2.save()])
    .then(savedHouses => {
      console.log('Houses saved successfully:', savedHouses);
    })
    .catch(err => {
      console.error('Error saving houses:', err);
    });
  //--------------------------------finding ----------------------------------------
  await HouseOwner.find({ owner: rehan }).populate('house')
    .then(houses => {
      console.log('Owner found and populated with houses:', houses);
    })
    .catch(err => {
      console.error('Error finding owners:', err);
    });

  await HouseOwner.find({ house: khiHouse }).populate('owner')
    .then(owners => {
      console.log('house found and populated with owner:', owners);
    })
    .catch(err => {
      console.error('Error finding houses:', err);
    });



});