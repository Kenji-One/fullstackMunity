const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database/database"); // Adjust the path as necessary

// Connect to DocumentDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
