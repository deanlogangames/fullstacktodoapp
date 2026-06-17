const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();

const dns = require("dns");
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors("*"));

const TodoModel = require("./model/Todo");

mongoose.connect("mongodb+srv://deanpowell13_db_user:learningtodo@cluster0.nrf6lz7.mongodb.net/tododatabase")
  .then(() => {console.log('Connected!')
    app.listen(3001, function(){
        console.log("my code works yay")
    })
  })
  .catch((err) => console.log('Error:', err));

app.get("/todos", async (req, res) => {
  // res.send("webby")
  try {
    const response = await TodoModel.find({})
    res.json(response)
  } catch (err) {
    console.log(err)
  }
})

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const todo = req.body;
    const newItem = await TodoModel.create(todo);
    res.status(200).send("Successful");
  } catch (err) {
    console.log(err);
  }
})

app.delete("/todos/:id", async (req, res) =>{
  try{
    let id = req.params.id;
    const deletedItem = await TodoModel.deleteOne({_id: id})
    res.status(200).send("Successfully Deleted");
  } catch (err){
    console.log(err);
  }
})

app.put("/todos/:id", async (req, res) => {
  try{
    let id = req.params.id;
    console.log(id)
    const { text } = req.body
    
    const updateOptions = {text: text};
    const updateItem = await TodoModel.findByIdAndUpdate(id, updateOptions);
    res.status(200).send("Successfully Updated");
  } catch (err){
    console.log(err);
  }
})