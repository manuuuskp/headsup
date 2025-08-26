const { MongoClient } = require("mongodb")

URL='mongodb+srv://manojvelusamy:AymzA23.e6s8RaE@devtinder.l9krpyr.mongodb.net/'

const client = new MongoClient(URL);

async function main() {
    await client.connect();

    const database = client.db("test");
   const collection = database.collection("users");
   const data = await collection.find({}).toArray();

//    const insertedData = await collection.insertOne({firstName: "Poornavel", lastName: "Kuppusamy", email: "manojprabhuskp@gmail.com", password: "manojprabhu"})

//    console.log(insertedData);
   console.log(data);
}

main();