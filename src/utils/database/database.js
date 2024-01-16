const mongoose = require("mongoose");
// const buildConnection = (user, pass, server) => {
//   return `mongodb://${user}:${pass}@${server}:27017/api?authSource=admin`;
// };

// const defaultConnection = () => {
//   const user = "munity0database";
//   const pass = "8qED(Fw@HKWhURxw";
//   const server =
//     "mongodb://testadmin:test1234@docdb-test-cluster.cluster-cbmoew6sm7e7.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";

//   return buildConnection(user, pass, server);
// };

const connectDB = async () => {
  try {
    console.log("Connecting to Mongo!");

    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb://testadmin:test1234@docdb-test-cluster.cluster-cbmoew6sm7e7.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    // process.exit();
  }
};

module.exports = connectDB;
