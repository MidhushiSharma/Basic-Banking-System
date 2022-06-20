//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


mongoose.connect("mongodb://localhost:27017/todoDB");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/index.html");
});



const CustomerSchema ={
  name:String,
  Balance: Number,
    email: String
};

const Customer = mongoose.model("customer", CustomerSchema);


const c1 = new Customer({
  name: "Arien Parker",
  Balance: 50000,
  email: "arienp@gmail.com"
});


const c2 = new Customer({
  name: "Salak Jones",
  Balance: 100000,
  email: "salakj1@gmail.com"
});

const c3 = new Customer({
  name: "Mia Rogers",
  Balance: 100000,
  email: "miar@gmail.com"
});

const c4 = new Customer({
  name: "Fransisco Chnag",
  Balance: 40000,
  email: "Fransisco.ch@gmail.com"
});


const c5 = new Customer({
  name: "Salem Virgo",
  Balance: 88000,
  email: "sleemv@gmail.com"
});


const c6 = new Customer({
  name: "Reese Lemor",
  Balance: 18000,
  email: "reese@gmail.com"
});


const c7 = new Customer({
  name: "Antony Smith",
  Balance: 40000,
  email: "smitha@gmail.com"
});


const c8 = new Customer({
  name: "Mark Timothey",
  Balance: 50000,
  email: "marktim@gmail.com"
});


const c9 = new Customer({
  name: "Eric Holmes",
  Balance: 9000,
  email: "eholmes@gmail.com"
});


const c10 = new Customer({
  name: "Ryan Relock",
  Balance: 70000,
  email: "rryan@gmail.com"
});



const custs= [c1, c2, c3,c4,c5,c6,c7,c8,c9,c10];


app.get("/Customers", function(req, res) {


  Customer.find({}, function(err, found){

    if(found.length===0)
    {

      Customer.insertMany(custs, function(err){
        if(err)
        console.log(err);
        else
        console.log("Successfully added");
      });
      res.redirect("/Customers");
    }
    else
    res.render("customer", {lTitle: "Customers", newItems: found});


});


});

app.post("/Customers", function(req, res){

 res.redirect("/Customers");
});




const TransferSchema = {
From: String,
To: String,
Amount: Number
};

const Transfer = mongoose.model("transfer", TransferSchema);


app.post("/del" , function(req,res){
const checkedItem = (req.body.checkbox);

Customer.findByIdAndRemove(checkedItem, function(err){
  if(err)
  console.log(err);
  else
  console.log("Successfully deleted the checked value");
 res.redirect("/Customers");
});

});


app.get("/Transactions", function(req, res) {


    res.render("list", {listTitle: "Transactions"});



});

app.post("/Transactions", function(req, res){
const naame = req.body.fromm;

let trans = new Transfer({
  From: naame,
   To: (req.body.tto),
   Amount: (req.body.amount)
});
    trans.save();


Customer.findOneAndUpdate({name: naame },
    {Balance:(Balance-req.body.amount)}, function (err) {
    if (err){
        console.log(err)
    }
    else{
        console.log("updated Successfully");
    }
});


Customer.findOneAndUpdate({name: req.body.tto },
    {Balance:(Balance+req.body.amount)}, function (err) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Successfully");
    }
});

});


app.get("/history", function(req, res) {


  Transfer.find({}, function(err, found){

    if(found.length===0)
    {

      Transfer.insertMany(titems, function(err){
        if(err)
        console.log(err);
        else
        console.log("Successfully added");
      });
      res.redirect("/history");
    }
    else
    {

    res.render("history", {lTitle: "Transaction History", newItems: found});}
  })
});


app.post("/history", function(req, res){


 res.redirect("/history");

});



app.post("/dell" , function(req,res){
const checkedItem = (req.body.checkbox);

Transfer.findByIdAndRemove(checkedItem, function(err){
  if(err)
  console.log(err);
  else
  console.log("Successfully deleted the checked value");
 res.redirect("/history");
});

});




app.post("/delete" , function(req,res){
const checkedItem = (req.body.checkbox);


Transfer.findByIdAndRemove(checkedItem, function(err){
  if(err)
  console.log(err);
  else
  console.log("Successfully deleted the checked value");
 res.redirect("/History");
});
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
