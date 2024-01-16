require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to Mongo...");

    // Construct the connection string from environment variables
    const connectionString =
      `mongodb://${process.env.AWS_DOCDB_USERNAME}:${process.env.AWS_DOCDB_PASSWORD}` +
      `@docdb-test-cluster.cluster-cbmoew6sm7e7.us-east-1.docdb.amazonaws.com:27017/` +
      `?tls=true&tlsCAFile=./global-bundle.pem` + // Adjust the path to global-bundle.pem as necessary
      `&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Cannot connect to the database!", err);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
