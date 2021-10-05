const {MongoClient}  = require("mongodb");

const MONGODB_URL = "mongodb://localhost:27017";

const MONGODB_NAME = "guvi";

const client = new MongoClient(MONGODB_URL);

module.exports = {
    //Complete collection
    db : null,
    
    //Connection specific to collection
   
    users : null,

    async connect(){ 
        //Connecting to database
        await client.connect();
        console.log("Connected to Mongo : ", MONGODB_URL);

        //Selecting database
        this.db = client.db(MONGODB_NAME);
        console.log("Selected database : ", MONGODB_NAME);

        //Initialize Collection
        this.users = this.db.collection("users");

    }

}