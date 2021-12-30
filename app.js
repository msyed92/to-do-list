//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/toDoListDB", { useNewUrlParser: true })

const itemsSchema = new mongoose.Schema({
  name: String,
  checkStatus: {
    type: Boolean,
    default: false
  }
})

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
  name: "Welcome to your to do list!",
  checkStatus: false
})

const item2 = new Item({
  name: "Click + to add a new item",
  checkStatus: false
})

const item3 = new Item({
  name: "Click x to delete item",
  checkStatus: false
})

let defaultItems = [item1, item2, item3]



app.get("/", (req, res) => {

  Item.find({}, (err, foundItems) => {
    if (foundItems.length == 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("items added")
        }
      })
      res.redirect("/")
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }


  })
});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  })
  item.save()
  res.redirect("/")


});

app.post("/delete", (req, res) => {
  let deleteItem = req.body.delete
  Item.findByIdAndRemove(deleteItem, (err) => {
    if (!err) {
      err = "deleted!"
    }
    console.log(err)
  })
  res.redirect("/")

})

app.post("/check", (req, res) => {
  const filter = req.body.check
  Item.findOne({ _id: filter }, function (err, item) {
    item.checkStatus = !item.checkStatus;
    item.save(function (err, updatedItem) {

    });
  });
  res.redirect("/")
})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.get("/about", function (req, res) {
  res.render("about")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000")
})