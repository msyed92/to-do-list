//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const date = require(`${__dirname}/date.js`)

const app = express()
const workItems = []
const items = []
let checkedArr = []
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    const day = date.getDate()
    res.render("list", { listTitle: day, newListItems: items, route: "/", checked: checkedArr })
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newListItems: workItems, route: "/work", checked: checkedArr })
})

app.post("/", (req, res) => {
    const item = req.body.newItem
    items.push(item)
    if (req.body.checkedItems) {
        checkedArr = req.body.checkedItems
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