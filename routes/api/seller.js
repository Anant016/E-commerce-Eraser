const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

const firebase = require("firebase");

//const firebasestorage = require("@firebase/storage");

//realtime db
const db = firebase.database();

//cloud firestore
const db1 = firebase.firestore();

//Storge
// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

// Your Google Cloud Platform project ID
const projectId = "eraser-2bd75";

// Creates a client
const storage = new Storage({
  projectId: projectId
});
const myBucket = storage.bucket("eraser-2bd75.appspot.com");

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Test Works" });
});

//add 1
// router.post('/addproduct',(req,res)=>{
//     let NewProduct = new Product({
//         product_name:req.body.product_name,
//         price:req.body.price,
//         quantity:req.body.price
//     })
//     NewProduct.save((err) => {
//         if (err) {res.send(err, 422)}
//         else {res.send(NewProduct,201);}
//     })
// })

//Add when order is placed
router.post("/addorder", (req, res) => {
  let NewProduct = new Order({
    product_name: req.body.product_name,
    price: req.body.price,
    quantity: req.body.price
  });
  NewProduct.save(err => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(NewProduct, 201);
    }
  });
});

//Add to cart
router.post("/addcart", (req, res) => {
  let NewProduct = new Cart({
    product_name: req.body.product_name,
    price: req.body.price,
    quantity: req.body.price
  });
  NewProduct.save(err => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(NewProduct, 201);
    }
  });
});

//get in cart
router.get("/carts", (req, res) => {
  Cart.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//get in order
router.get("/orders", (req, res) => {
  Order.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//FIREBASE TESTING AHEAD
// REALTIME
router.get("/products", (req, res) => {
  var ref = db.ref("/Pencils");
  // Attach an asynchronous callback to read the data at our posts reference
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on(
    "value",
    function(snapshot) {
      res.send(snapshot.val());
    },
    function(errorObject) {
      res.send(errorObject.code);
    }
  );
});

//CLOUD FIRESTORE
router.get("/pencils", (req, res) => {
  var Pencils = db1.collection("Pencil");
  var data_ = [];
  Pencils.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      // image = doc.data().image;
      // doc.data().image = `
      // https://storage.cloud.google.com/eraser-2bd75.appspot.com/Pencils/${image}?authuser=0`;
      // doc.data().image = "a";
      // myBucket.file(`Pencils/${image}`).
      // .ref(`Pencils/${image}`)
      // //.child()
      // .getDownloadURL()
      // .then(image_url => {
      //   doc.data().image = image_url;
      // });
      //console.log(`${doc.id} => ${doc.data()}`);
      data_.push(doc.data());
    });
    res.send(data_);
  });
});

module.exports = router;
