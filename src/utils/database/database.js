const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(
      "mongodb://docdb-2024-01-05-10-38-06.cluster-cbmoew6sm7e7.us-east-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
      {
        auth: {
          username: "munity0database",
          password: "**********",
        },
        // useNewUrlParser: true,
        // useUnifiedTopology: false,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err}`);
    // console.log(`Error: ${err}`);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
