//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const date = require(`${__dirname}/date.js`)
const itemsArray = require(`${__dirname}/itemsArray.js`)

const app = express()
const workItems = []
const items = []
let checkedArr = []
let deletedArr = []
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    const day = date.getDate()
    res.render("list", { listTitle: day, newListItems: items, route: "/", checked: checkedArr, deleted: deletedArr })
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newListItems: workItems, route: "/work", checked: checkedArr, deleted: deletedArr })
})

app.post("/", (req, res) => {
    const item = req.body.newItem
    items.push(item)
    deletedArr = itemsArray.assign(deletedArr, req.body.deletedItems)
    checkedArr = itemsArray.assign(checkedArr, req.body.checkedItems).filter(item => !deletedArr.includes(item))
    for (let i = 0; i < items.length; i++) {
        if (deletedArr.includes(i.toString())) {
            items.splice(i, 1);
        }
    }
    res.redirect("/")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.post("/work", (req, res) => {
    const workItem = req.body.newItem
    workItems.push(workItem)
    if (req.body.checkedItems) {
        checkedArr = req.body.checkedItems
    }
    res.redirect("/work")
})

app.listen(3000, function () {
    console.log("server started on port 3000")
})