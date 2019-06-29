const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const firebase = require("firebase");

firebase.initializeApp({
  apiKey: "AIzaSyBxZHyhn7J3pfgoK5V2tEL04tOQTg0WnQw",
  authDomain: "eraser-2bd75.firebaseapp.com",
  databaseURL: "https://eraser-2bd75.firebaseio.com",
  projectId: "eraser-2bd75",
  storageBucket: "eraser-2bd75.appspot.com",
  messagingSenderId: "984030785264"
});

//Creating app using express
const seller = require("./routes/api/seller");
const app = express();

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//Mongoose Connect
const mongoose = require("mongoose");
//const db=require('./config/key').mongoURI;
mongoose
  .connect("mongodb://anany:anant123@ds263156.mlab.com:63156/eraser", {
    useNewUrlParser: true
  })
  .then(console.log("MongoDbConnected"))
  .catch(err => console.log(err));

app.use("/seller", seller);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port: ${port}`));
