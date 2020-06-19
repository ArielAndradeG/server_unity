const MongoClient = require("mongodb").MongoClient
var path = require('path');
var dotenv = require('dotenv').config();

const urlMongo = process.env.MONGO_URL;
const database = "app";
var db;

function connectToServer( callback ) {
    MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
        db = client.db(database);
        return callback( err );
    });
}

function getDb() {
    return db;
}

async function findOne(collection,query){
    var result = await db.collection(collection).findOne(query);
    return result;
}

module.exports = {connectToServer, getDb, findOne}