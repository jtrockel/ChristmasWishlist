const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/shopping', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  url: String,
  numOrdered:Number
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    url: req.body.url,
    numOrdered: req.body.numOrdered
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async(req,res)=>{
  var id = req.params.id;
  console.log(id);
  try{
    var item = await Item.findOne({_id: id});
    console.log(item);
    item.name = req.body.name;
    item.numOrdered = req.body.numOrdered+1;
    item.price = req.body.price;
    item.url = req.body.url;
    console.log("before");
    await item.save();
    console.log("after");
    res.send(item);
    console.log("sent");
  }catch(error){
    console.log(error); 
    res.sendStatus(500);
  }
})

// Delete item from museum.
app.delete('/api/items/:id', async (req, res) => {
  var id = req.params.id;
  console.log(id);
  try{
    // let items = await Item.find({_id: id});
    // res.send(items);
    await Item.deleteOne({_id: id});
    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(8081, () => console.log('Server listening on port 8081!'));