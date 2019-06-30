const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Address = require("../../models/Address");

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

//Add to cart - Done
router.post("/addcart", (req, res) => {
  let NewProduct = new Cart({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    image: req.body.image,
    desc: req.body.desc,
    number: req.body.number
  });

  Cart.findOne({
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    number: req.body.number
  }).then(product => {
    if (product) {
      Cart.findOneAndUpdate(
        {
          name: req.body.name,
          price: req.body.price,
          desc: req.body.desc,
          number: req.body.number
        },
        { $set: { qty: String(Number(product.qty) + Number(req.body.qty)) } },
        { new: true }
      )
        .then(product => res.json(product))
        .catch(err => console.log(err));
    } else {
      NewProduct.save(err => {
        if (err) {
          res.send(err, 422);
        } else {
          res.send(NewProduct, 201);
        }
      });
    }
  });
});

//GET in cart - Done
router.post("/cart", (req, res) => {
  //console.log(req.body);
  Cart.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(data, 200);
    }
  });
});

//remove from cart - Done
router.post("/removefromcart", (req, res) => {
  Cart.findOneAndRemove(
    {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image: req.body.image,
      number: req.body.number
    },
    err => {
      if (err) {
        res.send(err, 422);
      } else {
        res.send({ success: true }, 200);
      }
    }
  );
});

//update qty in cart - Done
router.post("/updateQty", (req, res) => {
  Cart.findOneAndUpdate(
    {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image: req.body.image,
      number: req.body.number
    },
    { $set: { qty: req.body.qty } },
    { new: true }
  )
    .then(product => res.json(product))
    .catch(err => console.log(err));
});

//add Address - Done
router.post("/addAddress", (req, res) => {
  let NewAddress = new Address({
    name: req.body.name,
    landmark: req.body.landmark,
    address: req.body.address,
    pincode: req.body.pincode,
    number: req.body.number
  });
  NewAddress.save(err => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(NewAddress, 201);
    }
  });
});

//delete Address
router.post("/deleteaddress", (req, res) => {
  Address.findOneAndRemove(
    {
      _id: req.body._id
    },
    err => {
      if (err) {
        res.send(err, 422);
      } else {
        res.send({ success: true }, 200);
      }
    }
  );
});

//get Address -Done
router.post("/getaddresses", (req, res) => {
  console.log(req.body.number);
  Address.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(data, 200);
    }
  });
});

// ----------------------------------------------------------------

// When order is placed
router.post("/addToOrder", (req, res) => {
  //cart to order
  Cart.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      //copy same
      // data.map(item => {
      //   let OrderItem = new Order({
      //     name: item.name,
      //     price: item.price,
      //     desc: item.desc,
      //     qty: item.qty,
      //     number: item.number,
      //     image: item.image
      //   });
      //   OrderItem.save(err => {
      //     if (err) {
      //       console.log(err);
      //       //  res.send(err);
      //     } else {
      //       console.log("order added");
      //     }
      //   });
      // });
      var OrderArray = [];
      data.map(item => {
        let OrderItem = {
          name: item.name,
          price: item.price,
          desc: item.desc,
          qty: item.qty,
          //number: item.number,
          image: item.image
        };
        OrderArray.push(OrderItem);
      });
      Address.findOne({ _id: req.body._id }, (err, data) => {
        console.log("Address:" + data);
        let wholeOrder = new Order({
          items: OrderArray,
          name: data.name,
          address: data.address,
          landmark: data.landmark,
          pincode: data.pincode,
          number: data.number
        });
        wholeOrder.save(err => {
          if (err) {
            console.log(err);
            //  res.send(err);
          } else {
            console.log("order added");
          }
        });
      });
    }
  });

  //cart delete
  Cart.remove({ number: req.body.number }, (err, data) => {
    if (err) {
      req.send(err);
    } else {
      console.log("cart deleted");
    }
  });

  //nodemailer- address,order
  //imp
  //to be done
  //See here
});

// Get in order -Done
router.post("/orders", (req, res) => {
  Order.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//FIREBASE TESTING AHEAD
// REALTIME
// router.get("/products", (req, res) => {
//   var ref = db.ref("/Pencils");
//   // Attach an asynchronous callback to read the data at our posts reference
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     function(snapshot) {
//       res.send(snapshot.val());
//     },
//     function(errorObject) {
//       res.send(errorObject.code);
//     }
//   );
// });

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
