const express = require('express');
const bodyParser = require("body-parser");
require("module-alias/register");
const dotenv = require('dotenv');
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const indexRoute = require("@routes/index");
const mongoose = require("mongoose");
var cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
const URI = process.env.DB_CONNECTION;
mongoose.connect(URI, { useUnifiedTopology: true } 
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
} )

  

 
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
app.use(bodyParser.json({ limit: "50mb" }));


// define a simple route
app.get("/api", (req, res) => {
  res.json({ message: "No Page found" });
});

app.use("/api", indexRoute);
// Start the server
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {  console.log(`App listening on port ${PORT}`); 
});